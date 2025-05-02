import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ContentCategoryChart: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data for content categories
  const categories = [
    { name: 'Articles', value: 35, color: 'bg-blue-500' },
    { name: 'Blog Posts', value: 25, color: 'bg-green-500' },
    { name: 'News', value: 20, color: 'bg-purple-500' },
    { name: 'Reviews', value: 15, color: 'bg-amber-500' },
    { name: 'Other', value: 5, color: 'bg-gray-500' },
  ];
  
  // Calculate total for percentages
  const total = categories.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="h-60">
      <div className="relative pt-1">
        <div className="flex mb-2 h-6 overflow-hidden rounded-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.color}`}
              style={{ width: `${(category.value / total) * 100}%` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-3 w-3 ${category.color} rounded-full mr-2`}></div>
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