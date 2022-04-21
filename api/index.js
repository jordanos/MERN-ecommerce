const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const feedRoute = require("./routes/feedRoute");
const packageRoute = require("./routes/packageRoutes");
const statRouter = require("./routes/stasticsRoute");
const adminRoute = require("./routes/adminRoute");
const conversationRoute = require("./routes/coversationRoute");
const notificationRoute = require("./routes/notificationRoute");
const rewardcoinRoute = require("./routes/ricaCoinRoutes");

const app = express();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
  console.log("Server Running . . ." + process.env.APP_HOST);
});
//socket io

// some change by tsega
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/feed", feedRoute);
app.use("/package", packageRoute);
app.use("/stat", statRouter);
app.use("/admin", adminRoute);
app.use("/conversation", conversationRoute);
app.use("/notification", notificationRoute);
app.use("/rewardcoin", rewardcoinRoute);
app.use("/*", (req, res) => {
  res.json({
    status: 404,
    message: "Requested Route not Found",
  });
});

////scoket io

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketId !== socketID);
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("adduser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  ///////////send and get message
  socket.on("sendMessage", ({ conversationId, senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(conversationId, senderId, receiverId, text);
    console.log(user);
    console.log("yhhg", users);

    var date = new Date();

    io.to(user?.socketId).emit(
      "getMessage",
      JSON.stringify({
        conversationid: conversationId,
        sender: senderId,
        time: date.toISOString(),

        text: text,
      })
    );
  });

  socket.on("sendNotification", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(senderId, receiverId, text);
    io.to(user?.socketId).emit("getNotification", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
