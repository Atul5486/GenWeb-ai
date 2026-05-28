import stripeInstance from "../config/stripe.js";
import userModel from '../models/user.model.js'

export const stripeWebHook=async(req,res)=>{
    const signature=req.headers["stripe-signature"]
    let event;
    try {
        event=stripeInstance.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        res.status(500).json({message:"Error in webhook"+error.message});
    }   

    if(event.type=="checkout.session.completed"){
        const session=event.data.object
        const userId=session.metadata.userId
        const plan=session.metadata.plan
        const credits=Number(session.metadata.credits)

       const res= await userModel.findByIdAndUpdate(userId,{
            $inc:{credits},
            plan
        })
        console.log(res)
    }
    return res.json({received:true})
}