const express= require('express');
const router= express.Router();
const passport=require('passport');
const userController= require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
const postController= require('../controllers/users_post_controller');
router.get('/post', postController.post);
const profileController=require('../controllers/user_profile_controller');
router.get('/user_profile', passport.checkAuthentication,profileController.user_profile);
// log in 
router.get('/sign-in',userController.login );
router.get('/sign-up', userController.signup);
router.post('/create' ,userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {   
        failureRedirect: '/users/sign-in'
    },
),userController.createSession);
router.get('/sign-out', userController.destroySession);
router.get('/auth/google',passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect :'users/sign-in'}), userController.createSession);

module.exports=router; 
 
