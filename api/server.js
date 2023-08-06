const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const connectDb = require("./config/db.js");

//LOAD env variables
dotenv.config({ path: "./config/config.env" });

//db connected
connectDb();

const app = express();
app.use(express.json());
//cors
app.use(cors({ origin: "http://localhost:3090" }));


const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3090", 
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

// Socket.IO connection logic
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle events (e.g., 'message') from the client
  socket.on("message", (data) => {
    // Broadcast the received message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


//Routes the files
const users=require('./routes/user.js')
const posts=require('./routes/post.js')
const auth=require('./routes/auth.js')
const comments=require('./routes/comment.js')
const follows=require('./routes/follow.js')
const notifications=require('./routes/notification.js')
const tags=require('./routes/tag.js')
const media=require('./routes/media.js')
const conversations=require('./routes/conversation.js')
const messages=require('./routes/message.js')




//use routes
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/auth',auth)
app.use('/api/comments',comments)
app.use('/api/follows',follows)
app.use('/api/notifications',notifications)
app.use('/api/media',media)
app.use('/api/tags',tags)
app.use('/api/conversations',conversations)
app.use('/api/messages',messages)

//errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});