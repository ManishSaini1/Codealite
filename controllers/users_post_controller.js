const Post= require('../models/post');
const Comment=require('../models/comment');
module.exports.post=async function(req, res)
{
    try {
        await Post.create({
            content : req.body.content,
           user: req.user._id
      });
           return res.redirect('back');       
    } catch (error) {
        console.log("Error is : " , err);
        return;
    }
 
       
}
module.exports.destroy= async function(req, res)
{
    try
    {
    let post =await Post.findById(req.params.id)
        // .id is written to convert the id into String for the Comparison
        if(post.user == req.user.id)
        {
            post.remove();
           await Comment.deleteMany({post : req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(error)
    {
        console.log("Error  : ", err);
        return;       
    }
}