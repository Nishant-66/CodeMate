const User=require('../models/user');
const jwt=require('jsonwebtoken');

const userAuth=async(req,res,next)=>{

    try{
        const {token}=req.cookies;
      
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const{_id}=jwt.verify(token,process.env.Token);
    

    const user=await User.findById(_id);
    if(!user) throw new Error("User doesnot exist");

    req.user=user;
    next();

    }catch(err){

        res.status(400).send("ERROR"+err.message);

    }

}

module.exports={
    userAuth,
}