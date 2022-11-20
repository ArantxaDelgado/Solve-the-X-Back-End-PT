require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/todos");
const dbu = require("./db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/todos", async(req, res) => {
    const results = await db.createTodo(req.body);
    res.status(201).json({id: results [0]});
});

function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if(token) {
        jwt.verify(token, "bigSecret", (err, decoded) => {
            if(err) {
                res.status(401).json("Access denied");
            } else {
                req.userID = decoded.userID;
                next();
            }
        });
    } else {
        res.status(401).json("You're not logged in");
    }
}

app.get("/specifictodos", checkToken, async(req,res) => {
    const todos = await db.getSpecificTodos(req.params.userID === req.UserID);
    res.status(200).json({todos});
});

app.get("/todos", async(req, res) => {
    const todos = await db.getAllTodos();
    res.status(200).json({todos});
});


app.patch("/todos/:id", async(req, res) => {
    const id = await db.updateTodo(req.params.id, req.body);
    res.status(200).json({id});
});


app.delete("/todos/:id", async(req, res) => {
    await db.deleteTodo(req.params.id);
    res.status(200).json({success: true});
});

app.post("/todos", async(req, res) => {
    const results = await db.createTodo(req.body);
    res.status(201).json({id: results [0]});
});


app.post("/register", async(req, res) => {
    try {
        let {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        const results = await dbu.createUser({username, password});
        res.status(201).json({id: results [0]});
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }    
});

app.post("/login", async(req, res) => {
    try {
        let {username, password} = req.body;
        const user = await dbu.registerUser(username);
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword) {
                const token = jwt.sign({userID: user.id}, "bigSecret", {expiresIn:"50m"});
                res.status(200).json("Valid username and password. " + token);
            } else{
                res.json("Wrong password.");
            }
        } else {
            res.status(404).json("User not found.");
        }
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }

});

app.get("/users", async(req, res) => {
    const users = await dbu.getAllUsers();
    res.status(200).json({users});
});



app.listen(3000, () => console.log("server is runnig on port 3000"));