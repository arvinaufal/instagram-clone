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

    static async getByQ({ q }) {
        const Users = getDB().collection('users');
        const users = await Users.find({
            $or: [
                { name: { $regex: new RegExp(q, 'i') } },
                { username: { $regex: new RegExp(q, 'i') } }
            ]
        }).toArray();

        return users;
    }

    static async follow({ followingId, followerId }) {
        const date = new Date();

        const Follow = getDB().collection('follows');
        const newFollow = { followingId, followerId, createdAt: date, updatedAt: date };
        await Follow.insertOne(newFollow);

        return newFollow;
    }

    static async getFollowing({ followingId, followerId }) {
        const Follow = getDB().collection('follows');
        const following = await Follow.find({ $and: [{ followingId }, { followerId }] }).toArray();
        return following.length === 0 ? false : following[0];
    }


    static async deleteFollowing({ followingId, followerId }) {
        const Follow = getDB().collection('follows');
        await Follow.deleteOne({ $and: [{ followingId }, { followerId }] });
    }
}

module.exports = User;