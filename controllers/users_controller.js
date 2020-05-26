const User= require('../models/user');
//console.log(' i am here' ,  User.schema);
module.exports.profile= function(req, res)
{
    return res.end("<h1> At profile Section<h1>");
}
// L O G   I N
module.exports.login=function(req, res)
{
    return res.render('login');
}
  
// S I G N    U P
module.exports.signup= function(req, res)
{
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