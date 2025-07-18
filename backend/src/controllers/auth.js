const User=require('../models/user');
const bcrypt=require('bcrypt');
 const signup=async(req,res)=>{
    try{
        const {firstName,lastName,emailId,password}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);

        const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashedpassword,
        })
         
        const savedUser=await user.save();
        const token=savedUser.getJwt();
        res.cookie("token",token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.json({
            message:"User Added Successfully",
            data:savedUser
        })


    }
    catch(err){
       res.status(400).send("ERROR while signup: " + err.message);
    }

}
 const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid=user.validatePassword(password);
        if(!isPasswordValid) throw new Error("Invalid Credentials")
        const token=user.getJwt();
        res.cookie("token",token,{
            expires:new Date(Date.now()+8*3600000),
        })
        res.json({
            message:"User Logged In",
            data:user
        });
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

}
 const logout=async function(req,res){
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout Successful!!");
}

module.exports={
    signup,
    login,
    logout
};

