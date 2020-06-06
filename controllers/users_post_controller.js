const Post= require('../models/post');
const Comment=require('../models/comment');
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
module.exports.destroy=  function(req, res)
{
    Post.findById(req.params.id,function(error, post)
    {
        // .id is written to convert the id into String for the Comparison
        if(post.user == req.user.id)
        {
            post.remove();
            Comment.deleteMany({post : req.params.id}, function(error)
            {
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}