import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';
import ServerStatus from '../../components/Dashboard/ServerStatus';
import StatsOverview from '../../components/Dashboard/StatsOverview';
import ContentActivityChart from '../../components/Dashboard/ContentActivityChart';
import RecentContent from '../../components/Dashboard/RecentContent';
import ProcessingTimeChart from '../../components/Dashboard/ProcessingTimeChart';
import { ArrowUpRight, BarChart4, Clock, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    processing: 0
  });
  const [serverStatus, setServerStatus] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch stats - Using proxied endpoints
        const postsResponse = await fetch('/api/posts');
        if (!postsResponse.ok) throw new Error('Failed to fetch posts data');
        const postsData = await postsResponse.json();
        
        // Fetch server status - Using proxied endpoint
        const statusResponse = await fetch('/api/status');
        if (!statusResponse.ok) throw new Error('Failed to fetch server status');
        const statusData = await statusResponse.json();
        
        setStats(postsData.stats || {
          total: 0,
          approved: 0,
          rejected: 0,
          pending: 0,
          processing: 0
        });
        setServerStatus(statusData);
        setRecentPosts(Array.isArray(postsData.posts) ? postsData.posts.slice(0, 5) : []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        addNotification({
          type: 'error',
          title: 'Dashboard Error',
          message: 'Failed to load dashboard data. Please check server connection.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(interval);
  }, [addNotification]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
      
      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className={`rounded-lg p-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm h-80`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                } text-blue-600 mr-2`}>
                  <BarChart4 size={18} />
                </div>
                <h2 className="font-medium">Content Activity</h2>
              </div>
              <div className="flex items-center text-sm text-green-500">
                <span>23% increase</span>
                <ArrowUpRight size={14} className="ml-1" />
              </div>
            </div>
            <ContentActivityChart />
          </div>
        </div>
        
        <div>
          <div className={`rounded-lg p-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-sm h-80 overflow-hidden`}>
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
              } text-blue-600 mr-2`}>
                <Clock size={18} />
              </div>
              <h2 className="font-medium">Processing Time</h2>
            </div>
            <ProcessingTimeChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentContent posts={recentPosts} />
        </div>
        
        <div>
          <ServerStatus status={serverStatus} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;