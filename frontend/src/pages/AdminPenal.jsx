import { Link } from "react-router-dom";
import { ShieldCheck, CalendarDays, Users } from "lucide-react";

function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-4xl transition-all duration-300">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-10">
          🛠️ Admin Panel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/admin-panel/vacation"
            className="flex flex-col items-center justify-center bg-gray-300 hover:bg-amber-300 text-center p-6 rounded-2xl shadow hover:scale-105 transition-all duration-200"
          >
            <CalendarDays size={40} className="text-blue-600 mb-2" />
            <span className="font-medium text-lg text-gray-800">Vacations</span>
          </Link>

          <Link
            to="/admin-panel/classes"
            className="flex flex-col items-center justify-center bg-gray-200 hover:bg-amber-300 text-center p-6 rounded-2xl shadow hover:scale-105 transition-all duration-200"
          >
            <ShieldCheck size={40} className="text-blue-600 mb-2" />
            <span className="font-medium text-lg text-gray-800">Classes</span>
          </Link>

          <Link
            to="/admin-panel/user"
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-amber-300 text-center p-6 rounded-2xl shadow hover:scale-105 transition-all duration-200"
          >
            <Users size={40} className="text-blue-600 mb-2" />
            <span className="font-medium text-lg text-gray-800">Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
