const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
const PORT = 4003;

app.post(
  "/events",
  async (
    {
      body: {
        type,
        data: { id, postId, status, content },
      },
    },
    res
  ) => {
    if (type === "CommentCreated") {
      status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { id, postId, status, content },
      });
    }

    res.send({});
  }
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
