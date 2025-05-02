import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Calendar, Calendar as CalendarIcon, BarChart2, Clock } from 'lucide-react';
import ModeratorPerformance from '../../components/Analytics/ModeratorPerformance';
import ContentCategoryChart from '../../components/Analytics/ContentCategoryChart';
import ProcessingTimeChart from '../../components/Dashboard/ProcessingTimeChart';
import ContentActivityChart from '../../components/Dashboard/ContentActivityChart';

const Analytics: React.FC = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState('week');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-2 rounded-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm flex items-center`}>
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className={`bg-transparent focus:outline-none ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className={`px-4 py-2 rounded-md ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            } text-blue-600 mr-2`}>
              <BarChart2 size={18} />
            </div>
            <h2 className="font-medium">Content Activity</h2>
          </div>
          <ContentActivityChart />
        </div>
        
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
            } text-purple-600 mr-2`}>
              <Clock size={18} />
            </div>
            <h2 className="font-medium">Processing Time</h2>
          </div>
          <ProcessingTimeChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm lg:col-span-2`}>
          <h2 className="font-medium mb-4">Moderator Performance</h2>
          <ModeratorPerformance />
        </div>
        
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          <h2 className="font-medium mb-4">Content Categories</h2>
          <ContentCategoryChart />
        </div>
      </div>
      
      <div className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <h2 className="font-medium mb-4">Moderation Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard 
            title="Average Processing Time" 
            value="2.4s" 
            change="-12%" 
            trend="down" 
          />
          <InsightCard 
            title="Approval Rate" 
            value="76%" 
            change="+5%" 
            trend="up" 
          />
          <InsightCard 
            title="Content Volume" 
            value="245" 
            change="+23%" 
            trend="up" 
          />
        </div>
      </div>
    </div>
  );
};

interface InsightCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  change,
  trend
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 rounded-lg ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-end mt-2">
        <p className="text-2xl font-semibold">{value}</p>
        <p className={`ml-2 text-sm ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
        </p>
      </div>
    </div>
  );
};

export default Analytics;