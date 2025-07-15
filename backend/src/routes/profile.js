const express=require('express');
const router=express.Router();
const {getProfile,editProfile}=require('../controllers/profile');
const {userAuth}=require('../middlewares/auth');
router.get('/profile/view',userAuth,getProfile);
router.patch('/profile/edit',userAuth,editProfile);

module.exports=router;