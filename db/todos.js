const knex = require("./knex");

function createTodo(todo) {
    return knex("todos").insert(todo);
}

function getAllTodos(todo) {
    return knex("todos").select("*");
}

function getSpecificTodos(userID, todo) {
    return knex("todos").select("*").where("userID", userID);
}

function deleteTodo(id) {
    return knex("todos").where("id", id).del();
}

function updateTodo(id, todo) {
    return knex("todos").where("id", id).update(todo);
}

module.exports = {
    createTodo,
    getAllTodos,
    getSpecificTodos,
    deleteTodo,
    updateTodo
}