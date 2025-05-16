require('dotenv').config()
const express =require("express")
const mongoose=require("mongoose")
const {userRoute}=require("./routes/user")
const {courseRoute}=require("./routes/course")
const {adminRoute}= require("./routes/admin")


const app=express();
app.use(express.json());


app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/admin",adminRoute);


async function main(){
await mongoose.connect(process.env.MONGO_URL)
app.listen(3000); 
}
main()