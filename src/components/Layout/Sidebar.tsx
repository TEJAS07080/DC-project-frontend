import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  LayoutDashboard, FileText, BarChart2, Settings,
  Users, Database, Server, Activity, ChevronRight,
  MessageSquare, ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();
  const location = useLocation();
  
  const mainNavItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/posts', label: 'Content', icon: <FileText size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  const systemNavItems: NavItem[] = [
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/database', label: 'Database', icon: <Database size={20} /> },
    { path: '/servers', label: 'Servers', icon: <Server size={20} /> },
    { path: '/logs', label: 'Logs', icon: <Activity size={20} /> },
  ];

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link 
        to={item.path}
        className={`flex items-center px-3 py-2 rounded-md my-1 transition-colors duration-200 ${
          isActive 
            ? theme === 'dark'
              ? 'bg-blue-900/30 text-blue-400' 
              : 'bg-blue-100 text-blue-700'
            : theme === 'dark'
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3">{item.icon}</span>
        <span className={`${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-200`}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-lg`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-9 w-9 bg-blue-600 rounded-md flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
          <h1 className={`ml-2 font-bold text-lg ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-200`}>
            ContentMod
          </h1>
        </div>
        {/* <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button> */}
      </div>
      
      <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <div>
          <p className={`text-xs uppercase font-medium mb-2 text-gray-500 dark:text-gray-400 ${
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          } transition-opacity duration-200`}>
            Main
          </p>
          <nav>
            {mainNavItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>
        </div>
        
        <div className="mt-8">
          <p className={`text-xs uppercase font-medium mb-2 text-gray-500 dark:text-gray-400 ${
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          } transition-opacity duration-200`}>
            System
          </p>
          <nav>
            {systemNavItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>
        </div>
        
        <div className={`mt-8 p-3 rounded-md ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
        } ${isOpen ? 'block' : 'hidden'}`}>
          <p className="text-sm font-medium mb-2">Need help?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Check our documentation or contact support for assistance.
          </p>
          <button className={`mt-2 text-sm px-3 py-1 rounded-md w-full ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            View Documentation
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;