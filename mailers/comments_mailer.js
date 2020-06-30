const nodemailer=require('../config/nodemailer');


// this is the another way for exporting
exports.newComment=(comment)=>
{
    let htmlString= nodemailer.renderTemplate({comment : comment}, 'comments/new_comment.ejs');
    // console.log("I am herer", comment);
    // console.log(" INSIDE the comments");
    nodemailer.transporter.sendMail({
        from:"Manish Saini",
        to:comment.user.email,
        subject:"New Comment Added",
        html: htmlString,

    },(error, info)=>
    {
            if(error){console.log("error in publishing the comment", error); return}
            console.log("Message commented", info);
            return;
    });
}
