import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
const navigate = useNavigate();
const {setAuthUser} = useAuth();
    const [userInput , setUserInput] = useState({});
const [loading, setLoading] = useState(false);


const handleInput = (e) => {
    setUserInput({
    ...userInput,
    [e.target.id]: e.target.value,
    });
}
console.log(userInput);

  
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const login = await axios.post('http://localhost:3000/api/auth/login', userInput, { withCredentials: true });

      const data = login.data;
      if(data.success === false) {
        setLoading(false);
        navigate('/')
       console.log(data.message);
      } 
toast.success(data.message)
 localStorage.setItem('chatapp', JSON.stringify(data))
 setAuthUser(data)
 setLoading(false)
navigate('/')
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message)
      // Handle error here
    } 
  };
    return(
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-1">
        <h1 className="text-3xl font-bold text-center text-red-900">
          Login <span className="text-gray-950 font-bold">Chatters</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <div className="mb-4">
            <label htmlFor="email">
              <span className="font-bold text-gray-950 text-xl label-text">Email</span>
            </label>
            <input
              type="email"
              onChange={handleInput}
              id="email"
              placeholder="Enter your email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address."
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">
              <span className="font-bold text-black text-xl label-text">Password</span>
            </label>
            <input
              type="password"
              onChange={handleInput}
              id="password"
              placeholder="Enter your password"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-900"  >
                {loading ? "loading.." : "Login" }
        
            
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-gray-900">
            Don't have an Account?
            <Link to="/register">
              <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950">
                Register Now!!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
