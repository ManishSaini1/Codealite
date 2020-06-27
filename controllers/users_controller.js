const User= require('../models/user');
const path= require('path');
const fs=require('fs');
//console.log(' i am here' ,  User.schema);
module.exports.profile= function(req, res)
{
    User.findById(req.params.id, function(error, user)
    {
        return res.render("user_profile",
        {
            title : 'User Profile',
            profile_user : user
        });
    });
    
}

module.exports.update=async function(req ,res)
{
    // if(req.user.id == req.params.id)
    // {
    //         User.findByIdAndUpdate(req.params.id,req.body, function(error, user)
    //         {
    //             return res.redirect('back');
    //         });
    // }else{
    //     return res.status(401).send("Unauthorized");
    // }
    if(req.user.id == req.params.id)
    {
        try{
            let user= await User.findById(req.params.id);
            User.uploadAvatar(req, res, function(err)
            {
                if(err){console.log('**Error  :'  ,err);}
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {
                        if(user.avatar)
                        {
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                    req.flash('success', 'Profile Pic Updated');
                    user.avatar = User.avatarPath  + '/'  + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(error){
                req.flash('error', error);
                 return res.redirect('back');
        }
    }
}
// L O G   I 
module.exports.login=function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('home',
        {
            title : "bbbbbbb...."
        });
    }
    return res.render('login',
    {
        title  :"aaaadnsdsd..."
    });
}
  
// S I G N    U P
module.exports.signup= function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.render('user_profile');
    }
    return res.render('signup');
}
// get the sign u p data
module.exports.create =function(req, res)
{
    if(req.body.password!=req.body.confirmpassword)
    {
        console.log(req.body);
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user)
    {
        if(err){console.log("error in finding User while sugnUp"); return }
        if(!user)
        {
            console.log("*********************************************");
            console.log(req.body);
    
            User.create(req.body, function(err, user)
            {
                if(err){console.log("error in creating User While creating......."); return}
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }
        });
    
}
module.exports.createSession=function(req , res)
{
    req.flash("success",  " Logged in Successfully");
    return res.redirect('/');
}
module.exports.destroySession = function(req, res)
{
    req.logout();
    req.flash("success",  " You Logged Out Successfully! ");
    return  res.redirect('/');
}
