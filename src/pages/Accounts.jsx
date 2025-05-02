import { User, UserPlus, Plus, CreditCard } from 'lucide-react';

export default function Accounts() {
  // Example friends data
  const friends = [
    { id: 1, name: 'John Smith', balance: -15.00 },
    { id: 2, name: 'Sarah Johnson', balance: 25.50 },
    { id: 3, name: 'Emma Davis', balance: 0 },
  ];

  // Example groups data
  const groups = [
    { id: 1, name: 'Roommates', members: 3, balance: 0 },
    { id: 2, name: 'Trip to NYC', members: 5, balance: -45.75 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Friends Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Friends</h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center">
              <UserPlus size={16} className="mr-2" />
              Add friend
            </button>
          </div>

          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {friends.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No friends added yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {friends.map((friend) => (
                  <li key={friend.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {friend.name}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {friend.balance === 0 ? (
                          <span className="text-sm text-gray-500">settled up</span>
                        ) : (
                          <span className={`text-sm font-medium ${friend.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {friend.balance > 0 ? 'owes you' : 'you owe'} ${Math.abs(friend.balance).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Groups Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Groups</h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center">
              <Plus size={16} className="mr-2" />
              Create group
            </button>
          </div>

          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {groups.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No groups created yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {groups.map((group) => (
                  <li key={group.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {group.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {group.members} members
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {group.balance === 0 ? (
                          <span className="text-sm text-gray-500">settled up</span>
                        ) : (
                          <span className={`text-sm font-medium ${group.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {group.balance > 0 ? 'you are owed' : 'you owe'} ${Math.abs(group.balance).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}