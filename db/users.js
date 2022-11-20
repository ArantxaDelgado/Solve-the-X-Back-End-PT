const knex = require("./knex");

function createUser(user) {
    return knex("users").insert(user);
}

function registerUser(user) {
    return knex("users").first("*");
}

function getAllUsers(user) {
    return knex("users").select("*");
}

function deleteUser(id) {
    return knex("users").where("id", id).del();
}

function updateUser(id, user) {
    return knex("users").where("id", id).update(user);
}

module.exports = {
    createUser,
    registerUser,
    getAllUsers,
    deleteUser,
    updateUser
}