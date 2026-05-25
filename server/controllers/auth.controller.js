import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js'
export const googleAuth=async(req,res)=>{
   try{
     const {name,email,avatar,password}=req.body;
    if(!email){
        return res.status(400).json({message:'Email must be required'});
    }
    const userExist=await userModel.findOne({email});
    
    if(userExist){
         const token=jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:7*24*60*60*1000
    });
        return res.status(200).json(userExist);
        // return res.status(400).json({message:'User already exist'});
    }
    const user=await userModel.create({
        name,
        email,
        avatar
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:7*24*60*60*1000
    });
    res.status(201).json(user);
   }catch(err){
    console.log(err)
    res.status(500).json({error:'Internal server error'});
   }
}

export const logout=(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        })  
        return res.status(200).json({message:'Logout successfully'});
    }catch(err){
    console.log(err)
    res.status(500).json({error:'Internal server error'});
   }
}