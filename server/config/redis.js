const Redis = require("ioredis");

const redis = new Redis({
    port: 14655, // Redis port
    host: process.env.REDIS_HOSTNAME, // Redis host
    username: "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB, // Defaults to 0
  });

module.exports = redis;