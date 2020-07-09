const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const logger= require('morgan');
const gulp=require('gulp');
const port = 8000;
var kue = require("kue");
const env= require('./config/enviroment');
//let ejs=require('ejs');
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const saasMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const passportGoogle = require("./config/passport-google-outh2-strategy");
const cors = require("cors");
// Set Up chat Server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
//port for listening the chatSocket

chatServer.listen(5000);
console.log("listenign the port 5000");

//for unblocking the API calls
app.use(cors());
//marked debug false for now
const path=require('path');
if(env.name=='development')
{
app.use(
  saasMiddleware({
    src: path.join(__dirname,env.asset_path, 'scss'),
    dest: path.join(__dirname,env.asset_path, 'css'),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
}

// for getting the data of psot request
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use("/uploads", express.static(__dirname + "/uploads"));


app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//const path=require('path');
// app.set('view engine', 'ejs');
app.set("view engine", "ejs");
app.set("views", "./views");
// const path=require('path');

// mongo store is used to store the session cookie
app.use(
  session({
    name: "codealite",
    //TODO befor Deployment
    secret: env.session_cookie_key,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 10 * 60,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoremove: "disabled",
      },
      function (error) {
        if (error) {
          console.log("error in storing cookies in mongoo");
        } else {
          console.log("successfully stored");
        }
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use("/", require("./routes"));

// app.set('views', path.join(__dirname, 'views'));
//kue.app.set('title', 'My Application');
//kue.app.listen(3000);
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running server ${port}`);
  }
  console.log(`Server is running on port ${port}`);
});
