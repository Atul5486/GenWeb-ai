import mongoose from "mongoose";

export default function connectDB(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Mongodb Connected successfully");
}).catch(err=>console.log(err))
}