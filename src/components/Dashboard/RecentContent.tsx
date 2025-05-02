import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

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

interface RecentContentProps {
  posts: Post[];
}

const RecentContent: React.FC<RecentContentProps> = ({ posts }) => {
  const { theme } = useTheme();
  
  if (!posts || posts.length === 0) {
    return (
      <div className={`rounded-lg p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-sm h-full flex items-center justify-center`}>
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-sm h-full`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Recent Content</h2>
        <button className="text-sm text-blue-500 hover:underline">View All</button>
      </div>
      
      <div className="space-y-3 overflow-hidden">
        {posts.map((post) => (
          <div 
            key={post.id}
            className={`p-3 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            } hover:shadow-sm transition-shadow duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1 truncate">{post.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  By {post.author} · {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.content}
                </p>
              </div>
              <div className="ml-4">
                {post.status === 'approved' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </span>
                )}
                {post.status === 'rejected' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 dark:bg-red-900/30 text-red-600">
                    <XCircle className="h-3 w-3 mr-1" />
                    Rejected
                  </span>
                )}
                {post.status === 'pending' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </span>
                )}
              </div>
            </div>
            
            {post.moderationDetails && (
              <div className={`mt-2 px-2 py-1 text-xs rounded-sm ${
                post.status === 'approved' 
                  ? 'bg-green-50 dark:bg-green-900/10 text-green-600'
                  : 'bg-red-50 dark:bg-red-900/10 text-red-600'
              }`}>
                {post.moderationDetails}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-3 pt-2 border-t dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Worker: {post.worker || 'Unassigned'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Server: {post.server}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentContent;