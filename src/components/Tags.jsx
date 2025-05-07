import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagIcon, setTagIcon] = useState("");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchTags = async () => {
    try {
      let url = "";
      if (user?.id) {
        url = `http://localhost:3001/api/view-tags/${user.id}`;
      } else {
        url = `http://localhost:3001/api/view-tags`;
      }

      const response = await axios.get(url);
      if (response.status === 200) {
        setTags(response.data.data);
      } else {
        setErrorMsg("Failed to fetch tags.");
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setErrorMsg(error?.response?.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [user]);

  // Handle creating a tag
  const createTag = async (tag) => {
    console.log("Sending tag data:", tag); // ✅ Debug
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/create-tag",
        tag,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ Tag created:", response.data);

      // Reset fields and close modal
      setTagName("");
      setTagDescription("");
      setTagIcon("");
      setIsModalOpen(false);

      // Re-fetch updated tag list
      fetchTags();
    } catch (error) {
      console.error("❌ Error creating tag:");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error config:", error.config);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagPayload = {
      name: tagName,
      description: tagDescription,
      icon: tagIcon,
      user_id: user?.id, // optional based on backend
    };

    console.log("Submitting tag:", tagPayload);
    createTag(tagPayload);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Tags</h1>

      {/* Create Tag Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
      >
        Create Tag
      </button>

      {/* Tags List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div
              key={tag.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/tags/${tag.id}`)}
            >
              <div className="flex items-center space-x-2">
                {tag.icon && (
                  <img
                    src={tag.icon}
                    alt="Tag Icon"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="font-semibold">{tag.name}</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{tag.description}</p>
            </div>
          ))
        ) : (
          <p>No tags found. Please create one.</p>
        )}
      </div>

      {/* Create Tag Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Tag</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={tagDescription}
                  onChange={(e) => setTagDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Icon URL
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={tagIcon}
                  onChange={(e) => setTagIcon(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Tag"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
