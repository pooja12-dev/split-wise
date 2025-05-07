import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Groups = () => {
  const user = useSelector((state) => state.user.user);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User is available:", user);
      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/view-groups",
            {
              params: { user: user.id },
            }
          );
          console.log("API Response:", response.data);
          setGroups(response.data.success); // You might want to console.log this
        } catch (err) {
          console.error("Error fetching groups:", err);
          setError("Failed to fetch groups");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      console.warn("User is null, skipping API call.");
    }
  }, [user]);

  const handleCardClick = (groupId) => {
    console.log("Navigating to group with ID:", groupId);
    navigate(`/dashboard/groups/${groupId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Log groups just before rendering
  console.log("Groups to render:", groups);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>
      {groups?.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => handleCardClick(group.id)}
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {group.name}
              </h3>
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
