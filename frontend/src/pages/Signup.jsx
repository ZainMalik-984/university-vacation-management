import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ first_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/user/registeration/admin/`, form);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="first_name"
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
