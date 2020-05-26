const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
//let ejs=require('ejs');
const expressLayout= require('express-ejs-layouts');
const db = require("./config/mongoose");

// for getting the data of psot request
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);
 app.use('/', require('./routes'));

 const path=require('path');
// app.set('view engine', 'ejs');
 app.set('view engine', 'ejs');
 app.set('views', './views');
// const path=require('path');
 
// app.set('views', path.join(__dirname, 'views'));
app.listen(port,function(error)
{
       if(error)
       {
           console.log(`Error in running server ${port}`);
       }
       console.log(`Server is running on port ${port}`);
});       