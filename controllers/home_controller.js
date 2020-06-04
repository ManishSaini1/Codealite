const Post= require('../models/post');
module.exports.home=function(req ,res)
{
    console.log(req.cookies, "i am cookies");
    res.cookie('name', "saini");
        
        Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(error, posts)
        {
            if(error){console.log("Error in finding posts" ,error); return;}
            console.log("Done with finding posts");
            console.log(posts);
            return res.render('home', {
                title: 'Home',
                post : posts,
                // user: user

        });
        
        

    });
    

    
}