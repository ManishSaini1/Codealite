const env=require('./enviroment');
const fs=require('fs');
const path=require('path');
module.exports=(app)=>
{
    app.locals.assetPath=function(filePath)
    {
        if(env.name=='development')
        {
            console.log(" I A< HERER IN THE DEVELOPMENT ENVIRONMENT");  
            return filePath;
        }
        return '/' +  JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}