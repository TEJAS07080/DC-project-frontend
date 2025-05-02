import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// This would normally use a chart library like Chart.js or Recharts
// For this implementation, we'll create a simplified version
const ContentActivityChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Mock data for the chart
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const approved = [12, 19, 15, 22, 30, 25, 18];
  const rejected = [8, 5, 10, 8, 12, 7, 4];
  const pending = [5, 7, 8, 10, 6, 4, 7];
  
  // Find the maximum value to normalize heights
  const maxValue = Math.max(...approved, ...rejected, ...pending);
  
  // Calculate the heights as percentage of the maximum
  const normalizeHeight = (value: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="w-full h-56">
      <div className="flex items-end justify-between h-44 w-full mb-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-end justify-center space-x-1 h-full">
            <div
              style={{ height: `${normalizeHeight(approved[index])}%` }}
              className="w-3 bg-green-500/70 dark:bg-green-500/90 rounded-t"
            ></div>
            <div
              style={{ height: `${normalizeHeight(rejected[index])}%` }}
              className="w-3 bg-red-500/70 dark:bg-red-500/90 rounded-t"
            ></div>
            <div
              style={{ height: `${normalizeHeight(pending[index])}%` }}
              className="w-3 bg-amber-500/70 dark:bg-amber-500/90 rounded-t"
            ></div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between w-full border-t dark:border-gray-700 pt-2">
        {days.map(day => (
          <div key={day} className="text-xs text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Approved</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Rejected</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default ContentActivityChart;