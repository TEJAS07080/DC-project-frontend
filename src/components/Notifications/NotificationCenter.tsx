import React, { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification } = useNotification();
  const { theme } = useTheme();
  
  // Auto-dismiss notifications after delay
  useEffect(() => {
    if (notifications.length === 0) return;
    
    const timers = notifications.map(notification => {
      if (notification.persist) return null;
      
      return setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    });
    
    return () => {
      timers.forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`rounded-lg p-4 shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } border-l-4 ${
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'error' ? 'border-red-500' :
            notification.type === 'warning' ? 'border-amber-500' :
            'border-blue-500'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {notification.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
              {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
              {notification.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">{notification.title}</h3>
              {notification.message && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {notification.message}
                </p>
              )}
            </div>
            <button 
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;