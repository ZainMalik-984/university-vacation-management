import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Bell, BookOpen } from 'lucide-react';

function VacationViewer() {
  const [vacations, setVacations] = useState([]);
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vacRes, classRes] = await Promise.all([
          api.get('/vacations/'),
          api.get('/classes/')
        ]);
        setVacations(vacRes.data.map(v => ({ title: v.reason, start: v.start_date, end: v.end_date })));
        setClassesList(classRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Calendar Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Schedule Overview</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ center: 'dayGridMonth,dayGridWeek', left: 'prev,next today' }}
            events={[
              ...vacations,
              ...classesList.map(c => ({ title: `${c.title}${c.is_suspended ? ' (Suspended)' : ''}`, date: c.date }))
            ]}
            height={600}
            eventColor="#3B82F6"
          />
        </div>

        {/* Classes List Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Class Sessions</h2>
          <ul className="space-y-4">
            {classesList.map(cls => (
              <li key={cls.id} className="flex justify-between items-center p-4 border-l-4 border-blue-400 rounded-md hover:bg-blue-50 transition">
                <div className="flex items-center space-x-4">
                  <BookOpen className="text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{cls.title}</h3>
                    <p className="text-sm text-gray-600">{cls.date}</p>
                  </div>
                </div>
                <span className={`font-medium ${cls.is_suspended ? 'text-red-600' : 'text-green-600'}`}>
                  {cls.is_suspended ? 'Suspended' : 'Active'}
                </span>
              </li>
            ))}
            {classesList.length === 0 && (
              <p className="text-center text-gray-500">No classes available.</p>
            )}
          </ul>
        </div>

        {/* Notifications Section */}
        <div className="flex justify-center">
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition duration-200"
          >
            <Bell className="mr-2" />
            View Notifications
          </button>
        </div>

      </div>
    </div>
  );
}

export default VacationViewer;
