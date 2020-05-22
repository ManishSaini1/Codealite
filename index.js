const express=require('express');
const app=express();
const port=8000;
 app.use('/', require('./routes'));

 app.set('views', 'ejs');
 app.set('views', './views');
app.listen(port,function(error)
{
       if(error)
       {
           console.log(`Error in running server ${port}`);
       }
       console.log(`Server is running on port ${port}`);
});