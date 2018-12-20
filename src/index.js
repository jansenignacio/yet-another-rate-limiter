const debug = require("debug")("yarl");

module.exports = function RateLimiter(options) {
  debug("%o", options);

  let {
    maxRequests = 100, // max number of requests a user can make in a particular timeFrame
    timeFrame = 3600, // delay in seconds before rate limit key is reset
    cache
  } = options;

  if (!cache) {
    debug("Defaulting to local cache");
    const LocalCache = require("./local-cache");
    cache = new LocalCache();
  }

  cache.setDelay(timeFrame);

  return async function rateLimit(req, res, next) {
    const { method, path, ip } = req;
    const key = `${path}_${method}_${ip}`;

    const currentRequests = await cache.incr(key);

    if (currentRequests > maxRequests) {
      return res.status(429).send("Too Many Requests!");
    }

    next();
  };
};
