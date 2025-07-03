import { useEffect, useState } from 'react';
import api from '../utils/axios';

function VacationPanel() {
  const [vacations, setVacations] = useState([]);
  const [vacationForm, setVacationForm] = useState({ start_date: '', end_date: '', reason: ''});
  const [editingVacationId, setEditingVacationId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/vacations/');
      setVacations(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>{
    setVacationForm({ ...vacationForm, [e.target.name]: e.target.value })
    console.log(vacationForm)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVacationId) {
        vacationForm.id = editingVacationId
        await api.put(`/vacations/${editingVacationId}/`, vacationForm);
      } else {
        await api.post('/vacations/', vacationForm);
      }
      setVacationForm({ start_date: '', end_date: '', reason: ''});
      setEditingVacationId(null);
      fetchData();
    } catch (err) {
      alert('Vacation save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vacation?')) return;
    try {
      await api.delete(`/vacations/${id}/`);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (vac) => {
    setVacationForm({
      start_date: vac.start_date,
      end_date: vac.end_date,
      reason: vac.reason,
    });
    setEditingVacationId(vac.id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4 py-10">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Form Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            {editingVacationId ? 'Edit Vacation' : 'Create Vacation'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="start_date"
              type="date"
              value={vacationForm.start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="end_date"
              type="date"
              value={vacationForm.end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="reason"
              value={vacationForm.reason}
              onChange={handleChange}
              placeholder="Reason for vacation"
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              {editingVacationId ? 'Update Vacation' : 'Create Vacation'}
            </button>
          </form>
        </div>

        {/* Vacation List Section */}
        <div className="space-y-4">
          {vacations.map((vac) => (
            <div
              key={vac.id}
              className="bg-white bg-opacity-90 shadow-md border-l-4 border-blue-400 rounded-md p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vac.start_date} → {vac.end_date}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{vac.reason}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(vac)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vac.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {vacations.length === 0 && (
            <p className="text-center text-gray-500">No vacations available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VacationPanel;
