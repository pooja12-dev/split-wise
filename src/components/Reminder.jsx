import React from "react";

const reminders = [
  {
    id: 1,
    title: "Pay Electricity Bill",
    dueIn: "3 days",
    progress: 70, // percentage
  },
  {
    id: 2,
    title: "Recharge EV",
    dueIn: "1 day",
    progress: 40,
  },
  {
    id: 3,
    title: "Investment Review",
    dueIn: "5 days",
    progress: 20,
  },
];

const RemindersOverview = () => (
  <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 w-full max-w-md mt-5">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      Reminders Overview
    </h2>
    <ul className="space-y-5">
      {reminders.map(({ id, title, dueIn, progress }) => (
        <li key={id}>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-700">{title}</span>
            <span className="text-sm text-gray-500">{dueIn}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RemindersOverview;
