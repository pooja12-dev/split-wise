import { Receipt, CreditCard, DollarSign } from 'lucide-react';

export default function Activity() {
  // Example activity data
  const activities = [
    { id: 1, type: 'expense', title: 'Dinner', amount: 45.00, paidBy: 'John', date: '2023-05-01', participants: ['You', 'John', 'Sarah'] },
    { id: 2, type: 'payment', title: 'Payment', amount: 15.00, paidBy: 'You', paidTo: 'Sarah', date: '2023-04-28' },
    { id: 3, type: 'expense', title: 'Groceries', amount: 32.50, paidBy: 'You', date: '2023-04-25', participants: ['You', 'Emma'] },
  ];

  // Function to render the appropriate icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense':
        return <Receipt size={20} className="text-blue-500" />;
      case 'payment':
        return <CreditCard size={20} className="text-green-500" />;
      default:
        return <DollarSign size={20} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Recent Activity</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            All
          </button>
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Groups
          </button>
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Friends
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.type === 'expense' 
                        ? `${activity.paidBy} paid $${activity.amount.toFixed(2)}`
                        : `You paid ${activity.paidTo} $${activity.amount.toFixed(2)}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className={`text-sm font-medium ${activity.type === 'payment' ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.type === 'payment' ? '+' : '-'}${activity.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}