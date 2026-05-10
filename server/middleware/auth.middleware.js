import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid credintial" });
    }
    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({message:'Internal Server Error'});
  }
};
