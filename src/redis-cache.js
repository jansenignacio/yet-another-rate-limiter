const debug = require("debug")("yarl:rediscache");

class RedisCache {
  constructor(redis) {
    debug("constructor");
    this.redis = redis;
  }

  setDelay(delay) {
    debug("setDelay %s", delay);
    this.delay = delay;
  }

  async incr(key) {
    debug("incr %s", key);
    if (await this.redis.get(key)) {
      return this.redis.incr(key);
    } else {
      return this.redis.setex(key, this.delay, 1);
    }
  }
}

module.exports = RedisCache;
