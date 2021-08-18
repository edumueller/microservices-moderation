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
      status = content.includes("orange") ? "rejected" : "approved";
      await axios
        .post("http://event-bus-srv:4005/events", {
          type: "CommentModerated",
          data: { id, postId, status, content },
        })
        .catch((e) => {
          console.log(e);
        });
    }

    res.send({});
  }
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
