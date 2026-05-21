import React, { useEffect, useRef, useState, useMemo } from "react";
import { axiosInstance } from "../config/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { ArrowLeft, Code2, MessageSquare, Monitor, Rocket, Send, X } from "lucide-react";
import Code from "../components/Code.jsx";
import FullPreview from "../components/FullPreview.jsx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence,motion } from "motion/react";

const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showChat, setChat] = useState(false);

  const navigate=useNavigate()

  const thinkingSteps = useMemo(
    () => [
      "Understanding your request...",
      "Planning layout changes...",
      "Improving Responsiveness",
      "Applying animation...",
      "Finalizing update",
    ],
    [],
  );

  const iframeRef = useRef(null);

  const handleUpdate = async () => {
    if (!prompt) {
      return;
    }

    setLoading(true);
    setMessages((message) => [...message, { role: "user", content: prompt }]);
    try {
      const result = await axiosInstance.put(
        `/api/website/update/${id}`,
        { prompt },
        { withCredentials: true },
      );

      setMessages((message) => [...message, result.data.message]);
      setCode(result.data.code);
      setPrompt("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading, thinkingSteps]);


  useEffect(() => {
    const handleWebsiteData = async (id) => {
      try {
        const result = await axiosInstance.get(`/api/website/get-by-id/${id}`, {
          withCredentials: true,
        });
        setWebsite(result.data);
        setCode(result.data.latestCode);
        setMessages(result.data.conversation);
      } catch (error) {
        console.log(error.message);
        setError(error.response.data.message);
      }
    };
    handleWebsiteData(id);
  }, [id]);

   const handleDeploy = async () => {
    try {
      const result = await axiosInstance.get(`/api/website/deploy/${website._id}`, {
        withCredentials: true,
      });
      window.open(`${result?.data?.url}`, "_blank");
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!iframeRef.current || !code) {
      return;
    }

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!website) {
    return <Loader />;
  }
  return (
    // Full content here
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-95 flex-col border-r border-white/10 bg-black/80">
        <Header />
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-90 md:min-w-80:">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`
            max-w-[75%] ${m?.role === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <div
                  className={`px-4 py-1.5 rounded-2xl text-sm leading-relaxed ${
                    m?.role === "user"
                      ? "bg-white text-black"
                      : "bg-white/5 border border-white/10 text-zinc-200"
                  }`}
                >
                  {m?.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="max-w-[75%] mr-auto">
                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                  {thinkingSteps[currentIndex]}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                disabled={loading}
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                placeholder="Describe changes.."
              />
              <button
                className="rounded-2xl px-4 py-3 bg-white text-black "
                onClick={handleUpdate}
              >
                <Send />
              </button>
            </div>
          </div>
        </>
      </aside>
      <div className="flex-1 flex flex-col ">
        <div className="h-14 px-4 flex items-center justify-between  border-b border-white/10 bg-black/80">
          <span className="text-zinc-400">Live Preview</span>
          <div className="flex gap-2">
            {console.log(website)}
           {
            !website.deployed && (
               <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to bg-purple-500 text-sm font-semibold hover:scale:105 transition px-4 py-1.5 rounded-lg cursor-pointer"
            onClick={()=>handleDeploy()}>
              <Rocket size={14} /> Deploy
            </button>
            )
           }
            <button
              onClick={() => setChat(true)}
              className="p-2 lg:hidden cursor-pointer"
            >
              <MessageSquare />
            </button>
            <button
              className="p-2 cursor-pointer"
              onClick={() => setShowCode(true)}
            >
              <Code2 size={18} />{" "}
            </button>
            <button
              className="p-2 cursor-pointer"
              onClick={() => setShowFullPreview(true)}
            >
              <Monitor size={18} />{" "}
            </button>
          </div>
        </div>
        <iframe ref={iframeRef} className="w-full flex-1 bg-white" sandbox='allow-scripts allow-same-origin allow-forms'/>
      </div>
      {/* Show code popup */}
      {showCode && (
        <Code
          showCode={showCode}
          setShowCode={setShowCode}
          code={code}
          setCode={setCode}
        />
      )}

      {/* Show full preview */}
      {showFullPreview && (
        <FullPreview
          showFullPreview={showFullPreview}
          code={code}
          setShowFullPreview={setShowFullPreview}
        />
      )}

      {/* Show chat for small devices */}
      <AnimatePresence>
        {showChat &&(
        <motion.div
        initial={{y:"100%"}}
        animate={{y:0}}
        exit={{y:"100%"}}
        className="lg:hidden fixed inset-0 z-999 bg-black flex flex-col"
        >
        <Header onClose={()=>setChat(false)}/>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`
            max-w-[75%] ${m?.role === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <div
                  className={`px-4 py-1.5 rounded-2xl text-sm leading-relaxed ${
                    m?.role === "user"
                      ? "bg-white text-black"
                      : "bg-white/5 border border-white/10 text-zinc-200"
                  }`}
                >
                  {m?.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="max-w-[75%] mr-auto">
                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                  {thinkingSteps[currentIndex]}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                disabled={loading}
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                placeholder="Describe changes.."
              />
              <button
                className="rounded-2xl px-4 py-3 bg-white text-black "
                onClick={handleUpdate}
              >
                <Send />
              </button>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>


    
  );
  // header of this page
  function Header({onClose}) {
    return (
      <div className="h-14 px-4 flex items-center gap-2 border-b border-white/10">
        <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
        <span className="font-semibold truncate capitalize">{website.title}</span>
        {
          onClose && ( 
        <button onClick={onClose} className="lg:hidden border rounded-full p-1 cursor-pointer"><X size={18}/></button>
          )
        }
      </div>
    );
  }
};

export default Editor;
