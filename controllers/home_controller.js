module.exports.home=function(req ,res)
{
    console.log(req.cookies, "i am cookies");
    res.cookie('name', "saini");

    return res.render('home', {
            title: 'Home'
    });
}