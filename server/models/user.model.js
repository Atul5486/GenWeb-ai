import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
                type:String,
                min:6
        },
        avatar:{
            type:String
        },
        credit:{
            type:Number,
            default:100,
            min:0
        },
        plan:{
            type:String,
            enum:["free","pro","enterprise"],
            default:"free"
        }
},{
    timestamps:true
})

const userModel=mongoose.model('user',userSchema);
export default userModel;