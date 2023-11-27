class User {
    static async create({ name, username, email, password, db }) {
        try {
            let newUser = { name, username, email, password };
            const Users = db.collection("users"); 
            const insertUser = await Users.insertOne(newUser);
            newUser.id = insertUser.insertedId;
     
            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async getDetail({ username, db }) {
        try {
            const Users = db.collection("users"); 
            const user = await Users.findOne({username});
     
            return user;
        } catch (error) {
            throw error
        }
    }
}

module.exports = User;