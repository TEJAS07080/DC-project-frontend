import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ActivityData {
  day: string;
  approved: number;
  rejected: number;
  pending: number;
  needs_review: number;
}

interface ContentActivityChartProps {
  period?: string;
  isLoading: boolean;
}

const ContentActivityChart: React.FC<ContentActivityChartProps> = ({ period = 'week', isLoading }) => {
  const { theme } = useTheme();
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/activity?period=${period}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setActivityData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching activity data:', error);
        setError('Failed to load activity data');
      }
    };

    fetchActivity();
  }, [period]);

  const handleBarClick = (data: any) => {
    console.log(`Clicked day: ${data.day}, Approved: ${data.approved}, Rejected: ${data.rejected}, Pending: ${data.pending}, Needs Review: ${data.needs_review}`);
    // Placeholder for future filtering (e.g., show posts from this day)
  };

  if (isLoading) {
    return (
      <div className="h-56 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !activityData || activityData.length === 0) {
    return (
      <div className="w-full h-56 flex items-center justify-center text-gray-500 dark:text-gray-400">
        {error || 'No activity data available'}
      </div>
    );
  }

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={activityData}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          onClick={handleBarClick}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
          <XAxis
            dataKey="day"
            tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#6B7280', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#6B7280', fontSize: 12 }}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
              borderRadius: '4px',
              color: theme === 'dark' ? '#D1D5DB' : '#1F2937',
            }}
          />
          <Legend verticalAlign="top" height={30} />
          <Bar
            dataKey="approved"
            stackId="a"
            fill="#22C55E"
            name="Approved"
            radius={[0, 0, 4, 4]}
            onClick={handleBarClick}
          />
          <Bar
            dataKey="rejected"
            stackId="a"
            fill="#EF4444"
            name="Rejected"
            radius={[0, 0, 0, 0]}
            onClick={handleBarClick}
          />
          <Bar
            dataKey="pending"
            stackId="a"
            fill="#F59E0B"
            name="Pending"
            radius={[0, 0, 0, 0]}
            onClick={handleBarClick}
          />
          <Bar
            dataKey="needs_review"
            stackId="a"
            fill="#9333EA"
            name="Needs Review"
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContentActivityChart;