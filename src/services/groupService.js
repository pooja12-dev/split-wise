import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export const createGroup = async (groupData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-group`, groupData);
    return response.data.success;
  } catch (error) {
    throw error.response?.data?.error || "An unexpected error occurred.";
  }
};
//creating a group
// Update fetchGroups to accept 'user' as a parameter
export const fetchGroups = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/view-groups`, {
        params: { user: userId },
      });
      console.log("Full API Response:", response); // Log the entire response
      console.log("Response Data:", response.data); // Log response data
      return response.data.success || []; // Return the 'success' field
    } catch (error) {
      console.error("Error in fetchGroups:", error.response || error);
      throw error.response?.data?.error || "An unexpected error occurred.";
    }
  };
  


//fetching all groups

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const GroupDetails = () => {
  const { id } = useParams(); // This is the group ID from the URL
  const user = useSelector((state) => state.user.user); // Logged-in user from Redux

  console.log(id, user);
  useEffect(() => {
    if (!id || !user?.id) {
      console.warn("Missing group ID or user ID");
      return;
    }

    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/view-group",
          {
            params: {
              group_id:id,
              user: user.id, // User ID
            },
          }
        );

        console.log("Group data:", response.data);
      } catch (err) {
        console.error("API error:", err.response?.data || err.message);
      }
    })();
  }, [id, user]);
};
export default GroupDetails;


//fetching group based onuser id
