const Comment=require('../models/comment');
const Post= require('../models/post');
module.exports.create= function(req, res)
{
    Post.findById(req.body.post, function(err, post)
    {
        if(post)
        {
           // console.log(post + " post");
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
module.exports.destroy= function(req, res)
{
    console.log(" HERE I N DELETING COMMENTS ***************************" , req.body.params);
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
         return res.redirect('back');
     })  
      }
      else{ return res.redirect('back');}
    });
    // || (findPost.user.id==req.user.id)
       
 });
}