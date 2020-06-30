const nodemailer= require('nodemailer');
const ejs= require('ejs');
const path=require('path');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    auth:
    {
    user:'mksaini14698@gmail.com',
    pass:'krishs63#'
    }
});

let renderTemplate=(data,relativePath)=>
{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(error,template)
        {
            if(error){console.log("Error in rendering the template", error); return}
            mailHTML=template;
        });
        return mailHTML;
}
module.exports={
    transporter : transporter,
    renderTemplate:renderTemplate

}