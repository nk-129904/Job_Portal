import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice.js";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ FIXED useEffect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">Create an Account</h1>
            <p className="text-sm text-gray-500 mt-2">Join us to find your dream job or the perfect candidate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-gray-700 font-medium">Full Name</Label>
              <Input
                type="text"
                value={input.fullName}
                name="fullName"
                onChange={changeEventHandler}
                placeholder="Ex. John Doe"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 font-medium">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Ex. john@example.com"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 font-medium">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Ex. 9876543210"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 font-medium">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="w-full sm:w-1/2">
              <Label className="text-gray-700 font-medium mb-3 block">Account Type</Label>
              <RadioGroup className="flex gap-4">
                <div className={`flex flex-1 items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all ${input.role === "student" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer font-medium text-sm w-full">Student</Label>
                </div>

                <div className={`flex flex-1 items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all ${input.role === "recruiter" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer font-medium text-sm w-full">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="w-full sm:w-1/2">
              <Label className="text-gray-700 font-medium mb-3 block">Profile Picture (Optional)</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer file:cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white rounded-lg h-11 transition-all" disabled>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8 bg-primary hover:bg-primary/90 text-white rounded-lg h-11 shadow-md hover:shadow-lg transition-all font-semibold">
              Create Account
            </Button>
          )}

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Log in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;