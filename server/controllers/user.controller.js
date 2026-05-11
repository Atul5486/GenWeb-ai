export const getCurrentUser=async(req,res)=>{
    try{
         const user=req.user
    if(!user){
        return res.status(400).json({user:null})
    }
    res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:'Internal Server Error'});
    }
}