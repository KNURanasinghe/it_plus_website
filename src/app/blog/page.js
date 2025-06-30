"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [regularPosts, setRegularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PocketBase API configuration
  const POCKETBASE_URL = 'http://127.0.0.1:8090';

  // Function to get file URL from PocketBase
  const getImageUrl = (record, filename) => {
    if (!filename) return "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop";
    return `${POCKETBASE_URL}/api/files/blog/${record.id}/${filename}`;
  };

  // Fetch blog posts from PocketBase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${POCKETBASE_URL}/api/collections/blog/records?sort=-created`);
        console.log('Fetching blog posts from:', `${POCKETBASE_URL}/api/collections/blog/records?sort=-created`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Separate posts based on postkind
        const latest = data.items.filter(post => post.postkind === 'latestPosts');
        const regular = data.items.filter(post => post.postkind === 'regularPosts');
        
        // Transform data to match component structure
        const transformedLatest = latest.map(post => ({
          id: post.id,
          image: getImageUrl(post, post.image),
          date: new Date(post.created).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          title: post.title,
          readTime: post.readTime || "2 Min Read",
          type: post.type || "featured",
          author: post.author || "Admin",
          content: post.content || `<h2>Content</h2><p>${post.title}</p>`,
          postkind: post.postkind
        }));

        const transformedRegular = regular.map(post => ({
          id: post.id,
          image: getImageUrl(post, post.image),
          date: new Date(post.created).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          title: post.title,
          readTime: post.readTime || "3 Min Read",
          author: post.author || "Admin",
          content: post.content || `<h2>Content</h2><p>${post.title}</p>`,
          postkind: post.postkind
        }));

        setLatestPosts(transformedLatest);
        setRegularPosts(transformedRegular);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        
        // Fallback to default data if API fails
        setLatestPosts([
          {
            id: 1,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
            date: "May 9th, 2023",
            title: "The most Popular Business Of the Year",
            readTime: "2 Min Read",
            type: "featured",
            author: "John Doe",
            content: `<h2>Introduction</h2><p>Sample content...</p>`,
            postkind: "latest"
          }
        ]);
        setRegularPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedBlog(post);
  };

  const handleBackToBlog = () => {
    setSelectedBlog(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="blog-page-container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
        <Footer />
        
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            gap: 20px;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4a00e0;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="blog-page-container">
        <Header />
        <div className="error-container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
        
        <style jsx>{`
          .error-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            padding: 20px;
          }
          
          .error-message {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 500px;
          }
          
          .error-message h2 {
            color: #e74c3c;
            margin-bottom: 15px;
          }
          
          .error-message p {
            color: #666;
            margin-bottom: 25px;
          }
          
          .retry-button {
            background: #4a00e0;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
          }
          
          .retry-button:hover {
            background: #3a00b0;
          }
        `}</style>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="blog-detail-container">
        <div className="blog-detail-header">
          <button onClick={handleBackToBlog} className="back-button">
            ← Back to Blog
          </button>
        </div>
        
        <article className="blog-detail-content">
          <div className="container">
            <div className="blog-detail-meta">
              <span className="blog-detail-date">{selectedBlog.date}</span>
              <span className="blog-detail-author">By {selectedBlog.author}</span>
              <span className="blog-detail-read-time">{selectedBlog.readTime}</span>
              <span className="blog-detail-kind">{selectedBlog.postkind}</span>
            </div>
            
            <h1 className="blog-detail-title">{selectedBlog.title}</h1>
            
            <div className="blog-detail-image-container">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title}
                className="blog-detail-image"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop";
                }}
              />
            </div>
            
            <div 
              className="blog-detail-text"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
            
            <div className="blog-detail-footer">
              <div className="blog-tags">
                <span className="tag">Business</span>
                <span className="tag">Technology</span>
                <span className="tag">Innovation</span>
                <span className="tag">{selectedBlog.postkind}</span>
              </div>
              
              <div className="blog-share">
                <span>Share:</span>
                <div className="share-buttons">
                  <button className="share-btn facebook">f</button>
                  <button className="share-btn twitter">t</button>
                  <button className="share-btn linkedin">in</button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <style jsx>{`
          .blog-detail-container {
            font-family: "Inter", sans-serif;
            color: #333;
            line-height: 1.7;
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .blog-detail-header {
            background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%);
            padding: 30px 0;
          }

          .back-button {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            margin-left: 2rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }

          .back-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }

          .blog-detail-content {
            max-width: 800px;
            margin: -20px auto 0;
            background: white;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
          }

          .container {
            padding: 60px 40px 40px;
          }

          .blog-detail-meta {
            display: flex;
            gap: 20px;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            flex-wrap: wrap;
          }

          .blog-detail-date,
          .blog-detail-author,
          .blog-detail-read-time,
          .blog-detail-kind {
            font-size: 14px;
            color: #666;
          }

          .blog-detail-author {
            font-weight: 600;
          }

          .blog-detail-kind {
            background: #4a00e0;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: capitalize;
          }

          .blog-detail-title {
            font-size: 2.5em;
            font-weight: 700;
            color: #4a00e0;
            margin-bottom: 30px;
            line-height: 1.2;
          }

          .blog-detail-image-container {
            margin-bottom: 40px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .blog-detail-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
          }

          .blog-detail-text {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 40px;
          }

          .blog-detail-text h2 {
            color: #4a00e0;
            font-size: 1.5em;
            margin: 30px 0 15px;
            font-weight: 600;
          }

          .blog-detail-text p {
            margin-bottom: 20px;
            color: #444;
          }

          .blog-detail-text ul {
            margin: 20px 0;
            padding-left: 30px;
          }

          .blog-detail-text li {
            margin-bottom: 8px;
            color: #555;
          }

          .blog-detail-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 30px;
            border-top: 1px solid #eee;
            margin-top: 40px;
          }

          .blog-tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .tag {
            background: #f0f0f0;
            color: #4a00e0;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }

          .blog-share {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #666;
            font-weight: 500;
          }

          .share-buttons {
            display: flex;
            gap: 10px;
          }

          .share-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .share-btn:hover {
            transform: scale(1.1);
          }

          .facebook { background: #1877f2; }
          .twitter { background: #1da1f2; }
          .linkedin { background: #0077b5; }

          @media (max-width: 768px) {
            .container {
              padding: 40px 20px;
            }

            .blog-detail-title {
              font-size: 2em;
            }

            .blog-detail-text {
              font-size: 16px;
            }

            .blog-detail-footer {
              flex-direction: column;
              gap: 20px;
              align-items: flex-start;
            }

            .blog-detail-meta {
              gap: 10px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="blog-page-container">
      <Header />
      
      {/* Blog Hero Section - Clean Design */}
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <h1>Blog</h1>
          <p>Insights, trends, and stories from the world of business and technology</p>
        </div>
      </section>

      {/* Latest Post Section */}
      {latestPosts.length > 0 && (
        <section className="latest-post-section">
          <div className="container">
            <div className="section-header-stacked">
              <p className="section-path">\ Our Blog \</p>
              <h2 className="latest-post-title">Latest Post</h2>
            </div>
            <div className="latest-post-grid">
              <div className="main-featured-post-card" onClick={() => handlePostClick(latestPosts[0])}>
                <img
                  src={latestPosts[0].image}
                  alt={latestPosts[0].title}
                  className="post-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop";
                  }}
                />
                <div className="post-info">
                  <span className="post-date">{latestPosts[0].date}</span>
                  <h3 className="post-title">{latestPosts[0].title}</h3>
                  <div className="post-meta-bottom">
                    <span className="post-read-time">{latestPosts[0].readTime}</span>
                    <div className="read-more">Read More</div>
                  </div>
                </div>
              </div>
              {latestPosts.length > 1 && (
                <div className="side-recent-posts">
                  {latestPosts.slice(1).map((post) => (
                    <div key={post.id} className="small-post-card" onClick={() => handlePostClick(post)}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="small-post-image"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=100&fit=crop";
                        }}
                      />
                      <div className="small-post-info">
                        <span className="small-post-date">{post.date}</span>
                        <h4 className="small-post-title">{post.title}</h4>
                        <div className="small-post-meta-bottom">
                          <span className="small-post-read-time">{post.readTime}</span>
                          <div className="small-read-more">Read More</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      {regularPosts.length > 0 && (
        <section className="all-posts-section">
          <div className="container">
            <div className="section-header-stacked">
              <p className="section-path">\ Our Blog \</p>
              <h2>More Articles</h2>
            </div>
            <div className="regular-posts-grid">
              {regularPosts.map((post) => (
                <div key={post.id} className="regular-post-card" onClick={() => handlePostClick(post)}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="post-image"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop";
                    }}
                  />
                  <div className="post-info">
                    <span className="post-date">{post.date}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-meta-bottom">
                      <span className="post-read-time">{post.readTime}</span>
                      <div className="read-more">Read More</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Posts Message */}
      {latestPosts.length === 0 && regularPosts.length === 0 && !loading && (
        <section className="no-posts-section">
          <div className="container">
            <div className="no-posts-message">
              <h2>No blog posts available</h2>
              <p>Check back later for new content!</p>
            </div>
          </div>
        </section>
      )}

      <Footer/>

      <style jsx>{`
        .blog-page-container {
          font-family: "Inter", sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .no-posts-section {
          padding: 80px 0;
          text-align: center;
        }

        .no-posts-message {
          background: white;
          padding: 60px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
        }

        .no-posts-message h2 {
          color: #4a00e0;
          margin-bottom: 15px;
        }

        .no-posts-message p {
          color: #666;
        }

        /* Blog Hero Section - Clean and Simple */
        .blog-hero-section {
          background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%);
          color: white;
          padding: 100px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-radius: 0 0 100px 100px;
        }

        .blog-hero-content h1 {
          font-size: 3.5em;
          margin-bottom: 20px;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .blog-hero-content p {
          font-size: 1.2em;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Section Header */
        .section-header-stacked {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 50px;
          margin-top: 80px;
        }

        .section-header-stacked .section-path {
          color: #4a00e0;
          font-size: 0.9em;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .section-header-stacked h2 {
          font-size: 2.5em;
          color: #333;
          font-weight: 700;
          margin: 0;
        }

        /* Latest Post Section */
        .latest-post-section {
          padding: 40px 0 80px;
          background-color: #f8f9fa;
        }

        .latest-post-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .main-featured-post-card {
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .main-featured-post-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .main-featured-post-card .post-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .main-featured-post-card .post-info {
          padding: 30px;
        }

        .main-featured-post-card .post-date {
          font-size: 0.9em;
          color: #888;
          margin-bottom: 10px;
          display: block;
          font-weight: 500;
        }

        .main-featured-post-card .post-title {
          font-size: 1.8em;
          color: #4a00e0;
          margin-bottom: 20px;
          line-height: 1.3;
          font-weight: 700;
        }

        .post-meta-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .post-read-time {
          font-size: 0.9em;
          color: #666;
          font-weight: 500;
        }

        .read-more {
          color: #4a00e0;
          font-weight: 600;
          position: relative;
          padding-right: 25px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .read-more::after {
          content: "→";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2em;
          color: #33ff94;
          transition: transform 0.3s ease;
        }

        .read-more:hover::after {
          transform: translateY(-50%) translateX(5px);
        }

        .side-recent-posts {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .small-post-card {
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .small-post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .small-post-card .small-post-image {
          width: 120px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .small-post-info {
          flex: 1;
        }

        .small-post-date {
          font-size: 0.8em;
          color: #888;
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .small-post-title {
          font-size: 1.1em;
          color: #4a00e0;
          line-height: 1.3;
          margin: 0 0 10px 0;
          font-weight: 600;
        }

        .small-post-meta-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .small-post-read-time {
          font-size: 0.8em;
          color: #666;
          font-weight: 500;
        }

        .small-read-more {
          color: #4a00e0;
          font-weight: 600;
          font-size: 0.9em;
          position: relative;
          padding-right: 20px;
          cursor: pointer;
        }

        .small-read-more::after {
          content: "→";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #33ff94;
        }

        /* All Posts Section */
        .all-posts-section {
          padding: 80px 0;
          background-color: #f8f9fa;
        }

        .regular-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .regular-post-card {
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .regular-post-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        .regular-post-card .post-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .regular-post-card .post-info {
          padding: 25px;
        }

        .regular-post-card .post-date {
          font-size: 0.9em;
          color: #888;
          margin-bottom: 10px;
          display: block;
          font-weight: 500;
        }

        .regular-post-card .post-title {
          font-size: 1.4em;
          color: #4a00e0;
          line-height: 1.3;
          margin-bottom: 15px;
          font-weight: 600;
        }

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .latest-post-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .side-recent-posts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .blog-hero-content h1 {
            font-size: 2.5em;
          }

          .blog-hero-content p {
            font-size: 1.1em;
          }

          .section-header-stacked h2 {
            font-size: 2em;
          }

          .regular-posts-grid {
            grid-template-columns: 1fr;
          }

          .main-featured-post-card .post-title {
            font-size: 1.5em;
          }
        }

        @media (max-width: 480px) {
          .blog-hero-section {
            padding: 80px 20px 60px;
          }

          .small-post-card {
            flex-direction: column;
            text-align: center;
            padding: 15px;
          }

          .small-post-card .small-post-image {
            width: 100%;
            height: 120px;
            margin-bottom: 15px;
          }

          .main-featured-post-card .post-info {
            padding: 20px;
          }

          .regular-post-card .post-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}