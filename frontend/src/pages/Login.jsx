import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/login/', form);
      const role = res.data?.user?.role;

      if (role) {
        dispatch(loginSuccess({ role }));
        if (role === 'admin') {
          navigate('/admin-panel');
        } else {
          navigate('/vacations');
        }
      } else {
        alert('Unexpected response from server');
        console.error('Login success but role missing:', res.data);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600 space-x-2">
          <Link to="/forgot-password" className="hover:underline text-blue-600">
            Forgot by Link
          </Link>
          <span>|</span>
          <Link to="/request-otp" className="hover:underline text-blue-600">
            Forgot by Code
          </Link>
        </div>

        <div className="my-4 border-t border-gray-300" />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="inline-block bg-gray-100 hover:bg-blue-100 text-blue-600 font-semibold px-4 py-1 rounded-md transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
