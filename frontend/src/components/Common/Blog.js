import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaSearch } from 'react-icons/fa';
import image1 from "../../assets/img-0.42.png";
import image2 from "../../assets/img-0.43.png";
import image3 from "../../assets/img-0.44.png";
function Blog() {
  return (
    <div className="idea-website">
      <main className="main-content">
        <div className="container">
          <section className="latest-event">
            <h2 className="section-title">Our Latest Event</h2>
            <div className="event-container">
              <div className="event-description">
                <div className="event-image">
                  <img src={image1} alt="Latest Event" />
                </div>
                <p>
                  Our latest business project focuses on integrating advanced technology to revolutionize the supply chain process. We’ve introduced a new smart logistics system that optimizes container management, improves cargo tracking, and streamlines warehouse operations. This initiative aims to reduce turnaround times, enhance shipment visibility, and boost cost efficiency across the logistics chain.
                </p>
                <p>
                  The event to unveil the project was attended by government officials, industry leaders, and our dedicated team, showcasing a live demonstration of the new system in action. This innovation aligns with our commitment to driving progress and sustainability in the maritime and logistics sectors.
                </p>
              </div>
            </div>
          </section>

          <section className="featured-articles">
            <article className="article">
              <h3 className="article-title">Grow wealth like a tree, roots in savings, branches reaching toward diverse investments.</h3>
              <div className="article-content">
                <img src={image2} alt="Investment Growth" className="article-image" />
              </div>
            </article>

            <article className="article">
              <h3 className="article-title">The art of Mentorship</h3>
              <div className="article-content">
                <p>
                  Providing mentorship is an important part of a strategic service that supports young professionals as they build their careers. Entrepreneurs often face challenges in areas such as strategic planning, operational execution, and managing innovative solutions. Through structured mentorship programs, personalized consultations, and targeted workshops, you can share expertise, facilitate critical discussions, and support entrepreneurship development while enhancing leadership skills.
                </p>
                <p>
                  This approach not only fosters the success of emerging business leaders but also strengthens your organization’s position as a trusted advisor. By offering mentorship, you empower entrepreneurs to innovate, access a diverse network of industry talent, and contribute to the national community and economic impact of innovative talent, all while building a lasting legacy of growth and development.
                </p>
              </div>
            </article>
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
            <p>Tag: <a href="#" className="tag-link">Finance</a>, <a href="#" className="tag-link">Career</a>, <a href="#" className="tag-link">Banking</a></p>
          </section>

          <section className="comments-section">
            <h3>Comments</h3>
            <div className="comments-list">
              <div className="comment">
                <div className="comment-avatar">
                  <img src={image3} alt="User" />
                </div>
                <div className="comment-content">
                  <h4>Bob</h4>
                  <p>Start to finish a critical document written well and it supports mentorship programs that benefit the community. I enjoyed this read!</p>
                  <span className="comment-date">June 20, 2024</span>
                  <button className="reply-btn">Reply</button>
                </div>
              </div>

              <div className="comment">
                <div className="comment-avatar">
                  <img src={image3} alt="User" />
                </div>
                <div className="comment-content">
                  <h4>Lanna</h4>
                  <p>Tempus ipsum nulla mus condimentum pretium sed eget arcu elit. Ut amet eu porta risus, scelerisque aliquam nisl.</p>
                  <span className="comment-date">June 20, 2024</span>
                  <button className="reply-btn">Reply</button>
                </div>
              </div>
            </div>
          </section>
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
              <li><a href="#">projects (3)</a></li>
              <li><a href="#">Events (4)</a></li>
              <li><a href="#">Investments (8)</a></li>
              <li><a href="#">Partnerships (5)</a></li>
              <li><a href="#">Entrepreneurship (7)</a></li>
            </ul>
          </div>

          <div className="keywords-widget">
            <h3>Keywords</h3>
            <div className="keyword-tags">
              <a href="#" className="keyword-tag">projects</a>
              <a href="#" className="keyword-tag">events</a>
              <a href="#" className="keyword-tag">investment</a>
              <a href="#" className="keyword-tag keyword-tag-blue">partnerships</a>
              <a href="#" className="keyword-tag">entrepreneurship</a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Blog;