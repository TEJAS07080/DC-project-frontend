import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, Clock, ListFilter, Search } from 'lucide-react';

interface ContentFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  stats: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
  };
}

const ContentFilters: React.FC<ContentFiltersProps> = ({ filter, setFilter, stats }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className={`p-4 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search content..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-md w-full ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-gray-100 text-gray-900 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-sm text-blue-500"
        >
          <ListFilter className="h-4 w-4 mr-1" />
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <FilterButton 
          label="All" 
          count={stats.total}
          isActive={filter === 'all'} 
          onClick={() => setFilter('all')} 
          icon={null}
        />
        <FilterButton 
          label="Approved" 
          count={stats.approved}
          isActive={filter === 'approved'} 
          onClick={() => setFilter('approved')} 
          icon={<CheckCircle className="h-4 w-4 mr-1" />}
          color="green"
        />
        <FilterButton 
          label="Rejected" 
          count={stats.rejected}
          isActive={filter === 'rejected'} 
          onClick={() => setFilter('rejected')} 
          icon={<XCircle className="h-4 w-4 mr-1" />}
          color="red"
        />
        <FilterButton 
          label="Pending" 
          count={stats.pending}
          isActive={filter === 'pending'} 
          onClick={() => setFilter('pending')} 
          icon={<Clock className="h-4 w-4 mr-1" />}
          color="amber"
        />
      </div>
      
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <select className={`w-full px-3 py-2 rounded-md ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select className={`w-full px-3 py-2 rounded-md ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="news">News</option>
              <option value="article">Article</option>
              <option value="blog">Blog Post</option>
              <option value="review">Review</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author
            </label>
            <input 
              type="text" 
              placeholder="Filter by author"
              className={`w-full px-3 py-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode | null;
  color?: 'blue' | 'green' | 'red' | 'amber';
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  isActive,
  onClick,
  icon,
  color = 'blue'
}) => {
  const { theme } = useTheme();
  
  const getColorClasses = () => {
    if (isActive) {
      switch (color) {
        case 'green':
          return 'bg-green-600 text-white';
        case 'red':
          return 'bg-red-600 text-white';
        case 'amber':
          return 'bg-amber-600 text-white';
        default:
          return 'bg-blue-600 text-white';
      }
    }
    
    return theme === 'dark'
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${getColorClasses()}`}
    >
      {icon}
      {label} ({count})
    </button>
  );
};

export default ContentFilters;