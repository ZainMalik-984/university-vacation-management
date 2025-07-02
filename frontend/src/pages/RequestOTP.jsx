import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function RequestOTP() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/password-reset-code/', { email });
      setMessage('✅ OTP sent to your email.');

      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 3000);
    } catch {
      setMessage('❌ Failed to send OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Request OTP</h2>

        <form onSubmit={handleSend} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default RequestOTP;
