const Comment=require('../models/comment');
const Post= require('../models/post');
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const emailWorker=require('../workers/comment_email_worker');
const Like=require('../models/like');

// const queueMicroTask=require('../config/kue');
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
            //Email commentig is offf  for now.....
                //     for(let i =0; i< 15; i++)
            //     {

            //     let job=queue.create('emails', toComment).save(function(error)
            //     {
            //             if(error){console.log("Error  in creating a queue",error); return; }
            //                 console.log(job.id);
            //     });
            // }   
                // commentMailer.newComment(toComment);

                
                 req.flash('success', 'Comment created successfully');
               return res.redirect('/');
            });
        }
    });                 
}
module.exports.destroy= async function(req, res)
{
    Comment.findById(req.params.id,async function(error, comment)
 {
    let postId=comment.post;
    // to allow the user to delete comment on his/her post
    let findPost;
   // console.log(" I AM here 111"  , postId);
    Post.findById(postId,async function(error, post)
    {
            findPost=post;
            // console.log(" I AM here and"  , findPost.user._id);
           //  console.log(" I am here and user id is", req.user.id);
             if((comment.user==req.user.id ) || findPost.user._id ==req.user.id)
             {
                 
     Post.findByIdAndUpdate(postId, {$pull: { comments :req.params.id }},async function(error, post)
     {
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

        req.flash('success', 'Comment deleted successfully');
         return res.redirect('/');
     })  
      }
      else{ return res.redirect('back');}
    });
 });
}