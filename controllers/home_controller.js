const Post= require('../models/post');
const User=require('../models/user');
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
            User.find({}, function(error, user)
            {
                return res.render('home', {
                    title: 'Home',
                    post : posts,
                    all_users : user 
            });
            //console.log(posts);
            
                // user: user

        });
        
        

    });
    

    
}