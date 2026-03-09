
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
 const handleLogout = () => {
  localStorage.removeItem('token');   
  toast.success('Logged out successfully');
  navigate('/login');                
};

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[#0B2027] text-white w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-[Florisha] text-lg">PSMS</h2>
          </div>

          <nav className="space-y-5 flex-1">
            <Link to="/dashboard" className="flex items-center hover:text-gray-300">
              <span>Dashboard</span>
            </Link>
            <Link to="/pharmacy" className="flex items-center hover:text-gray-300">
              <span>Pharmacy</span>
            </Link>
            <Link to="/emergency" className="flex items-center hover:text-gray-300">
              <span>Emergency</span>
            </Link>
            <Link to="/icu" className="flex items-center hover:text-gray-300">
              <span>ICU</span>
            </Link>
            <Link to="/pediatrics" className="flex items-center hover:text-gray-300">
              <span>Pediatrics</span>
            </Link>
          </nav>

          <button onClick={handleLogout} className="flex items-center hover:text-red-400 mt-auto">
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex bg-[#0B2027] text-white w-[15%] h-screen flex-col items-center p-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="font-[Florisha] text-lg">PSMS</h2>
        </div>

        <div className="flex flex-col flex-1 w-full">
          <nav className="space-y-5">
            <Link to="/dashboard" className="flex items-center hover:text-gray-300">
              <span>Dashboard</span>
            </Link>
            <Link to="/pharmacy" className="flex items-center hover:text-gray-300">
              <span>Pharmacy</span>
            </Link>
            <Link to="/emergency" className="flex items-center hover:text-gray-300">
              <span>Emergency</span>
            </Link>

            <Link to="/icu" className="flex items-center hover:text-gray-300">
              <span>ICU</span>
            </Link>
            <Link to="/pediatrics" className="flex items-center hover:text-gray-300">
              <span>Pediatrics</span>
            </Link>
          </nav>

          <button onClick={handleLogout} className="flex items-center hover:text-red-400 mt-auto">
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
