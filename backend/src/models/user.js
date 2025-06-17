const mongoose=require('mongoose');
// Defining the User schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
     lastName:{
        type:String
    },
     emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
     password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:10
    },
     age:{
        type:Number,
        min:18
    },
     gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png"
    },
    about:{
        type:String,
        default:"This is default about of User..."

    },
    skills:{
       type:[String]
    }
},{
    timestamps:true,
});
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;