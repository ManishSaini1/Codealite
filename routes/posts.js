const express= require('express');
const router= express.Router(); 
const passport= require('passport');
const postController= require('../controllers/users_post_controller');
router.post('/create',passport.checkAuthentication, postController.post);
module.exports=router;
