const express= require('express');
const router= express.Router();
const userController= require('../controllers/users_controller');
router.get('/profile',userController.profile);
const postController= require('../controllers/users_post_controller');
router.get('/post', postController.post);
module.exports=router; 
//const app=express();
// const port=8000;
// app.listen(port, function(error)
// {
//     if(error)
//     {
//         console.log(`Error in users route ${port}`);
//     }
// });
