const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat-v3-0324";
import { updatedSite } from "../utils/Dummy.js";
import dotenv from "dotenv";
dotenv.config();
export const generateResponse = async (prompt) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "System",
            content: "You must return ONLY valid raw json.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      }),
    },
  );

  if (!response.ok) {
    // Here i am passing dummy data
    /*
    const err = await response.text();
    console.log(err)
    throw new Error("Open Router Error", err);
*/

    return updatedSite;
  }
  const data = await response.json();
  return data;
};
