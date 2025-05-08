import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Server, CheckCircle, XCircle } from 'lucide-react';

interface ServerStatusProps {
  status: Record<string, string>; // Changed from boolean to string to handle 'busy', 'idle', 'offline'
}

const ServerStatus: React.FC<ServerStatusProps> = ({ status }) => {
  const { theme } = useTheme();

  // Map status to online/offline for display
  const isOnline = (statusValue: string | boolean) => {
    if (typeof statusValue === 'boolean') return statusValue;
    return ['busy', 'idle'].includes(statusValue);
  };

  // Count online/offline servers
  const totalServers = Object.keys(status).length;
  const onlineServers = Object.values(status).filter(isOnline).length;
  
  // Calculate percentage
  const onlinePercentage = totalServers ? Math.round((onlineServers / totalServers) * 100) : 0;

  return (
    <div className={`rounded-lg p-4 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-sm h-full`}>
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
        } text-purple-600 mr-2`}>
          <Server size={18} />
        </div>
        <h2 className="font-medium">System Status</h2>
      </div>
      
      <div className="mt-2 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">Online Servers</span>
          <span className="text-sm font-medium">{onlineServers}/{totalServers}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${onlinePercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {Object.entries(status).map(([server, statusValue]) => {
          const online = isOnline(statusValue);
          return (
            <div 
              key={server}
              className={`flex items-center justify-between p-2 rounded-md ${
                theme === 'dark' 
                  ? online ? 'bg-green-900/20' : 'bg-red-900/20'
                  : online ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'} mr-3`}></div>
                <span className="text-sm font-medium">{server}</span>
              </div>
              <span className={`text-xs ${online ? 'text-green-600' : 'text-red-600'}`}>
                {typeof statusValue === 'boolean' ? (statusValue ? 'Online' : 'Offline') : statusValue}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-col space-y-2 mt-4">
        <div className={`text-xs p-2 rounded ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <span className="font-medium">Last Checked:</span> {new Date().toLocaleTimeString()}
        </div>
        <button className={`text-sm px-4 py-2 rounded-md ${
          theme === 'dark' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}>
          Restart Failed Servers
        </button>
      </div>
    </div>
  );
};

export default ServerStatus;