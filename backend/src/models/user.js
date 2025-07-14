const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
// Defining the User schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
     lastName:{
        type:String,
        trim:true,
    },
     emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address: "+ value);
            }
        }
    },
     password:{
        type:String,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password which should include atleast one lowercase, one uppercase and one symbol...");
            }
        }
    },
     age:{
        type:Number,
        min:18
    },
     gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid...")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png",
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter Valid Photo Url... ");
            }
        }
    },
    about:{
        type:String,
        default:"This is default about of User...",
        validate(value){
            if(value.length > 500) throw new Error("About section must be within 100 words.");
        }

    },
    skills:{
       type:[String],
       validate(value){
        if(value.length>20){
            throw new Error("You can add a maximum of 20 skills.");
        }
       }

    }
},{
    timestamps:true,
});
userSchema.methods.getJwt=function(){
const user=this;
 const token= jwt.sign({_id:this._id},process.env.Token,{expiresIn:'7d'});
 if(!token) throw new error("Invalid Credentials")
 return token;


}
userSchema.methods.validatePassword=async function(password){
    const user=this;
    const isPasswordValid=await bcrypt.compare(password,this.password);

    return isPasswordValid;
}
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;