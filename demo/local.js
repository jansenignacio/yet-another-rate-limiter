const express = require("express");
const rateLimiter = require("../src")({});

const app = express();
const port = 3000;

app.use(rateLimiter);
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/test", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
