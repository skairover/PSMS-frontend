import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone } from "react-icons/md";

function Header({ title, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-slate-200 flex justify-between items-center h-16 px-5 flex-shrink-0 shadow-sm">

      {/* Left — hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#071952] hover:bg-slate-100[#071952] transition-all duration-150"
        >
          <GiHamburgerMenu size={18} color="ffffff" />
        </button>

        <h2 className="font-bold text-xl text-[#071952]">{title}</h2>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 hover:text-[#088395] transition-all duration-150">
          <MdNotificationsNone size={22} color="#088395" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#088395] ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* Avatar */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all duration-150 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#071952] to-[#088395] flex items-center justify-center flex-shrink-0">
            <FaCircleUser className="text-white text-lg" />
          </div>
          <span className="hidden sm:block text-sm font-semibold text-[#071952] group-hover:text-[#088395] transition-colors duration-150">
            Admin
          </span>
        </button>

      </div>
    </header>
  );
}

export default Header;