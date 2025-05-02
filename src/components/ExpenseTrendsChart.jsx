import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Example expense data (replace with your own)
const data = [
  { month: "Jan", expense: 1200 },
  { month: "Feb", expense: 1100 },
  { month: "Mar", expense: 1450 },
  { month: "Apr", expense: 900 },
  { month: "May", expense: 1300 },
  { month: "Jun", expense: 1700 },
  { month: "Jul", expense: 1600 },
  { month: "Aug", expense: 1500 },
  { month: "Sep", expense: 1400 },
  { month: "Oct", expense: 1550 },
  { month: "Nov", expense: 1650 },
  { month: "Dec", expense: 1800 },
];

const ExpenseTrendsChart = () => (
  <div className="w-full h-72 bg-white rounded-xl shadow p-4">
    <h3 className="text-lg font-semibold mb-2">Expense Trends</h3>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="expense" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ExpenseTrendsChart;
