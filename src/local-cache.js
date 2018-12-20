const debug = require("debug")("yarl:localcache");

class LocalCache {
  constructor() {
    debug("constructor");
    this.cache = {};
  }

  setDelay(delay) {
    debug("setDelay %s", delay);
    this.delay = delay * 1000;
  }

  incr(key) {
    debug("incr %s, %s", key, this.cache[key]);
    if (this.cache[key]) {
      this.cache[key]++;
    } else {
      this.cache[key] = 1;

      setTimeout(() => this.resetKey(key), this.delay);
    }

    return this.cache[key];
  }

  resetKey(key) {
    debug("reset %s", key);
    delete this.cache[key];
  }
}

module.exports = LocalCache;
