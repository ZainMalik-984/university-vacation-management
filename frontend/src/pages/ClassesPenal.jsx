import { useEffect, useState } from 'react';
import api from '../utils/axios';

function ClassesPanel() {
  const [classes, setClasses] = useState([]);
  const [classForm, setClassForm] = useState({ title: '', date: '' });
  const [editingClassId, setEditingClassId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/classes/');
      setClasses(res.data);

    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setClassForm({ ...classForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClassId) {
        await api.put(`/classes/${editingClassId}/`, classForm);
      } else {
        await api.post('/classes/', classForm);
      }
      setClassForm({ title: '', date: '' });
      setEditingClassId(null);
      fetchData();
    } catch (err) {
      alert('Class save failed');
    }
  };

  const handleEdit = (cls) => {
    setClassForm({
      title: cls.title,
      date: cls.date,
    });
    setEditingClassId(cls.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      await api.delete(`/classes/${id}/`);
      fetchData();
    } catch (err) {
      alert('Failed to delete class');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4 py-20">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Form Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            {editingClassId ? 'Edit Class Session' : 'Create Class Session'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={classForm.title}
              onChange={handleChange}
              placeholder="Class Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              name="date"
              value={classForm.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              {editingClassId ? 'Update Class' : 'Create Class'}
            </button>
          </form>
        </div>

        {/* Class List Section */}
        <div className="space-y-4">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white bg-opacity-90 shadow-md border-l-4 border-blue-400 rounded-md p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{cls.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Date: {cls.date}</p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      cls.is_suspended ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {cls.is_suspended ? 'Suspended due to vacation' : 'Active'}
                  </p>
                </div>
                <div className="space-x-2 mt-1">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <p className="text-center text-gray-500">No classes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassesPanel;
