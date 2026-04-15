import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";



const Navbar = () => {
  // let [user, setUser] = useState(false);
const {user}=useSelector(store=>store.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
 const logoutHandler = async()=>{
  try{
const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
if(res.data.success){
  dispatch(setUser(null));
  navigate("/");
  toast.success(res.data.message)
}
  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
  }
 }
  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4 xl:px-0">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Job<span className="text-primary">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6 text-gray-600 hover:text-gray-900 transition-colors hidden md:flex">
          {
            user && user.role === "recruiter" ?(
              <>
               <li><Link to="/admin/dashboard" className=" hover:text-primary transition-all">Dashboard</Link></li>
               <li><Link to="/admin/companies" className=" hover:text-primary transition-all">Companies</Link></li>
               <li><Link to="/admin/jobs" className=" hover:text-primary transition-all">Jobs</Link></li>
              </>
            ):(
              <>
              <li><Link to="/" className="hover:text-primary transition-all">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-primary transition-all">Jobs</Link></li>
              <li><Link to="/Browse" className="hover:text-primary transition-all">Browse</Link></li>
              </>
            )
          }
           
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
             <Link to="/login"> <Button variant="outline" className="border-gray-200">Login</Button></Link>
             <Link to="/signup"><Button className="bg-primary hover:bg-primary/90 text-white shadow-md transition-all">
                Signup
              </Button></Link> 
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer bg-primary text-white flex items-center justify-center font-bold ring-2 ring-transparent hover:ring-primary/20 transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto}/>
                  <AvatarFallback>{user?.fullName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 border-gray-100 shadow-xl rounded-xl">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer bg-primary text-white flex items-center justify-center font-bold">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>{user?.fullName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user?.fullName}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">
                     {user?.profile?.bio || "No bio updated" }
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 mt-4 pt-4 border-t border-gray-50">
                  {
                    user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-primary transition-colors text-sm font-medium mb-2">
                        <User2 className="w-4 h-4" />
                        <Link to="/profile">View Profile</Link>
                      </div>
                    )
                  }
                 
                  <div onClick={logoutHandler} className="flex w-fit items-center gap-2 cursor-pointer hover:text-red-500 transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
