const knex = require("knex");

const connectedKnex = knex({
    client : "sqlite3",
    connection: {
        filename: "dataBase.sqlite3"
    }
});

module.exports = connectedKnex;