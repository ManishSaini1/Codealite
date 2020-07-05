const express=require('express');
const router=express.Router();
const likesController=require('../controllers/like_controller');
console.log(" in likes route");
router.post('/toggle', likesController.toggleLike);
module.exports=router;