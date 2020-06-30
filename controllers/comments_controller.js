const Comment=require('../models/comment');
const Post= require('../models/post');
const commentMailer=require('../mailers/comments_mailer');
module.exports.create= async function(req, res)
{
    Post.findById(req.body.post, function(err, post)
    {
        if(post)
        {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user : req.user._id
            },async function(err, comment)
            {
                 if(err)
                 {
                     req.flash('error', "Can't create Comment");
                 }
                 
                post.comments.push(comment);
                post.save();
                let toComment=await comment.populate('user', 'name email').execPopulate();
                commentMailer.newComment(toComment);
                 req.flash('success', 'Comment created successfully');
               return res.redirect('/');
            });
        }
    });                 
}
module.exports.destroy= function(req, res)
{
    Comment.findById(req.params.id,function(error, comment)
 {
    let postId=comment.post;
    // to allow the user to delete comment on his/her post
    let findPost;
   // console.log(" I AM here 111"  , postId);
    Post.findById(postId, function(error, post)
    {
            findPost=post;
            // console.log(" I AM here and"  , findPost.user._id);
           //  console.log(" I am here and user id is", req.user.id);
             if((comment.user==req.user.id ) || findPost.user._id ==req.user.id)
             {
                 
     Post.findByIdAndUpdate(postId, {$pull: { comments :req.params.id }},function(error, post)
     {
        req.flash('success', 'Comment deleted successfully');
         return res.redirect('/');
     })  
      }
      else{ return res.redirect('back');}
    });
 });
}