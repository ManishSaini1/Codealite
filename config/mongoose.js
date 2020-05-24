const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/major_project_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console, "Error on conneting mongodb"));
db.once('open', function()
{
        console.log("db is Succesfull Connnectec :: Mongo db");
});
