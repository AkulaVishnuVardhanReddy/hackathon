const express = require("express");
const http = require("http"); // Import HTTP module
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Session setup
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const clubRouter = require("./routes/club");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", clubRouter);

// Create HTTP Server
const server = http.createServer(app);

const socketInit = require("./socket");
const io = socketInit(server);


// Connect to Database and Start Server
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(4000, () => {
      console.log("Listening on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.message);
  });

module.exports = { app, io };
