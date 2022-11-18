const knex = require("knex");

const connectedKnex = knex({
    client : "sqlite3",
    connecton: {
        filename: "dataBase.sqlite3" //nombre de mi base de datos
    }
});