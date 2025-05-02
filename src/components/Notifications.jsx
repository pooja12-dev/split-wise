import React from 'react';

const notifications = [
  {
    id: 1,
    icon: '🔔',
    message: 'Your electricity bill is due in 3 days.',
    time: '2 hours ago',
  },
  {
    id: 2,
    icon: '⚡',
    message: 'EV charging station nearby is available.',
    time: '5 hours ago',
  },
  {
    id: 3,
    icon: '💰',
    message: 'Investment portfolio increased by 4.5%.',
    time: '1 day ago',
  },
];

const Notifications = () => (
  <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 w-full max-w-md mt-5">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Notifications</h2>
    <ul className="space-y-4">
      {notifications.map(({ id, icon, message, time }) => (
        <li key={id} className="flex items-center space-x-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <p className="text-gray-700">{message}</p>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Notifications;
