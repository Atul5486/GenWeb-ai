import React, { useEffect, useState } from "react";
import { ArrowLeft, Check, Rocket, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axios.js";
import Loader from "../components/Loader.jsx";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [allWebsites, setAllWebsites] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleDeploy = async (id) => {
    try {
      const result = await axiosInstance.get(`/api/website/deploy/${id}`, {
        withCredentials: true,
      });
      window.open(`${result?.data?.url}`, "_blank");
      setAllWebsites((prev)=>prev.map((w)=>w.id===id ? {...w,deployed:true,deployeUrl:result?.data?.url}:w))
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = async (site) => {
    console.log(site);
    await navigator.clipboard.writeText(site.deployeUrl);
    setCopiedId(site._id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      setLoading(true);
      try {
        const result = await axiosInstance.get("/api/website/get-all", {
          withCredentials: true,
        });
        setAllWebsites(result.data || []);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    handleGetAllWebsites();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <button
            onClick={() => navigate("/generate")}
            className="px-4 py-2  rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition cursor-pointer"
          >
            + New Website
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
        </motion.div>
        {loading && <Loader />}
        {error && !loading && <div>{error}</div>}
        {allWebsites?.length === 0 && (
          <div className="mt-24 text-center text-zinc-400">
            You have no website
          </div>
        )}
        {!loading && !error && allWebsites?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {allWebsites.map((website, index) => {
          const copied=copiedId===website._id
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
                >
                  <div
                    onClick={() => navigate(`/editor/${website._id}`)}
                    className="relative h-40 bg-black cursor-pointer"
                  >
                    <iframe
                      srcDoc={website.latestCode}
                      className="absolute inset-0 w-[140%] h-full origin-top-left pointer-events-none bg-white"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <h3 className="text-base font-semibold line-clamp-2">
                      {website.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Last Updated :{" "}
                      {new Date(website.updatedAt).toLocaleDateString()}
                    </p>
                    {!website?.deployed ? (
                      <button
                        className="mt-auto flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to bg-purple-500 text-sm font-semibold hover:scale:105 transition px-4 py-1.5 rounded-xl cursor-pointer"
                        onClick={() => handleDeploy(website._id)}
                      >
                        <Rocket size={18} /> Deploy
                      </button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(website)}
                        className={`mt-auto flex items-center justify-center gap-2 px-4 py-1.5 cursor-pointer rounded-xl text-sm font-medium transition-all ${
                          copiedId
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/10 hover:bg-white/20 border border-white/10"
                        }`}
                      >
                        {copied ? (<><Check size={14}/>Link Copied</> ):(<><Share2 size={14} />
                        Share Link</>) }
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
