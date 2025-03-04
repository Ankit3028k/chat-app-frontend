import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    profilepic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://chat-app-backend-stzg.onrender.com/api/auth/register', formData);
      if (response.status === 200) {
        alert('Registration successful!');
      }
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <div className="min-h-[92vh] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-500 w-full sm:w-96 h-[98%] sm:h-94">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl -z-10"></div>
          <h2 className="text-4xl font-bold text-center text-gray-800">Sing up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex'>
          <div className="group relative">
            
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="peer w-32 p-4 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <label className="absolute left-4 top-0 text-sm text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-purple-600 transition-all">
              Full Name
            </label>
          </div>

          <div className="group pl-8 relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="peer w-32 p-4 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <label className="absolute  left-12 top-0 text-sm text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-purple-600 transition-all">
              Username
            </label>
          </div>
          </div>
          <div className="group  relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full p-4 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <label className="absolute left-4 top-0 text-sm text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-purple-600 transition-all">
              Email
            </label>
          </div>

          <div className="group relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="peer w-full p-4 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <label className="absolute left-4 top-0 text-sm text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-purple-600 transition-all">
              Password
            </label>
          </div>

          <div className="group relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="peer w-full p-4 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label className="absolute left-4 top-0 text-sm text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-purple-600 transition-all">
              Gender
            </label>
          </div>

         
          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white rounded-2xl font-semibold hover:bg-purple-700 transition-all duration-300 mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
