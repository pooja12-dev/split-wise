import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const GroupDetails = () => {
  const { id } = useParams(); // Group ID from URL
  const user = useSelector((state) => state.user.user); // Logged-in user from Redux

  console.log("GroupDetails Rendered");
  console.log("Group ID from useParams:", id);
  console.log("User from Redux:", user);

  useEffect(() => {
    if (!id || !user?.id) {
      console.warn("Missing group ID or user ID");
      return;
    }

    console.log("Preparing request with:");
    console.log("group_id:", id);
    console.log("user:", user.id);

    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/view-group",
          {
            params: {
              group_id: id,
              user: user.id,
            },
          }
        );

        console.log(
          "Axios GET URL:",
          `http://localhost:3001/api/view-group?group_id=${id}&user=${user.id}`
        );
        console.log("Group data:", response.data);
      } catch (err) {
        console.error("API error:", err.response?.data || err.message);
      }
    };

    fetchGroup();
  }, [id, user]);

  return null; // Add actual UI later
};

export default GroupDetails;
