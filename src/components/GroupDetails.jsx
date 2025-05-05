import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GroupDetails = () => {
  const { id } = useParams(); // Get the group ID from URL
  const [group, setGroup] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/view-group/${id}`
        );
        console.log(response);
        setGroup(response.data.success[0]);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [id]);

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.name}</h2>
      {/* Render the rest of the group details */}
      <p>Type: {group.type}</p>
      {/* Add more group details as needed */}
    </div>
  );
};

export default GroupDetails;
