import React from 'react';

const UpcomingWorkouts = () => {
  const workouts = [
    { id: 1, name: 'Morning Yoga', time: 'Tomorrow, 7:00 AM' },
    { id: 2, name: 'Strength Training', time: 'Wednesday, 6:00 PM' },
    { id: 3, name: 'HIIT Cardio', time: 'Friday, 5:30 PM' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Upcoming Workouts</h3>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li key={workout.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{workout.name}</p>
              <p className="text-sm text-gray-500">{workout.time}</p>
            </div>
            <button className="text-purple-600 hover:text-purple-800">
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingWorkouts;