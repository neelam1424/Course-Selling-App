const {Router}=require("express")
const {adminModel,courseModel}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} =require("../config");
const {adminMiddleware}=require("../middleware/admin")




const adminRoute=Router();



adminRoute.post("/signup",async(req,res)=>{
   const {email,password,firstName,lastName}=req.body;
//TODO:Add Zod validation

//TODO:hash the password so pw is not stored in the DB.
try{
await adminModel.create({
    email:email,
    password:password,
    firstName:firstName,
    lastname:lastName

})

res.json({
    message: "Signup succeeded"
})
}catch(error){
res.status(403).json({message:"Signup Failed",error:error.message});
}
});


adminRoute.post("/signin",async(req,res)=>{
   const {email,password}=req.body;

   const admin=await adminModel.findOne({
    email:email,
    password:password
   })

   if(admin){
    const token=jwt.sign({
        id:admin._id,
    },JWT_ADMIN_PASSWORD);
    res.json({
        token:token
    })
   }else{
    res.status(403).json({
        message:"Incorrect credentials"
    })
   }
});


adminRoute.post("/course",adminMiddleware,async function(req,res){

    const adminId=req.userId;

    const {title,description,imageUrl,price}=req.body;

    await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId

    })
    res.json({
        message: "Course created",
        courseId:course._id
    })
});


adminRoute.put("/course",adminMiddleware,async function(req,res){

    const adminId=req.userId;

    const {title,description,imageUrl,price,courseId}=req.body;

    await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
    })
    res.json({
        message: "Course updated",
        courseId:course._id
    })
});



adminRoute.get("/bulk",adminMiddleware,async function(req,res){
  const adminId=req.userId;

  const courses=await courseModel.find({
    creatorId:adminId
  });
  res.json({
    message:"Course updated",
    courses
  })

});


module.exports={
    adminRoute:adminRoute
}