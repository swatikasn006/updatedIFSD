const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const socket = require("socket.io");

const app = express();

app.use(express.static('public'));
const LoginRouter = require("./routers/loginRouter");
const RegisterRouter = require("./routers/registerRouter");
const chatRouter = require("./routers/chatRouter");
const Logout = require("./routers/logoutRouter");


const dbUrl =
  "mongodb+srv://abhi:nXkuENwUKYmyxFh2@cluster0.djk7ffg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "ChatV2", resave: false, saveUninitialized: true }));

const io = socket(app.listen(3000));

io.on("connection", (socket) => {
  console.log(socket.id + " a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});


app.use(LoginRouter);
app.use(RegisterRouter);
app.use(chatRouter);
app.use(Logout);

app.use(function (req, res) {
  res.status(404).end("404 NOT FOUND");
});
