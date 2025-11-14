import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalTickets: 0,
    myTickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchStats(parsedUser);
    }
  }, []);

  const fetchStats = async (currentUser = user) => {
    try {
      const [roomsRes, ticketsRes] = await Promise.all([
        api.get('/api/rooms'),
        api.get('/api/tickets'),
      ]);

      const allTickets = ticketsRes.data;
      const myTickets = currentUser
        ? allTickets.filter(
            (ticket) =>
              ticket.student._id === currentUser.id ||
              ticket.student._id?.toString() === currentUser.id?.toString()
          )
        : [];

      setStats({
        totalRooms: roomsRes.data.length,
        totalTickets: allTickets.length,
        myTickets: myTickets.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome, {user?.name}!
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Rooms
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalRooms}
          </p>
        </div>

        {user?.role === 'admin' ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total Tickets
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalTickets}
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              My Tickets
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.myTickets}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Role</h3>
          <p className="text-3xl font-bold text-purple-600 capitalize">
            {user?.role}
          </p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/rooms"
          className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-bold mb-2">Manage Rooms</h2>
          <p className="text-blue-100">
            View and manage hostel rooms and assignments
          </p>
        </Link>

        <Link
          to="/tickets"
          className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          <h2 className="text-xl font-bold mb-2">Tickets & Complaints</h2>
          <p className="text-green-100">
            Create and manage tickets and complaints
          </p>
        </Link>

        <Link
          to="/ai"
          className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
          <p className="text-purple-100">
            Get help with hostel-related queries
          </p>
        </Link>

        {/* NEW — Student Room Request Button */}
        {user?.role === "student" && (
          <Link
            to="/request-room"
            className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            <h2 className="text-xl font-bold mb-2">Request a Room</h2>
            <p className="text-yellow-100">
              Submit a request for room allocation
            </p>
          </Link>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
