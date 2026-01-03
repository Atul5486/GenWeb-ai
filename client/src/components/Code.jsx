import React from 'react'
// eslint-disable-next-line no-unused-vars
import {AnimatePresence,motion} from 'motion/react'
import Editor from '@monaco-editor/react';

import { X } from 'lucide-react'

const Code = ({showCode,setShowCode,code,setCode}) => {
  return (
    <AnimatePresence>
      {showCode &&(
        <motion.div
        initial={{x:"100%"}}
        animate={{x:0}}
        exit={{x:"100%"}}
        className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-999 bg-[#1e1e1e] flex flex-col'
        >
        <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
            <span className='text-sm font-medium '>index.html</span>
           <button className='cursor-pointer border rounded-full p-1' onClick={()=>setShowCode(false)}> <X size={18}/></button>
        </div>
            <Editor
             theme='vs-dark'
             value={code}
             language='html'
             onChange={(v)=>setCode(v)}
             />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Code
