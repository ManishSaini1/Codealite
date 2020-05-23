module.exports.post=function(req, res)
{
    return res.render('users_post',
    {
        title: 'Users Post'
    });
}