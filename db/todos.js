const knex = require("./knex");

function createTodo(todo) {
    return knex("todos").insert(todo);
}

function getAllTodos(todo) {
    return knex("todos").select("*");
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
    deleteTodo,
    updateTodo
}