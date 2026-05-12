import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["ai","user"],
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const webstiteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        default:'Untitled'
    },
    latestCode:{
        type:String,
        required:true
    },
    conversation:[
        messageSchema
    ],
    deployed:{
        type:Boolean,
        default:false
    },
    deployeUrl:{
        type:String,
    },
    slug:{
        type:String,
        unique:true,
        sparse:true
    }

},{timestamps:true}) 
const websiteModel=mongoose.model('website',webstiteSchema)
export default websiteModel;