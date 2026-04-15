import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../../utils/constant.js'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../../redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true // 🔥 VERY IMPORTANT
        }
      );

      console.log(res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // ❌ REMOVE localStorage (IMPORTANT)
        // localStorage.setItem("token", res.data.token);

        toast.success(res.data.message);
        if (res.data.user.role === "recruiter") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">Log in to your account to continue</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-gray-700 font-medium">Email Address</Label>
              <Input
                type="email"
                placeholder="Ex. john.doe@example.com"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">Account Type</Label>
              <RadioGroup className="grid grid-cols-2 gap-4">
                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all ${input.role === "student" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
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

                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all ${input.role === "recruiter" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
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
          </div>

          {
            loading ? (
              <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white rounded-lg h-11 transition-all" disabled>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Logging in...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-8 bg-primary hover:bg-primary/90 text-white rounded-lg h-11 shadow-md hover:shadow-lg transition-all font-semibold">
                Login to Account
              </Button>
            )
          }

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up instead
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;