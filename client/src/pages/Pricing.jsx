import React, { useState } from "react";
import { ArrowLeft, Check, Coins, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../config/axios.js";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: "100",
    description: "Perfect to explore genweb.ai",
    features: ["Ai website generation", "Responsive layout", "Basic Animation"],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: "500",
    description: "For serious creater  & freelancers",
    features: [
      "Everything in free",
      "Faster generation",
      "Edit and regenerate",
      "Download source code",
    ],
    popular: true,
    button: "Upgrade to pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: "1500",
    description: "For teams & power users",
    features: [
      "Unlimited iterations",
      "Highest Priority",
      "Team collaboration",
      "Dedicated support",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const { userData } = useSelector((state) => state.user);

  const handleBuy = async (plankey) => {
    if (!userData) {
      navigate("/");
      return;
    }
    if (plankey == "Free") {
      navigate("/dashboard");
      return;
    }
    setLoading(plankey);
    try {
      const result = await axiosInstance.post(
        "/api/billing",
        { planType: plankey },
        { withCredentials: true },
      );
      console.log(result)
      // eslint-disable-next-line react-hooks/immutability
      window.location.href=result.data.sessionUrl;
      setLoading(true);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute z-12 bottom-0 right-0 w-100 h-100 bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <button
        className="cursor-pointer relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-400 text-lg">
          Buy credits once. Build anytime.
        </p>
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ delay: i * 0.12 }}
            whileHover={{ y: -14, scale: 1.03 }}
            className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all
                ${
                  plan.popular
                    ? "border-indigo-500 bg-linear-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                    : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
                }
            `}
          >
            {plan.popular && (
              <span className="absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500">
                Most Popular
              </span>
            )}
            <h1 className="text-xl font-semibold mb-2">{plan.name}</h1>
            <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>

            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-sm text-zinc-400 mb-1">/One-time</span>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <Coins size={18} className="text-yellow-400" />
              <span className="font-semibold">{plan.credits}</span>
            </div>

            <ul className="space-y-3 mb-10">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <Check size={16} className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              disabled={loading}
              onClick={() => handleBuy(plan.key)}
              whileTap={{ scale: 0.96 }}
              className={`w-full py-3 rounded-xl font-semibold transition
                ${plan.popular ? "bg-indigo-500 hover:bg-indigo-600" : "bg-white/10 hover:bg-white/20"} disabled:opacity-60 cursor-pointer
            `}
            >
              {loading === plan.key ? "Redirecting..." : plan.button}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
