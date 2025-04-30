import React, {useState} from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaSearch } from 'react-icons/fa';
import BlogSeparator from './BlogSeparator';
import { Link } from 'react-router-dom';
import image1 from "../../assets/img-0.42.png";
import image2 from "../../assets/img-0.43.png";
// import image3 from "../../assets/img-0.44.png";

// const posts = [
//   {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//     author: {
//       name: 'Michael Foster',
//       role: 'Co-Founder / CTO',
//       href: '#',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   },
//   // More posts...
// ]


// Dummy data simulating backend response
const dummyData = {
  averageRating: 4.65,
  totalReviews: 645,
  ratingDistribution: [
    { stars: 5, count: 239, percentage: 20 },
    { stars: 4, count: 432, percentage: 60 },
    { stars: 3, count: 53, percentage: 15 },
    { stars: 2, count: 32, percentage: 5 },
    { stars: 1, count: 13, percentage: 0 },
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      author: 'Micheal Gough',
      date: '2023-11-18T15:35:00Z',
      text: 'My old IMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I’m very happy with this purchase.',
      verified: true,
      helpful: { yes: 3, no: 0 },
    },
    {
      id: 2,
      rating: 5,
      author: 'Jese Leos',
      date: '2023-11-18T15:35:00Z',
      text: 'It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this computer. Highly recommend!',
      verified: true,
      helpful: { yes: 1, no: 0 },
      images: [
        'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-1.jpg',
        'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-2.jpg',
      ],
    },
    {
      id: 3,
      rating: 5,
      author: 'Bonnie Green',
      date: '2023-11-18T15:35:00Z',
      text: 'My old IMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I’m very happy with this purchase.',
      verified: false, // No verified status
      helpful: null, // No helpful data
    },
    {
      id: 4,
      rating: 5,
      author: 'Roberta Casas',
      date: '2023-11-18T15:35:00Z',
      text: 'I have used earlier Mac computers in my university work for a number of years and found them easy to use. The iMac 2021 is no exception. It works straight out of the box giving superb definition from the HD screen.',
      verified: true,
      helpful: { yes: 1, no: 0 },
    },
    {
      id: 5,
      rating: 5,
      author: 'Neil Sims',
      date: '2023-11-18T15:35:00Z',
      text: 'I replaced my 11 year old iMac with the new M1 Apple. I wanted to remain with Apple as my old one is still working perfectly and all Apple products are so reliable. Setting up was simple and fast and transferring everything from my previous iMac worked perfectly.',
      verified: true,
      helpful: { yes: 1, no: 0 },
    },
  ],
  productName: 'Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD',
};

function Example(){
  const [showModal, setShowModal] = useState(false);

  const renderStars = (count, filled = true, size = 'h-4 w-4') => {
    return Array.from({ length: count }, (_, index) => (
      <svg
        key={index}
        className={`${size} ${filled ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reviews</h2>
            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">{renderStars(5)}</div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({dummyData.averageRating.toFixed(1)})
              </p>
              <Link
                to=""
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {dummyData.totalReviews} Reviews
              </Link>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {dummyData.averageRating.toFixed(2)} out of 5
              </p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Write a review
              </button>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {dummyData.ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    {dist.stars}
                  </p>
                  {renderStars(1)}
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{ width: `${dist.percentage}%` }}
                    ></div>
                  </div>
                  <Link
                    to=""
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                  >
                    {dist.count} <span className="hidden sm:inline">reviews</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {dummyData.reviews.map((review) => (
              <div key={review.id} className="gap-3 py-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="flex items-center gap-0.5 min-h-[1rem]">
                    {review.rating && renderStars(review.rating)}
                  </div>
                  <div className="space-y-0.5 min-h-[2.5rem]">
                    {review.author && (
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {review.author}
                      </p>
                    )}
                    {review.date && (
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatDate(review.date)}
                      </p>
                    )}
                  </div>
                  {review.verified && (
                    <div className="inline-flex items-center gap-1 min-h-[1.5rem]">
                      <svg
                        className="h-5 w-5 text-primary-700 dark:text-primary-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Verified purchase
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  {review.text && (
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400 min-h-[2rem]">
                      {review.text}
                    </p>
                  )}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 min-h-[8rem]">
                      {review.images.map((src, index) => (
                        <img
                          key={index}
                          className="h-32 w-20 rounded-lg object-cover"
                          src={src}
                          alt={`Review image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  {review.helpful && (
                    <div className="flex items-center gap-4 min-h-[1.5rem]">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Was it helpful to you?
                      </p>
                      <div className="flex items-center">
                        <input
                          id={`reviews-radio-${review.id}-yes`}
                          type="radio"
                          value=""
                          name={`reviews-radio-${review.id}`}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                        <label
                          htmlFor={`reviews-radio-${review.id}-yes`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Yes: {review.helpful.yes}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id={`reviews-radio-${review.id}-no`}
                          type="radio"
                          value=""
                          name={`reviews-radio-${review.id}`}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                        <label
                          htmlFor={`reviews-radio-${review.id}-no`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          No: {review.helpful.no}
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              View more reviews
            </button>
          </div>
        </div>
      </section>

      <div
        id="review-modal"
        tabIndex="-1"
        aria-hidden={!showModal}
        className={`fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased ${
          showModal ? 'flex' : 'hidden'
        }`}
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  Add a review for:
                </h3>
                {dummyData.productName && (
                  <Link
                    to=""
                    className="font-medium text-primary-700 hover:underline dark:text-primary-500"
                  >
                    {dummyData.productName}
                  </Link>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center min-h-[1.5rem]">
                    {renderStars(3, true, 'h-6 w-6')}
                    {renderStars(2, false, 'h-6 w-6')}
                    <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">
                      3.0 out of 5
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review description
                  </label>
                  <textarea
                    id="description"
                    rows="6"
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    required
                  ></textarea>
                  <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
                    Problems with the product or delivery?{' '}
                    <Link
                      to=""
                      className="text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Send a report
                    </Link>
                    .
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Add real photos of the product to help other customers{' '}
                    <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
                  </p>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      id="review-checkbox"
                      type="checkbox"
                      value=""
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                    <label
                      htmlFor="review-checkbox"
                      className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      By publishing this review you agree with the{' '}
                      <Link
                        to=""
                        className="text-primary-600 hover:underline dark:text-primary-500"
                      >
                        terms and conditions
                      </Link>
                      .
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                <button
                  type="submit"
                  className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add review
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};





function Blog() {
  return (
    <div className="idea-website">
      <main className="main-content">
        <div className="container">
          <section className="latest-event">
            <h1 className="section-title">Our Latest Event</h1>
            <div className="event-container">
              <div className="event-description">
                <div className="event-image">
                  <img src={image1} alt="Smart logistics system demonstration" />
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

          <BlogSeparator />

          <section className="featured-articles">
            <article className="article">
              <h3 className="article-title">Grow wealth like a tree, roots in savings, branches reaching toward diverse investments.</h3>
              <div className="article-content">
                <img src={image2} alt="Investment growth illustration" className="article-image" />
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

          <BlogSeparator />


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

          <Example />
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