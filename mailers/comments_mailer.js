const nodemailer=require('../config/nodemailer');


// this is the another way for exporting
exports.newComment=(comment)=>
{
    console.log("I am herer", comment);
    console.log(" INSIDE the comments");
    nodemailer.transporter.sendMail({
        from:"Manish Saini",
        to:comment.user.email,
        subject:"New Comment Added",
        html: '<h1>Yup  your comment is now published</h1>',

    },(error, info)=>
    {
            if(error){console.log("error in publishing the comment", error); return}
            console.log("Message commented", info);
            return;
    });
}
