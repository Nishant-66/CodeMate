const mongoose=require('mongoose');
const getProfile=(req,res)=>{
     try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }

}

const editProfile=async(req,res)=>{
    try{
 const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
   const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
   if (! isEditAllowed) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
}

module.exports={
    getProfile,
    editProfile,

}