const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const history = require("connect-history-api-fallback");
const port = process.env.PORT || 3000;

app.use(history());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("user", user => {
    io.emit("user", user);
    console.log(user);
  });

  socket.on("message", message => {
    io.emit("message", message);
    console.log(message);
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
