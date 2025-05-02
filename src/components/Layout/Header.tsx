import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Bell, Menu, Sun, Moon, User, LogOut, Settings, 
  Search, ChevronDown
} from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  // Handle clicks outside menus
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-30 h-16 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-md px-4 flex items-center justify-between`}>
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative hidden md:block max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search content..." 
            className={`pl-10 pr-4 py-2 rounded-full w-full focus:outline-none ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {notificationsOpen && (
            <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } ring-1 ring-black ring-opacity-5`}>
              <div className="p-3 border-b dark:border-gray-700">
                <h3 className="text-sm font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto p-1">
                <div className={`p-3 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
                  <p className="text-sm">New content submitted for review</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 minutes ago</p>
                </div>
                <div className={`p-3 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
                  <p className="text-sm">Worker node 2 is offline</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="p-2 border-t dark:border-gray-700">
                <button className="text-sm text-blue-500 w-full text-center">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center ml-2"
          >
            <div className={`h-8 w-8 rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            } flex items-center justify-center mr-2`}>
              <User className="h-5 w-5" />
            </div>
            <span className="hidden md:block font-medium">{user?.username || 'Admin'}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          
          {userMenuOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } ring-1 ring-black ring-opacity-5`}>
              <div className="py-1">
                <button 
                  onClick={() => navigate('/settings')}
                  className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button 
                  onClick={logout}
                  className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;