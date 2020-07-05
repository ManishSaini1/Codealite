const Post= require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
module.exports.post=async function(req, res)
{
    try {
     let post =await Post.create({
            content : req.body.content,
           user: req.user._id
      }); 
    if (req.xhr){
        post = await post.populate('user', 'name').execPopulate();
        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        });
    }
       req.flash('success', 'Post created successfully');
           return res.redirect('back');       
    } catch (error) {
        req.flash('error', error);
        return;
    }
 
       
}
module.exports.destroy= async function(req, res)
{
    console.log(" IN DESTROYING POST");
    try
    {
    let post =await Post.findById(req.params.id)
        // .id is written to convert the id into String for the Comparison
        if(post.user == req.user.id)
        {
            // await Like.deleteMany({likeable: post, onModel: 'Post'});
            // await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
           await Comment.deleteMany({post : req.params.id});
           console.log(req.xhr);
           if(req.xhr)
           {
               console.log("yes req is xhr")
               return res.status(200).json({
                   data :{
                       post_id : req.params.id
                   },
                   message: "Post deleted "
               })
           }
           req.flash('success', 'Post deleted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Cant delete Post');
            return res.redirect('back');
        }
    }
    catch(error)
    {
        req.flash('erorr', error);
        return res.redirect('back');    
    }
}