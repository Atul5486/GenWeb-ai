import { X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const FullPreview = ({ showFullPreview, code, setShowFullPreview }) => {
  return (
    <AnimatePresence>
      {showFullPreview && (
        <motion.div className="fixed inset-0 z-999 bg-black">
          <iframe className="w-full h-full bg-white" srcDoc={code} sandbox='allow-scripts allow-same-origin allow-forms'/>
          <button
            className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg"
            onClick={() => setShowFullPreview(false)}
          >
            <X />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullPreview;
