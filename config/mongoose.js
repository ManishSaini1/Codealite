// const mongoose= require('mongoose');
// mongoose.connect('mongodb://localhost/major_project_development');
// const db=mongoose.connection;
// db.on('error',console.error.bind(console, "Error on conneting mongodb"));
// db.once('open', function()
// {
//         console.log("db is Succesfull Connnectec :: Mongo db");
// });
const env=require('../config/enviroment');
const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function() {
    console.log("Connected to Database :: MongoDB");
});

module.exports = db; 