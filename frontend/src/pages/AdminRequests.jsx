import { useEffect, useState } from "react";
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
  getRooms,
} from "../api/axiosConfig";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  // Load data
  useEffect(() => {
    loadRequests();
    loadRooms();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await getAllRequests();
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load requests:", err);
    }
  };

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    }
  };

  const handleApprove = async (requestId) => {
    if (!selectedRoom) {
      alert("Select a room first!");
      return;
    }

    try {
      await approveRequest(requestId, selectedRoom);
      alert("Request approved and room assigned!");
      loadRequests();
      loadRooms();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      alert("Request rejected");
      loadRequests();
    } catch (err) {
      alert("Request rejection failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Requests</h1>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Select Room</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border">
                <td className="p-2 border">{req.student?.name}</td>
                <td className="p-2 border">{req.student?.rollNumber}</td>
                <td className="p-2 border">{req.status}</td>

                {/* Room Dropdown */}
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  >
                    <option value="">Select Room</option>
                    {rooms
                      .filter((r) => r.occupants.length < r.capacity)
                      .map((room) => (
                        <option key={room._id} value={room._id}>
                          Room {room.roomNumber} (Free:{" "}
                          {room.capacity - room.occupants.length})
                        </option>
                      ))}
                  </select>
                </td>

                <td className="p-2 border">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleApprove(req._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
