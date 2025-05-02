import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FileText, CheckCircle, XCircle, Clock, BarChart } from 'lucide-react';

interface StatsProps {
  stats: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
    processing?: number;
  };
}

const StatsOverview: React.FC<StatsProps> = ({ stats }) => {
  const { theme } = useTheme();
  
  // Calculate percentages for progress bars
  const approvalRate = stats.total > 0 
    ? Math.round((stats.approved / stats.total) * 100) 
    : 0;
  
  const rejectionRate = stats.total > 0 
    ? Math.round((stats.rejected / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Content" 
        value={stats.total} 
        icon={<FileText className="h-5 w-5" />}
        color="blue"
      />
      <StatCard 
        title="Approved" 
        value={stats.approved} 
        icon={<CheckCircle className="h-5 w-5" />}
        color="green"
        percentage={approvalRate}
      />
      <StatCard 
        title="Rejected" 
        value={stats.rejected} 
        icon={<XCircle className="h-5 w-5" />}
        color="red"
        percentage={rejectionRate}
      />
      <StatCard 
        title="Pending Review" 
        value={stats.pending + (stats.processing || 0)} 
        icon={<Clock className="h-5 w-5" />}
        color="amber"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'amber';
  percentage?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  percentage
}) => {
  const { theme } = useTheme();
  
  const colorClasses = {
    blue: {
      bg: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100',
      text: 'text-blue-600',
      progress: 'bg-blue-600'
    },
    green: {
      bg: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100',
      text: 'text-green-600',
      progress: 'bg-green-600'
    },
    red: {
      bg: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100',
      text: 'text-red-600',
      progress: 'bg-red-600'
    },
    amber: {
      bg: theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100',
      text: 'text-amber-600',
      progress: 'bg-amber-600'
    }
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center">
        <div className={`rounded-full w-10 h-10 flex items-center justify-center ${colorClasses[color].bg}`}>
          <span className={colorClasses[color].text}>{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
        </div>
      </div>
      
      {percentage !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Rate</span>
            <span className={`text-xs font-medium ${colorClasses[color].text}`}>{percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colorClasses[color].progress} rounded-full`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsOverview;