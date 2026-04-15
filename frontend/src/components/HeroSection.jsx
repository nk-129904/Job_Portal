import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice.js";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
   const searchJobHandler = ()=>{
dispatch(setSearchedQuery(query))
naviagte("/browse");
   }
  return (
    <div className="text-center py-20 px-4">
        <div className="flex flex-col gap-6 my-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <span className="mx-auto px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide border border-primary/20 shadow-sm" >No.1 Job Hunt Website</span>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
        Search, Apply & <br /> Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dream Jobs</span>
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-lg pt-2 pb-6">
        Discover thousands of job opportunities from top companies. We help you build a career that you love and find jobs that match your skills perfectly.
      </p>
      <div className="flex w-full md:w-[60%] lg:w-[45%] shadow-xl border border-gray-100 pl-6 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-white/80 backdrop-blur-sm" >
        <input type="text" placeholder="Find your dream jobs" onChange={(e)=>setQuery(e.target.value)} className="outline-none border-none w-full bg-transparent text-gray-700 font-medium placeholder:font-normal placeholder:text-gray-400" />
        <Button onClick={searchJobHandler} className="rounded-full bg-primary hover:bg-primary/90 h-10 w-12 flex items-center justify-center p-0 transition-all shadow-md hover:shadow-lg">
            <Search className="h-5 w-5 text-white"/>
        </Button>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
