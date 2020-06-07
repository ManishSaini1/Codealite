const User= require('../models/user');
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

module.exports.update= function(req ,res)
{
    if(req.user.id == req.params.id)
    {
            User.findByIdAndUpdate(req.params.id,req.body, function(error, user)
            {
                return res.redirect('back');
            });
    }else{
        return res.status(401).send("Unauthorized");
    }
}
// L O G   I 
module.exports.login=function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.render('user_profile',
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
    return res.redirect('/');
}
module.exports.destroySession = function(req, res)
{
    req.logout();
  return  res.redirect('/');
}
