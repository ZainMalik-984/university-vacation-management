import { useState } from 'react';
import { Bell } from 'lucide-react'; // optional icon library

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-blue-600">
          🧠 Univerty of tech
        </div>

        {/* Right Side: Icons + Button */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative">
            <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>

          {/* Avatar (placeholder) */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            Z
          </div>

          {/* Login/Logout Button */}
          <button
            onClick={handleAuthToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
