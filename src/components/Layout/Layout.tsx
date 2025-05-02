import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationCenter from '../Notifications/NotificationCenter';
import { useTheme } from '../../contexts/ThemeContext';
import { AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Check server connection
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) {
          throw new Error('Server connection failed');
        }
        setServerError(null);
      } catch (error) {
        setServerError('Backend server connection failed. Please check that the server is running.');
      }
    };

    checkServerConnection();
    const interval = setInterval(checkServerConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {serverError && (
          <div className="mx-4 mt-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {serverError}
            </div>
            <button onClick={() => setServerError(null)}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <main className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
      
      <NotificationCenter />
    </div>
  );
};

export default Layout;