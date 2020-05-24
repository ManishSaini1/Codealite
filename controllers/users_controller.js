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
    //TODO later
}