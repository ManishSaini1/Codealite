const express= require('express');
const router= express.Router();
const userController= require('../controllers/users_controller');
router.get('/profile',userController.profile);
const postController= require('../controllers/users_post_controller');
router.get('/post', postController.post);
const profileController=require('../controllers/user_profile_controller');
router.get('/user_profile', profileController.user_profile);
// log in 
router.get('/sign-in',userController.login );
router.get('/sign-up', userController.signup);
module.exports=router; 
 
