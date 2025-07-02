import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || '';
  const [form, setForm] = useState({ otp: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!emailFromState) {
      navigate('/request-otp');
    }
  }, [emailFromState, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/password-reset-verify/', {
        ...form,
        email: emailFromState,
      });
      setMessage('✅ Password reset successful. Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setMessage('❌ Invalid OTP or error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default VerifyOTP;
