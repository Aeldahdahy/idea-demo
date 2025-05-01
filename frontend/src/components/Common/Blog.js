import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaSearch } from 'react-icons/fa';
import BlogSeparator from './BlogSeparator';
import { Link } from 'react-router-dom';
// import Example from './Example';
import { useFunctions } from '../../useFunctions';

function Blog() {
  const { getAllBlogs, blogs, loading, error, API_BASE_URL } = useFunctions();

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const latestBlog = blogs[0];
  const featuredBlogs = blogs.slice(1);

  return (
    <div className="idea-website">
      <main className="main-content">
        <div className="container">
          <section className="latest-event">
            {latestBlog && (
            <>
              <h3 className="article-title">{latestBlog.blog_title}</h3>
              <div className="event-container">
                <div className="event-description">
                  <div className="event-image">
                    <img src={`${API_BASE_URL }/${latestBlog.blog_image}`} alt={latestBlog.blog_title} />
                  </div>
                  <p>{latestBlog.blog_description}</p>
                </div>
              </div>
              <BlogSeparator />
            </>
            )}
          </section>


          <section className="featured-articles">
            {featuredBlogs.map((blog, index) => (
              <article key={index} className="article">
                <h3 className="article-title">{blog.blog_title}</h3>
                <div className="article-content">
                  {blog.blog_image && (
                    <img src={`${API_BASE_URL }/${blog.blog_image}`} alt={blog.blog_title} className="article-image" />
                  )}
                  <p>{blog.blog_description}</p>
                </div>
                <BlogSeparator />
              </article>
            ))}
          </section>


          <section className="social-share">
            <p>Share:</p>
            <div className="share-buttons">
              <button><FaFacebook /></button>
              <button><FaTwitter /></button>
              <button><FaLinkedin /></button>
            </div>
          </section>

          <section className="tags">
            <p>Tag: <Link to="#" className="tag-link">Finance</Link>, <Link to="#" className="tag-link">Career</Link>, <Link to="#" className="tag-link">Banking</Link></p>
          </section>

          {/* <Example /> */}
        </div>
      </main>

      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="search-widget">
            <input type="text" placeholder="Search..." />
            <button><FaSearch /></button>
          </div>

          <div className="category-widget">
            <h3>Category</h3>
            <ul>
              <li><Link to="#">projects (3)</Link></li>
              <li><Link to="#">Events (4)</Link></li>
              <li><Link to="#">Investments (8)</Link></li>
              <li><Link to="#">Partnerships (5)</Link></li>
              <li><Link to="#">Entrepreneurship (7)</Link></li>
            </ul>
          </div>

          <div className="keywords-widget">
            <h3>Keywords</h3>
            <div className="keyword-tags">
              <Link to="#" className="keyword-tag">projects</Link>
              <Link to="#" className="keyword-tag">events</Link>
              <Link to="#" className="keyword-tag">investment</Link>
              <Link to="#" className="keyword-tag keyword-tag-blue">partnerships</Link>
              <Link to="#" className="keyword-tag">entrepreneurship</Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Blog;