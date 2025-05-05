import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Groups = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/view-groups", {
            params: { user: user.id }, // Pass user.id as query parameter
          });
          setGroups(response.data.success); // Assuming the backend returns the groups
        } catch (err) {
          console.error("Error fetching groups:", err);
          setError("Failed to fetch groups");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>
      {groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600">{group.name}</h3>
              
              <p className="text-sm text-gray-500 mt-2">
                Members: {group.user_ids ? group.user_ids.length : 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;
