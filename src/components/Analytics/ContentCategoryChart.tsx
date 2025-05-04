import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

interface Category {
  name: string;
  value: number;
}

interface ContentCategoryChartProps {
  period: string;
  isLoading: boolean;
}

const ContentCategoryChart: React.FC<ContentCategoryChartProps> = ({ period, isLoading }) => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categoryColors: { [key: string]: string } = {
    Article: 'bg-blue-500',
    Blog: 'bg-green-500',
    News: 'bg-purple-500',
    Review: 'bg-amber-500',
    General: 'bg-gray-500',
    Other: 'bg-red-500',
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/categories?period=${period}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load category data');
      }
    };

    fetchCategories();
  }, [period]);

  // Calculate total for percentages
  const total = categories.reduce((sum, category) => sum + category.value, 0);

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || total === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-gray-500 dark:text-gray-400">
        {error || 'No category data available'}
      </div>
    );
  }

  return (
    <div className="h-60">
      <div className="relative pt-1">
        <div className="flex mb-2 h-6 overflow-hidden rounded-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className={categoryColors[category.name] || 'bg-gray-500'}
              style={{ width: `${(category.value / total) * 100}%` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-3 w-3 ${categoryColors[category.name] || 'bg-gray-500'} rounded-full mr-2`}></div>
              <span className="text-sm">{category.name}</span>
            </div>
            <div className="text-sm font-medium">
              {Math.round((category.value / total) * 100)}%
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Content: <span className="font-medium">{total} items</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCategoryChart;