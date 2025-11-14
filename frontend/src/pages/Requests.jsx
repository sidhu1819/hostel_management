import { useEffect, useState } from "react";
import { getAllRequests, createRequest, deleteRequest } from "../api/axiosConfig";
import Loader from "../components/Loader";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getAllRequests();
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestRoom = async () => {
    try {
      await createRequest(); // Backend should create a request with student id automatically
      alert("Room request submitted!");
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create request");
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await deleteRequest(requestId); // Optional: add cancel endpoint in backend
      alert("Request canceled");
      fetchRequests();
    } catch (err) {
      alert("Failed to cancel request");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Room Requests</h1>

      <button
        onClick={handleRequestRoom}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Request a Room
      </button>

      {requests.length === 0 ? (
        <p>No room requests yet</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border">
                <td className="p-2 border">{req.roomNumber || "-"}</td>
                <td className="p-2 border">{req.status}</td>
                <td className="p-2 border">
                  {req.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleCancelRequest(req._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
