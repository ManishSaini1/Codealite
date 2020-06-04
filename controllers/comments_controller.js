const Comment=require('../models/comment');
const Post= require('../models/post');
module.exports.create= function(req, res)
{
    Post.findById(req.body.post, function(err, post)
    {
        if(post)
        {
            console.log(post + " post");
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user : req.user._id
            }, function(err, comment)
            {
                 
                 console.log(" I am adding comment to the post");
                post.comments.push(comment);
                post.save();
                console.log(post + "after save");
               return res.redirect('/');
            });
        }
       // res.redirect('/');
    });                 
}