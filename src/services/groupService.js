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

export const viewGroup = async (id, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/view-group/${id}`,
      {
        params: { user: userId },
      }
    );
    return response.data.success;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "An unexpected error occurred."
    );
  }
};

//fetching group based onuser id
