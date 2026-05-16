import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import LoginModel from "../components/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import { axiosInstance } from "../config/axios";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setopenProfile] = useState(false);
  const [allWebsites, setAllWebsites] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const highlights = [
    "Ai Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  const handleLogout = async () => {
    try {
      axiosInstance.get("/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      if (!userData) return;
      try {
        const result = await axiosInstance.get("/api/website/get-all", {
          withCredentials: true,
        });
        setAllWebsites(result.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllWebsites();
  }, [userData]);

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden ">
      {/*  Headers */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50  backdrop-blur-xl bg-black/10  border-b border-white/10 "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">GenWeb.Ai</div>
          <div className="flex items-center gap-5">
            <div
              onClick={() => navigate("/pricing")}
              className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer"
            >
              Pricing
            </div>

            {userData && (
              <div
                onClick={() => navigate("/pricing")}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition"
              >
                <Coins className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credit}</span>
                <span className="font-semibold">+</span>
              </div>
            )}
            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:*:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setopenProfile(!openProfile)}
                  className="flex items-center cursor-pointer"
                >
                  {" "}
                  <img
                    className="rounded-full w-9 h-9 border border-white/20 object-cover"
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    referrerPolicy="no-referrer"
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>
                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                          <Coins className="text-yellow-400" />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credit}</span>
                          <span className="font-semibold">+</span>
                        </button>
                        <button
                          onClick={() => navigate("/dashboard")}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 cursor-pointer"
                        >
                          Dashboard
                        </button>
                        <button
                          className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Build Stunning Websites <br />
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Descrube your idea and let AI generate a modern, responsive,
          production-ready Websites.
        </motion.p>
        <button
          className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105
        transition mt-12 cursor-pointer"
          disabled={!userData}
          onClick={() => navigate("/dashboard")}
        >
          {!userData ? "Get Started" : "Go to Dashboard"}
        </button>
        {userData && (
          <button
            className="ml-2 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105
        transition mt-12 cursor-pointer"
            disabled={!userData}
            onClick={() => navigate("/generate")}
          >
            Generate Websites
          </button>
        )}
      </section>

      {/* Cards Section */}
      {!userData && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((highlight) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                key={highlight}
                className="bg-white/5 rounded-2xl border-white/10 p-8"
              >
                <h1 className="text-xl font-semibold mb-3">{highlight}</h1>
                <p className="text-zinc-400 text-sm">
                  GenWeb.ai builds real Websites - clean code,animation,
                  responsiveness and scalable structure.
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {userData && allWebsites?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <h3 className="text-2xl font-semibold mb-6">Your Websites</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {allWebsites.slice(0, 3).map((website, index) => {
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/editor/${website._id}`)}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition "
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
                  <div className="p-4">
                     <h3 className="text-base font-semibold line-clamp-2">
                      {website.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Last Updated :{" "}
                      {new Date(website.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai
      </footer>
      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
};

export default Home;
