import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  MdShield,
  MdDashboard,
  MdOutlineLocalPharmacy,
  MdOutlineEmergency,
  MdMonitorHeart,
  MdContentCut,
  MdChildCare,
  MdLogout,
} from 'react-icons/md';

const navItems = [
  { label: 'Dashboard',  to: '/dashboard',  icon: MdDashboard           },
  { label: 'Pharmacy',   to: '/pharmacy',   icon: MdOutlineLocalPharmacy },
  { label: 'Emergency',  to: '/emergency',  icon: MdOutlineEmergency     },
  { label: 'ICU',        to: '/icu',        icon: MdMonitorHeart         },
  { label: 'Surgery',    to: '/surgery',    icon: MdContentCut           },
  { label: 'Pediatrics', to: '/pediatrics', icon: MdChildCare            },
];

function SidebarContent({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full py-6 px-3">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#37B7C3] to-[#088395] flex items-center justify-center flex-shrink-0">
          <MdShield size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-base tracking-tight">PharmaFlow</span>
      </div>

      {/* Section label */}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 px-3 mb-3">
        Navigation
      </p>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#088395]/20 text-white before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-6 before:bg-[#37B7C3] before:rounded-r-full'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
              }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-white/10 mx-3 my-4" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-150 w-full"
      >
        <MdLogout size={18} className="flex-shrink-0" />
        Log out
      </button>

    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#071952] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[15%] h-screen bg-[#071952] flex-shrink-0">
        <SidebarContent onClose={undefined} />
      </aside>
    </>
  );
}

export default Sidebar;