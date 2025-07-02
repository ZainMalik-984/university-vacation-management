import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { User, Edit2, Trash2 } from 'lucide-react';

function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: 'student',
    is_active: true,
    password: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/user/register/');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm({
      ...userForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await api.patch(`/user/register/${editingUserId}/`, userForm);
      } else {
        await api.post('/user/register/', userForm);
      }
      setUserForm({ email: '', first_name: '', last_name: '', role: 'student', is_active: true, password: '' });
      setEditingUserId(null);
      fetchUsers();
    } catch {
      alert('Failed to save user.');
    }
  };

  const handleEdit = (user) => {
    setUserForm({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      is_active: user.is_active,
      password: '',
    });
    setEditingUserId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/user/register/${id}/`);
      fetchUsers();
    } catch {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center">
          <User className="inline-block mr-2" />
          User Management
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="email"
            type="email"
            value={userForm.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="first_name"
            type="text"
            value={userForm.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="last_name"
            type="text"
            value={userForm.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            value={userForm.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="role"
            value={userForm.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              name="is_active"
              type="checkbox"
              checked={userForm.is_active}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
            />
            <span className="text-gray-700">Active</span>
          </label>
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition-all duration-200 font-medium"
          >
            {editingUserId ? 'Update User' : 'Create User'}
          </button>
        </form>

        <div className="space-y-4">
          {users.map((user, idx) => (
            <div
              key={user.id || idx}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <User className="text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">{user.first_name} {user.last_name}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-sm">Role: <span className="font-medium">{user.role}</span></p>
                  <p className="text-gray-500 text-sm">Status: <span className={user.is_active ? 'text-green-600' : 'text-red-600'}>{user.is_active ? 'Active' : 'Inactive'}</span></p>
                </div>
              </div>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800 transition">
                  <Edit2 />
                </button>
                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 transition">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagementPanel;
