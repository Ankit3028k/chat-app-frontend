import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post('https://chat-app-backend-stzg.onrender.com/api/auth/login', userInput);
      const data = login.data;

      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
        toast.error(data.message); // Show error message if login failed
        return;
      }

      toast.success(data.message); // Show success message if login successful
      localStorage.setItem('chatapp', JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Login <span className="text-gray-950">Chatters</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">Email:</span>
            </label>
            <input
              id="email"
              type="email"
              value={userInput.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">Password:</span>
            </label>
            <input
              id="password"
              type="password"
              value={userInput.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
              className="w-full input input-bordered h-10"
            />
          </div>
          <button
            type="submit"
            className="mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg hover:bg-gray-900 text-white rounded-lg hover:scale-105"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-800">
            Don't have an account?{' '}
            <Link to="/register">
              <span className="text-gray-950 font-bold underline cursor-pointer hover:text-green-950">
                Register Now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
