const Redis = require("ioredis");

const redisConfig = {
  port: 6379,
  host: "127.0.0.1",
  keyPrefix: "yarl" //configure so you can namespace the rate limiter
};

const redis = new Redis(redisConfig);
module.exports = redis;
