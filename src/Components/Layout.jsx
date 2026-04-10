import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-screen overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full h-screen">
        <Header title={title} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 bg-slate-100 overflow-y-auto w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;