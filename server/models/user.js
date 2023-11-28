const { getDB } = require("../config/mongo");

class User {
    static async create({ name, username, email, password }) {
        let newUser = { name, username, email, password };
        const Users = getDB().collection("users");
        const insertUser = await Users.insertOne(newUser);
        // newUser.id = insertUser.insertedId;

        return newUser;
    }

    static async getByUsername({ username }) {
        const Users = getDB().collection("users");
        const user = await Users.findOne({ username });

        return user;
    }

    static async getByEmail({ email }) {
        const Users = getDB().collection("users");
        const user = await Users.findOne({ email });

        return user;
    }


    static async getById({ id }) {
        const Users = getDB().collection("users");
        const user = await Users.findOne({ _id: id });

        return user;
    }
}

module.exports = User;