const Post= require('../models/post');
module.exports.home=function(req ,res)
{
    console.log(req.cookies, "i am cookies");
    res.cookie('name', "saini");
        
        Post.find({}).populate('user').exec(function(error, posts)
        {
            if(error){console.log("Error in finding posts"); return;}
            console.log("Done with finding posts");
            return res.render('home', {
                title: 'Home',
                posts : posts,
                // user: user

        });
        
        

    });
    

    
}