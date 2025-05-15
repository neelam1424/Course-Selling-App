const {Router}=require("express")
const {userModel}=require("../db")
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD} =require("../config");
const {userMiddleware}=require("../middleware/user")

const userRoute=Router();

    
//signup
userRoute.post('/signup',async function(req,res){
    const {email,password,firstName,lastName}=req.body;

    //try{
    await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message: "Succesfully Signup",
    }); 
//}catch(error){
  //  res.status(403).json({
    //    message:"Invalid credentials",error:error.message
    //});
//}
});
//signin

userRoute.post('/signin',async function(req,res){

    const {email,password}=req.body;

    const user=await userModel.findOne({
        email:email,
        password:password,
    })
    if(user){
        const token=jwt.sign({
            id:user._id,
        },JWT_USER_PASSWORD);
    

    res.json({
        token:token
    })
}else{
    res.status(403).json({
        message:"Incorrect credentials"
    })
}
});


//purchased course

userRoute.get('/purchases',function(req,res){
    res.json({
        message: "Signup Endpoint"
    })
});



module.exports={
    userRoute:userRoute
}