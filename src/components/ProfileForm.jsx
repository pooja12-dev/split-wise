import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";

export default function ProfileForm() {
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleSave = () => {
    // later: send updated name to backend
    setIsEditing(false);
  };

  if (!user) return <p className="p-4">No user data found.</p>;

  const profileLetter = user.email?.charAt(0).toUpperCase() || "?";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
          {profileLetter}
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-medium border-b focus:outline-none"
            />
          ) : (
            <p className="text-lg font-medium">{name || "No Name"}</p>
          )}
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {!isEditing ? (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
