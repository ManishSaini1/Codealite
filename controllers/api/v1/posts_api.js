const Post= require('../../../models/post');
const Comment =require('../../../models/comment');
module.exports.index= async function(req, res)
{
    let posts =await Post.find({})
    .sort('-createdAt')
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
});
    return res.json(200, {
        message  :"LIST of Posts", 
        post: posts
    });
}
module.exports.destroy= async function(req, res)
{
    try
    {
    let post =await Post.findById(req.params.id)
    console.log(req.params);
    console.log(post.user);
        // .id is written to convert the id into String for the Comparison
        if(post.user == post.user)
        {
            post.remove();
           await Comment.deleteMany({post : req.params.id});
          // console.log(req.xhr);
        //    
        //    req.flash('success', 'Post deleted successfully');
            return res.json(200, 
                {
                    message : 'Post and Associated Comments Deleted'
                   
                });
        }
        else{
            // req.flash('error', 'Cant delete Post');
            // return res.redirect('back');
            return res.json(401,
                {
                    message : "You can't delete this Post",
                    val1: post.user, 
                    val2 : req.params.id

                });
        }
    }
    catch(error)
    {
        // req.flash('erorr', error);
        console.log('********', error);
        return res.json(500, 
            {
                message  : 'Internal Server Error'
            })    ;
    }
}