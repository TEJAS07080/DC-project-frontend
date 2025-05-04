import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

interface Moderator {
  worker: string;
  processed: number;
  approved: number;
  rejected: number;
  needs_review: number;
  averageTime: number;
}

interface ModeratorPerformanceProps {
  period: string;
  isLoading: boolean;
}

const ModeratorPerformance: React.FC<ModeratorPerformanceProps> = ({ period, isLoading }) => {
  const { theme } = useTheme();
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/processing-times?period=${period}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setModerators(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching moderator performance:', error);
        setError('Failed to load moderator performance data');
      }
    };

    fetchModerators();
  }, [period]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || moderators.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        {error || 'No moderator performance data available'}
      </div>
    );
  }

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
              Needs Review
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
          {moderators.map((moderator, index) => {
            const approvalRate = moderator.processed > 0 
              ? Math.round((moderator.approved / moderator.processed) * 100)
              : 0;
            
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full ${
                      theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                    } flex items-center justify-center text-blue-600 mr-3`}>
                      {moderator.worker.charAt(0)}
                    </div>
                    <div className="text-sm font-medium">
                      {moderator.worker}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                  {moderator.needs_review}
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
                    <span className={moderator.averageTime < 2 ? 'text-green-600' : 'text-amber-600'}>
                      {moderator.averageTime}s
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