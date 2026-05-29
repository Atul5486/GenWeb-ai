import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { axiosInstance } from '../config/axios'
const LiveSite = () => {
    const {id}=useParams()
    const [html,setHtml]=useState("");
    const [error,setError]=useState("");
    useEffect(() => {
        const handleWebsiteData = async () => {
          try {
            const result = await axiosInstance.get(`/api/website/get-by-slug/${id}`);
            setHtml(result?.data?.latestCode)
          } catch (error) {
            console.log(error.message);
            setError("Site not found");
          }
        };
        handleWebsiteData();
      }, [id]);

   if(error){
        return <div className='h-screen flex items-center justify-center bg-black text-white'>{error}</div>
   }   
  return (
   <iframe title='Live Site' srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
  )
}

export default LiveSite
