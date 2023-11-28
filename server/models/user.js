const { getDB } = require("../config/mongo");

class User {
    static async create({ name, username, email, password }) {
        try {

            let newUser = { name, username, email, password };
            const Users = getDB().collection("users");
            const insertUser = await Users.insertOne(newUser);
            newUser.id = insertUser.insertedId;

            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async getDetail({ username }) {
        try {
            const Users = getDB().collection("users");
            const user = await Users.findOne({ username });

            return user;
        } catch (error) {
            throw error
        }
    }
}

module.exports = User;