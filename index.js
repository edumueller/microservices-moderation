const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
const PORT = 4003;

app.post("/events", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
