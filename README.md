# Yet Another Rate Limiter

Yet another rate limiter for express.
This defaults to using an in-memory store which should only be used for development purposes. A redis backed store is included in the package, and should be used for production.


## Usage

For an API-only server where the rate-limiter should be applied to all requests:

```js
const express = require("express");
const rateLimiter = require("yet-another-rate-limiter")({
  maxRequests = 100, // max number of requests a user can make in a particular timeFrame
  timeFrame = 3600, // delay in seconds before rate limit key is reset
  // cache // memory store to use. Defaults to in-memory store
});

const app = express();
const port = 3000;

app.use(rateLimiter);
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/test", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

```

## Configuration options

### maxRequests

Maximum number of requests an ip can make to a specific route. Defaults to 100.

### timeFrame

How long - in seconds - before the number of requests an ip made is reset. Defaults to 3600s (1 hour)

### cache

Where to store the number of requests and how expiry is handled

By default, the [LocalCache](src/local-cache.js) is used.
There is also a [RedisCache](src/redis-cache.js) included.

To create your own store, follow this interface
```js
class CustomStore() {
  /**
   * @param {*} delay - how long before a key expires 
   */
  setDelay(delay) {}

  /**
   * @param {*} key - the key to store in the cache 
   */
  async incr(key){}
}
```
