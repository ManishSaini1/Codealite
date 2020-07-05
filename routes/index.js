const express= require('express');
const router= express.Router();
const homeController=require('../controllers/home_controller');
console.log("IN INDEX ROUTER.....");

router.get('/', homeController.home);  
 router.use('/users', require('./users'));
 router.use('/post', require('./posts'));
 router.use('/comments', require('./comments'));
 router.use('/api', require('./api'));
 router.use('/likes', require('./likes'));
module.exports=router;
console.log("present");