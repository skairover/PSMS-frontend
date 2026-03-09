// Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-screen overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col text-black w-full h-screen ">
        <Header title={title} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 bg-[#d6e8e7]  overflow-x-scroll w-full h-full p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
