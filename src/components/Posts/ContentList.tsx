import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, Clock, AlertTriangle, Trash2, Edit, Eye, Loader2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  status: string;
  server: string;
  worker: string | null;
  moderationDetails: string | null;
  createdAt: string;
  completedAt?: string;
}

interface ContentListProps {
  posts: Post[];
}

const ContentList: React.FC<ContentListProps> = ({ posts }) => {
  const { theme } = useTheme();
  
  if (posts.length === 0) {
    return (
      <div className={`rounded-lg p-12 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-sm text-center`}>
        <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 mb-2">No content found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try changing your filters or submit new content.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          bg: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100',
          text: 'text-green-600',
          icon: <CheckCircle className="h-4 w-4 mr-1" />
        };
      case 'rejected':
        return {
          bg: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100',
          text: 'text-red-600',
          icon: <XCircle className="h-4 w-4 mr-1" />
        };
      case 'processing':
        return {
          bg: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100',
          text: 'text-blue-600',
          icon: <Loader2 className="h-4 w-4 mr-1 animate-spin" />
        };
      default:
        return {
          bg: theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100',
          text: 'text-amber-600',
          icon: <Clock className="h-4 w-4 mr-1" />
        };
    }
  };
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };
  
  return (
    <div className="space-y-4">
      {posts.map(post => {
        const statusInfo = getStatusColor(post.status);
        
        return (
          <div 
            key={post.id}
            className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-sm border-l-4 ${
              post.status === 'approved' ? 'border-green-500' : 
              post.status === 'rejected' ? 'border-red-500' : 
              post.status === 'processing' ? 'border-blue-500' : 
              'border-amber-500'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {post.author} · {getTimeAgo(post.createdAt)}
                </p>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${statusInfo.bg} ${statusInfo.text} mt-2 sm:mt-0`}>
                {statusInfo.icon}
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {post.content}
            </p>
            
            {post.moderationDetails && (
              <div className={`mb-3 p-2 text-sm rounded ${
                post.status === 'approved' 
                  ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400'
                  : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400'
              }`}>
                <strong>Moderation note:</strong> {post.moderationDetails}
              </div>
            )}
            
            <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
              <div className="flex space-x-4">
                <div>Worker: {post.worker || 'Unassigned'}</div>
                <div>Server: {post.server}</div>
                {post.completedAt && (
                  <div>Completed: {new Date(post.completedAt).toLocaleString()}</div>
                )}
              </div>
              
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button className={`p-1 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}>
                  <Eye className="h-4 w-4" />
                </button>
                <button className={`p-1 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}>
                  <Edit className="h-4 w-4" />
                </button>
                <button className={`p-1 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                }`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;