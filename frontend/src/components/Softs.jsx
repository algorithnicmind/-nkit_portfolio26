import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const CreatePostModal = lazy(() => import('./CreatePostModal'));

const Softs = ({ adminUser }) => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Motivation', 'Certificate', 'Hackathon', 'Seminar', 'Webinar', 'Research'];

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/soft-posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <main id="softs" className="softs-section">
      <div className="container">

        <div className="feed-header">
          <h2 className="section-title">Personal Growth Hub</h2>
          {adminUser && (
            <button
              className="create-post-trigger"
              onClick={() => setIsModalOpen(true)}
              title="Create New Post"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="category-filters hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p>Loading updates...</p>
          </div>
        ) : (
          <div className="feed-container">
            {filteredPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                <p>No posts found in this category.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  className="feed-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="feed-card-header">
                    <div className="feed-user-info">
                      <div className="feed-avatar">AS</div>
                      <div>
                        <span className="feed-username">Ankit Sahoo</span>
                        <span className="feed-category-badge" style={{ display: 'block', marginTop: '2px', width: 'fit-content' }}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <span className="feed-time">{formatDate(post.created_at)}</span>
                  </div>

                  <div className="feed-caption">
                    {post.caption}
                  </div>

                  {post.media_url && (
                    <div className="feed-media">
                      {post.media_type === 'video' ? (
                        <video
                          src={`http://localhost:3000${post.media_url}`} // Assuming proxied or static serve
                          controls
                          className="feed-video"
                        />
                      ) : (
                        <img
                          src={`http://localhost:3000${post.media_url}`}
                          alt="Post Content"
                          className="feed-image"
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        <Suspense fallback={null}>
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPostCreated={fetchPosts}
          />
        </Suspense>

      </div>
    </main>
  );
};

export default Softs;



