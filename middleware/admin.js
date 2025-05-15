const {Router}=require("express")
const {adminModel}=require("../db");
const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="admin123";


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


adminRoute.post("/",function(req,res){
    res.json({
        message: "Admin signup"
    })
});



adminRoute.put("/",function(req,res){
    res.json({
        message: "Admin signup"
    })
});

adminRoute.get("/bulk",function(req,res){
    res.json({
        message: "Admin signup"
    })
});


module.exports={
    adminRoute:adminRoute
}