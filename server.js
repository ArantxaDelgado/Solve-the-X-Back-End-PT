const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/todos");
const dbu = require("./db/users");
const bcrypt = require("bcrypt");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/todos", async(req, res) => {
    const results = await db.createTodo(req.body);
    res.status(201).json({id: results [0]});
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
        const user = await dbu.registerUser.where({username: username});

        if(user) {
            const validPass = await bcrypt.compare(password, user.hash)
            if(validPass) {
                res.status(200).json("valid username and password")
            }
        }
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});





app.listen(3000, () => console.log("server is runnig on port 3000"));