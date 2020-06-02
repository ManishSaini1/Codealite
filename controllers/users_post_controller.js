const Post= require('../models/post');
module.exports.post=function(req, res)
{
    Post.create({
        
        content : req.body.content,
        user: req.user._id
    }, function(error, post)
    {
        if(error){console.log("Error in creating task"); return}
        return res.redirect('back');
       });
}