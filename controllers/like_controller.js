const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.noo=function(req, res)
{
    return res.redirect('/hello');
}
module.exports.toggleLike=async function(req  ,res)
{
    console.log(" I A  m  in toggle like");
    
    try {

        let likeable;
        let deleted=false;
        if(req.query.type=='Post')
        {
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }
        let existingLike=await Like.findOne(
            {
                likeable:req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            if(existingLike)
            {
                likeable.likes.pull(existingLike._id);
                likeable.save();
                existingLike.remove();
                deleted=true
            }
            else{
                    let newLike= await Like.create({
                        user: req.user._id,
                        likeable:req.query.id,
                        onModel:req.query.type
                    });
                    likeable.likes.push(newLike.id);
                    likeable.save();
            }
            return res.status(200).json(
                {
                    message: "Request Successs full!!",
                    data: {
                        deleted: deleted
                    }
                })
        
    } catch (error) {
        
    }
}