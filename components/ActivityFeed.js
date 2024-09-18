import React from 'react';

const ActivityFeed = () => {
  const activities = [
    { id: 1, type: 'Workout', description: 'Completed a 30-minute HIIT session', time: '2 hours ago' },
    { id: 2, type: 'Meal', description: 'Logged lunch - Grilled chicken salad', time: '5 hours ago' },
    { id: 3, type: 'Goal', description: 'Achieved daily step goal', time: '1 day ago' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start">
            <div className="flex-shrink-0">
              <span className="inline-block h-8 w-8 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">
                {activity.type[0]}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;