import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';
import ContentSubmission from '../../components/Posts/ContentSubmission';
import ContentList from '../../components/Posts/ContentList';
import ContentFilters from '../../components/Posts/ContentFilters';
import Pagination from '../../components/UI/Pagination';
import { Loader2 } from 'lucide-react';

const Posts: React.FC = () => {
  const { theme } = useTheme();
  const { addNotification } = useNotification();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, approved: 0, rejected: 0, pending: 0, needs_review: 0 });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Get current posts
  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/posts?filter=${filter}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        // Sort posts by createdAt in descending order (newest first)
        const sortedPosts = Array.isArray(data.posts) 
          ? data.posts.sort((a: any, b: any) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          : [];
        setPosts(sortedPosts);
        setStats(data.stats || { total: 0, approved: 0, rejected: 0, pending: 0, needs_review: 0 });
        // Reset to first page when filter changes
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching posts:', error);
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load content. Please try again later.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    // Refresh data every 10 seconds
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, [filter, addNotification]);

  // Success handler for new content
  const handleContentSubmitted = () => {
    setSubmitForm(false);
    addNotification({
      type: 'success',
      title: 'Content Submitted',
      message: 'Your content has been submitted for moderation.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <button 
          onClick={() => setSubmitForm(!submitForm)}
          className={`px-4 py-2 rounded-md text-white ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {submitForm ? 'Cancel' : 'Submit New Content'}
        </button>
      </div>
      
      {submitForm && (
        <ContentSubmission 
          onSuccess={handleContentSubmitted} 
          onCancel={() => setSubmitForm(false)} 
        />
      )}
      
      <ContentFilters 
        filter={filter} 
        setFilter={setFilter} 
        stats={stats} 
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2">Loading content...</span>
        </div>
      ) : (
        <>
          <ContentList posts={getCurrentPosts()} />
          
          {posts.length > postsPerPage && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Posts;