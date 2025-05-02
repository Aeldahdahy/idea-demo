import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import BlogSeparator from './BlogSeparator';
import { Link } from 'react-router-dom';
import { useFunctions } from '../../useFunctions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

function Blog() {
  const { getAllBlogs, blogs, getAllReviews, reviews, setReviews, API_BASE_URL } = useFunctions();
  const [mainBlog, setMainBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isKeywordsOpen, setIsKeywordsOpen] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [clientReview, setClientReview] = useState('');
  const [reviewRate, setReviewRate] = useState(0);

  // Categories and keywords
  const categories = [
    { name: 'Project' },
    { name: 'Event' },
    { name: 'Investment' },
    { name: 'Partnership' },
    { name: 'Entrepreneurship' },
  ];
  const keywords = ['Project', 'Event', 'Investment', 'Partnerships', 'Entrepreneurship'];

  useEffect(() => {
    getAllBlogs();
    getAllReviews();
  }, [getAllBlogs, getAllReviews]);

  useEffect(() => {
    if (blogs.length > 0 && !mainBlog) {
      setMainBlog(blogs[0]);
    }
  }, [blogs, mainBlog]);

  const handleViewBlog = (blog) => {
    setMainBlog(blog);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedKeywords([]);
  };

  const openReviewModal = (review) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error('You must be logged in to submit a review.');
      return;
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.user?.id;
      if (!userId) {
        toast.error('User ID not found in token.');
        return;
      }
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
      if (!isValidObjectId) {
        toast.error('Invalid User ID format.');
        return;
      }
      console.log('Decoded userId:', userId);
      setCurrentReviewId(userId);
      setClientReview('');
      setReviewRate(0);
      setIsReviewModalOpen(true);
    } catch (err) {
      console.error('Error decoding token:', err);
      toast.error('Failed to decode token. Please log in again.');
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setCurrentReviewId(null);
    setClientReview('');
    setReviewRate(0);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      toast.error('You must be logged in to submit a review.');
      return;
    }

    if (!currentReviewId) {
      toast.error('User ID is missing.');
      return;
    }

    if (!clientReview || !reviewRate) {
      toast.error('Please provide a review and rating.');
      return;
    }

    console.log('Submitting review for userId:', currentReviewId);
    console.log('API URL:', `${API_BASE_URL}/api/review/${currentReviewId}`);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/review/${currentReviewId}`,
        {
          client_review: clientReview,
          review_rate: reviewRate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        // Option 1: Use setReviews (preferred if working)
        if (typeof setReviews === 'function') {
          setReviews((prevReviews) => [...prevReviews, response.data.review]);
        } else {
          console.error('setReviews is not a function:', setReviews);
          // Option 2: Fallback to refetching reviews
          await getAllReviews();
        }
        toast.success('Review submitted successfully!');
        closeReviewModal();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      const errorMessage =
        err.response?.data?.error || 'Failed to submit review. Please try again.';
      toast.error(errorMessage);
    }
  };


  const filteredBlogs = blogs.filter((blog) => {
    // Case-insensitive filtering by blog_title
    const titleLower = blog.blog_title.toLowerCase();
    const matchesSearch = searchQuery ? titleLower.includes(searchQuery.toLowerCase()) : true;
    const matchesCategory = selectedCategory ? titleLower.includes(selectedCategory.toLowerCase()) : true;
    const matchesKeywords = selectedKeywords.length
      ? selectedKeywords.every((keyword) => titleLower.includes(keyword.toLowerCase()))
      : true;
    return matchesSearch && matchesCategory && matchesKeywords;
  });

  const featuredBlogs = filteredBlogs.filter((blog) => blog !== mainBlog);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1">
          {/* Main Blog */}
          <section className="mb-12">
            {mainBlog && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={`${API_BASE_URL}/${mainBlog.blog_image}`}
                      alt=""
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                      {mainBlog.blog_title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{mainBlog.blog_description}</p>
                    <Link
                      to="#"
                      className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                    >
                    </Link>
                  </div>
                </div>
                <BlogSeparator />
              </div>
            )}
          </section>

          {/* Featured Blogs */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.length === 0 ? (
                <p className="text-gray-600 col-span-full text-center">No articles match your filters.</p>
              ) : (
                featuredBlogs.map((blog, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {blog.blog_image && (
                      <img
                        src={`${API_BASE_URL}/${blog.blog_image}`}
                        alt=""
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {blog.blog_title}
                      </h4>
                      <p className="text-gray-600 line-clamp-3">{blog.blog_description}</p>
                      <button
                        onClick={() => handleViewBlog(blog)}
                        className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:underline focus:outline-none"
                      >
                        Read More
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
            <BlogSeparator />
          </section>

          {/* Reviews Section */}
          <section className="py-12">
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Reviews
              </h2>
              <div className="space-y-8">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-600">No reviews available.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white rounded-xl shadow-md p-6 grid grid-cols-12 gap-6 transform transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="col-span-12 lg:col-span-10">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <img
                            src={
                              review.client_image
                                ? `${API_BASE_URL}/uploads/user_images/${review.client_image}`
                                : 'https://pagedone.io/asset/uploads/1704364459.png'
                            }
                            alt=""
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900 mb-2">
                              {review.client_name}
                            </p>
                            <div className="flex lg:hidden items-center gap-2 mb-4">
                              {[...Array(review.review_rate || 5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 text-yellow-400"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 2.3l2.8 7.4h7.4l-6 4.8 2.3 7.4-6.5-4.9-6.5 4.9 2.3-7.4-6-4.8h7.4z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {review.client_review}
                            </p>
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => openReviewModal(review._id)}
                                className="flex items-center gap-2 text-blue-600 font-semibold hover:underline focus:outline-none"
                              >
                                Add Review
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                  ></path>
                                </svg>
                              </button>
                              <p className="lg:hidden text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 lg:col-span-2 max-lg:hidden flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.review_rate || 5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-yellow-400"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2.3l2.8 7.4h7.4l-6 4.8 2.3 7.4-6.5-4.9-6.5 4.9 2.3-7.4-6-4.8h7.4z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-500 text-center">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

        </main>

        {/* Filter Bar */}
        <aside className="w-full lg:w-80 lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Filter Articles</h3>
              {(searchQuery || selectedCategory || selectedKeywords.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  Clear Filters
                </button>
              )}
            </div>
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={clearFilters}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Categories
                {isCategoriesOpen ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </button>
              {isCategoriesOpen && (
                <ul className="mt-3 space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Keywords */}
            <div>
              <button
                onClick={() => setIsKeywordsOpen(!isKeywordsOpen)}
                className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Keywords
                {isKeywordsOpen ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </button>
              {isKeywordsOpen && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordToggle(keyword)}
                      className={`px-3 py-1 rounded-full transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? 'bg-blue-100 text-blue-600 font-semibold'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Review Reply Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Reply to Review</h3>
              <button
                onClick={closeReviewModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitReply}>
              <div className="mb-6">
                <label htmlFor="clientReview" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  id="clientReview"
                  value={clientReview}
                  onChange={(e) => setClientReview(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Write your reply here..."
                  required
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRate(star)}
                      className={`focus:outline-none ${
                        star <= reviewRate ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors duration-200`}
                    >
                      <FaStar className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-200"
                >
                  Submit Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;