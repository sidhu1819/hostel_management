import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-xl font-bold">
              Hostel Management
            </Link>
            {user && (
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/rooms"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Rooms
                </Link>
                <Link
                  to="/tickets"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Tickets
                </Link>
                <Link
                  to="/ai"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  AI Assistant
                </Link>
              </div>
            )}
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

