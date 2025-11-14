import { useState } from "react";
import axios from "axios";

function StudentRequest() {
  const [roomType, setRoomType] = useState("");
  const [message, setMessage] = useState("");

  // Replace with your API URL
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/rooms/request`, {
        roomType,
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h2>Request a Room</h2>

      <form onSubmit={handleSubmit}>
        <label>Choose Room Type:</label>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        >
          <option value="">Select a room type</option>
          <option value="single">Single Room</option>
          <option value="double">Double Sharing</option>
          <option value="triple">Triple Sharing</option>
        </select>

        <button type="submit">Submit Request</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentRequest;
