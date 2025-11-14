import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const RequestRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/rooms');
        setRooms(res.data.filter(room => room.status !== 'Occupied')); // Only available rooms
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return setMessage('Please select a room');

    setSubmitting(true);
    setMessage('');

    try {
      await api.post('/api/requests', {
        studentId: user.id,
        roomId: selectedRoom,
      });
      setMessage('Room request submitted successfully!');
      setSelectedRoom('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Request a Room</h1>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Room</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          required
        >
          <option value="">-- Choose a Room --</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              Block {room.block} - Room {room.number} (Capacity: {room.capacity}, Occupants: {room.occupants.length})
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Request Room'}
        </button>
      </form>
    </div>
  );
};

export default RequestRoom;
