import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    try {
      await api.post('/user/password-reset-confirm/', { uid, token, password });
      setMessage('✅ Password reset successful. You can now log in.');
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch {
      setMessage('❌ Reset failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Reset Your Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
