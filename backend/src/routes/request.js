const express=require('express');
const router=express.Router();
const {connectionDecision,connectionResponse}=require('../controllers/request');
const {userAuth}=require('../middlewares/auth');
router.post(
  "/request/send/:status/:toUserId",userAuth,connectionDecision);

router.post( "/request/review/:status/:requestId",
  userAuth,connectionResponse);

module.exports=router;