const User=require('../models/user');
const bcrypt=require('bcrypt');
 const signup=async(req,res)=>{
    try{
        const {firstName,lastName,emailId,password}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);
        const existingUser = await User.findOne({ emailId });
         if (existingUser) {
         throw new Error("User already exists with this email.");
        }

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
            throw new Error("Invalid Credentials,No user exist with this emailId");
        }
        const isPasswordValid= await user.validatePassword(password);
        if(!isPasswordValid) throw new Error("Invalid Credentials,Password Doesn't Match");
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

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password", error: err.message });
  }
};


module.exports={
    signup,
    login,
    logout,
    changePassword 

};

