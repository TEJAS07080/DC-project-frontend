import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ModeratorPerformance: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data
  const moderators = [
    { id: 1, name: 'Worker1', processed: 124, approved: 98, rejected: 26, avgTime: 1.8 },
    { id: 2, name: 'Worker2', processed: 186, approved: 135, rejected: 51, avgTime: 2.3 },
    { id: 3, name: 'Worker3', processed: 97, approved: 82, rejected: 15, avgTime: 2.6 },
    { id: 4, name: 'Worker4', processed: 145, approved: 112, rejected: 33, avgTime: 1.9 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Moderator
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Processed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Approved
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Rejected
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Approval Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Avg Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {moderators.map(moderator => {
            const approvalRate = Math.round((moderator.approved / moderator.processed) * 100);
            
            return (
              <tr key={moderator.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full ${
                      theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                    } flex items-center justify-center text-blue-600 mr-3`}>
                      {moderator.name.charAt(0)}
                    </div>
                    <div className="text-sm font-medium">
                      {moderator.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {moderator.processed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {moderator.approved}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  {moderator.rejected}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2 max-w-[100px]">
                      <div 
                        className={`h-2.5 rounded-full ${
                          approvalRate > 80 ? 'bg-green-600' : 
                          approvalRate > 60 ? 'bg-blue-600' : 
                          'bg-amber-600'
                        }`}
                        style={{ width: `${approvalRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{approvalRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <span className={moderator.avgTime < 2 ? 'text-green-600' : 'text-amber-600'}>
                      {moderator.avgTime}s
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorPerformance;