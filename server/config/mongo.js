if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const { MongoClient } = require("mongodb");
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        const database = client.db('Outstagram');
        return database;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { connect };