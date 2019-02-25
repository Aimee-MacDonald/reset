












const express = require("express");
const app = express();

app.listen(8080, console.log("Server Listening on Port: " + 8080));

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});
