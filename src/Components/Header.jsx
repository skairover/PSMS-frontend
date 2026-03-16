import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
function Header({ title, setSidebarOpen }) {
  return (
    <header className="bg-[#d6e8e7] border-b flex justify-between items-center h-17.5 px-5">
      <button
  onClick={() => setSidebarOpen(true)}
  className="md:hidden dark:invert p-2"
  ><GiHamburgerMenu />  </button>
      <h2 className="font-bold text-2xl text-[#0B2027]">{title}</h2>

      {/* Container with full height and border */}
      <div className="h-full  flex items-center px-2">
        <FaCircleUser className="w-8 h-8 transition  delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
        
      </div>
    </header>
  );
}

export default Header;
