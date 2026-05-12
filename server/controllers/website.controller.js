import { generateResponse } from "../config/openRouter.js";
import userModel from "../models/user.model.js";
import websiteModel from "../models/website.model.js";
import { updatedSite } from "../utils/Dummy.js";
import extractJson from "../utils/extractJson.js";
import { masterPrompt } from "../utils/masterPrompt.js";

export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt required" });
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.credit < 50) {
      return res
        .status(400)
        .json({ message: "You have not enough credits to generate a website" });
    }

    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt);

      // parsed= await extractJson(raw)

      // Here i am passing dummy data
      parsed = raw;

      if (!parsed) {
        raw = await generateResponse(finalPrompt + "\n\nRETURN ON RAW JSON.");
        parsed = await extractJson(raw);
      }
    }
    if (!parsed.code) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    console.log(parsed.message);

    const website = await websiteModel.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "ai",
          content: parsed.message,
        },
      ],
      slug: prompt,
    });
    user.credit = user.credit - 50;
    await user.save();

    res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Website Generate Error" });
  }
};

export const getWebsiteById = async (req, res) => {
  try {
    const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    return res.status(200).json(website);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Get website by id error" + error.message });
  }
};

export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt required" });
    }
    const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.credit < 25) {
      return res
        .status(400)
        .json({ message: "You have not enough credits to generate a website" });
    }

    const updatedPrompt = `UPDATE THIS HTML WEBSITE.
      CURRENT CODE:
      ${website.latestCode}

      USER REQUEST:
      ${prompt}

      RETURN RAW JSON ONLY:
      {
      "message":"Short  confirmation",
      "code":"<UPDATE FULL HTML>
      }
    `;
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatedPrompt);

      // parsed= await extractJson(raw)
      // Here i am passing dummy data

      parsed = updatedSite

      if (!parsed) {
        raw = await generateResponse(updatedPrompt + "\n\nRETURN ON RAW JSON.");
        parsed = await extractJson(raw);
      }
    }
    if (!parsed.code) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message },
    );
    website.latestCode = parsed.code;
    await website.save();

    user.credit = user.credit - 25;
    await user.save();
    res
      .status(200)
      .json({
        message: parsed.message,
        code: parsed.code,
        remainingCredits: user.credit,
      });
  } catch (error) {
    res.status(500).json({ message: "Website Generate Error" });
  }
};

export const getAllWebsites=async(req,res)=>{
  try{
    const websites=await websiteModel.find({user:req.user._id})
    res.status(200).json(websites)
  } catch (error) {
    res.status(500).json({ message: "Error while getting all websites"+error.message });
  }
}

export const deploy=async(req,res)=>{
    try{
       const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
  
      website.slug=website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,60)+website._id.toString().slice(-5)
      website.deployed=true;
      website.deployeUrl=`${process.env.FRONTEND_URL}/site/${website.slug}`

      await website.save();

      res.status(200).json({
        url:website.deployeUrl
      })
    }catch(error){
        res.status(500).json({message:'Error while deploying website'+error.message})
    }
}

export const getWebsiteBySlug=async(req,res)=>{
 try{
       const website = await websiteModel.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    res.status(200).json(website)
  }catch(error){
    res.statsu(500).json({message:'error while getting website by slug'})
  }
}