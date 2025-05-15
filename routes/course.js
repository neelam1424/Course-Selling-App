const {Router}=require("express")

const courseRoute=Router();
    
//want to purchase
courseRoute.post('/purchase',function(req,res){
    res.json({
        message: "Signup Endpoint"
    })
});

//all courses
courseRoute.get('/preview',function(req,res){
    res.json({
        message: "Signup Endpoint"
    })
});


module.exports={
    courseRoute:courseRoute
}