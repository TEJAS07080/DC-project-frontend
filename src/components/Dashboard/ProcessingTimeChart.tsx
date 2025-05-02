import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// This would normally use a chart library like Chart.js or Recharts
const ProcessingTimeChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Mock data for average processing time in seconds
  const data = [2.5, 3.2, 2.8, 1.9, 2.3, 2.1, 1.8];
  const labels = ['Worker1', 'Worker2', 'Worker3', 'Worker4', 'Worker5', 'Worker6', 'Worker7'];
  
  // Find the maximum value for scaling
  const maxValue = Math.max(...data);
  
  // Calculate bar width as percentage
  const getBarWidth = (value: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="h-60 overflow-hidden">
      <div className="space-y-4">
        {data.map((time, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600 dark:text-gray-400 pr-2">
              {labels[index]}
            </div>
            <div className="flex-1">
              <div className="relative h-6">
                <div className={`absolute h-full bg-gray-200 dark:bg-gray-700 w-full rounded-full`}></div>
                <div 
                  className={`absolute h-full ${
                    time < 2 ? 'bg-green-500' : time < 3 ? 'bg-blue-500' : 'bg-amber-500'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${getBarWidth(time)}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {time.toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t dark:border-gray-700 pt-3">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Average processing time across all workers: <span className="font-medium text-blue-500">2.4s</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Processing time trend: <span className="text-green-500">↓ 12% faster this week</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingTimeChart;