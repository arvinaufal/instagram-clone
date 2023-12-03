if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const { MongoClient } = require("mongodb");
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

let db;
async function connect() {
    try {
        const database = client.db('Outstagram');
        db = database;
        return database;
    } catch (err) {
        console.log(err);
    }
}

function getDB() {
    return db;
}
module.exports = { connect, getDB };