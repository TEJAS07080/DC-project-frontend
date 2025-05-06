import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProcessingTime {
  worker: string;
  averageTime: number;
}

interface ProcessingTimeChartProps {
  period: string;
  isLoading: boolean;
}

const ProcessingTimeChart: React.FC<ProcessingTimeChartProps> = ({ period, isLoading }) => {
  const { theme } = useTheme();
  const [data, setData] = useState<ProcessingTime[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcessingTimes = async () => {
      try {
        const response = await fetch(`/api/processing-times?period=${period}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching processing times:', error);
        setError('Failed to load processing time data');
      }
    };

    fetchProcessingTimes();
  }, [period]);

  const handleBarClick = (data: any) => {
    console.log(`Clicked worker: ${data.worker}, Average Time: ${data.averageTime}s`);
    // Placeholder for future filtering (e.g., show posts processed by this worker)
  };

  if (isLoading) {
    return (
      <div className="h-56 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="w-full h-56 flex items-center justify-center text-gray-500 dark:text-gray-400">
        {error || 'No processing time data available'}
      </div>
    );
  }

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          onClick={handleBarClick}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
          <XAxis
            dataKey="worker"
            tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#6B7280', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: theme === 'dark' ? '#D1D5DB' : '#6B7280', fontSize: 12 }}
            unit="s"
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
              borderRadius: '4px',
              color: theme === 'dark' ? '#D1D5DB' : '#1F2937',
            }}
            ///formatter={(value: number) => [`${value.toFixed(1)}s`, 'Average Time']}
          />
          <Legend
            verticalAlign="top"
            height={30}
            formatter={() => 'Average Processing Time'}
            iconType="square"
          />
          <Bar
            dataKey="averageTime"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProcessingTimeChart;