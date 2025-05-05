import React, { useState } from 'react';

const EmployeeMobileWebContent = () => {
  const [whoAreWe, setWhoAreWe] = useState('');
  const [investor, setInvestor] = useState('');
  const [entrepreneur, setEntrepreneur] = useState('');
  const [investorSlide, setInvestorSlide] = useState('');
  const [entrepreneurSlide, setEntrepreneurSlide] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      whoAreWe,
      investor,
      entrepreneur,
      investorSlide,
      entrepreneurSlide,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Who Are We Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Who Are We</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="who-are-we" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="who-are-we"
                value={whoAreWe}
                onChange={(e) => setWhoAreWe(e.target.value)}
                placeholder="INVESTMENT"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="who-are-we-upload" className="block text-sm font-medium text-gray-700 mb-1">
                Image/Video
              </label>
              <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 text-center">
                <svg
                  className="mx-auto h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V12m0 0V8m0 4h4m4 0h4m-4 0v4m0-4V8m5 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">Drag & Drop or choose image to upload</p>
                <p className="text-xs text-gray-500">Select jpg, jpeg, png, or gif</p>
                <input
                  type="file"
                  id="who-are-we-upload"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>

          {/* Investor Subsection */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Investor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="investor" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="investor"
                  value={investor}
                  onChange={(e) => setInvestor(e.target.value)}
                  placeholder="CREATE YOUR ACCOUNT"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="investor-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Image/Video
                </label>
                <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V12m0 0V8m0 4h4m4 0h4m-4 0v4m0-4V8m5 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Drag & Drop or choose image to upload</p>
                  <p className="text-xs text-gray-500">Select jpg, jpeg, png, or gif</p>
                  <input
                    type="file"
                    id="investor-upload"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="investor-slide" className="block text-sm font-medium text-gray-700 mb-1">
                Select Slide
              </label>
              <select
                id="investor-slide"
                value={investorSlide}
                onChange={(e) => setInvestorSlide(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select Slide</option>
                <option value="slide1">Slide 1</option>
                <option value="slide2">Slide 2</option>
                <option value="slide3">Slide 3</option>
              </select>
            </div>
          </div>

          {/* Entrepreneur Subsection */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Entrepreneur</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="entrepreneur" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="entrepreneur"
                  value={entrepreneur}
                  onChange={(e) => setEntrepreneur(e.target.value)}
                  placeholder="REDBULL"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="entrepreneur-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Image/Video
                </label>
                <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V12m0 0V8m0 4h4m4 0h4m-4 0v4m0-4V8m5 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Drag & Drop or choose image to upload</p>
                  <p className="text-xs text-gray-500">Select jpg, jpeg, png, or gif</p>
                  <input
                    type="file"
                    id="entrepreneur-upload"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="entrepreneur-slide" className="block text-sm font-medium text-gray-700 mb-1">
                Select Slide
              </label>
              <select
                id="entrepreneur-slide"
                value={entrepreneurSlide}
                onChange={(e) => setEntrepreneurSlide(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select Slide</option>
                <option value="slide1">Slide 1</option>
                <option value="slide2">Slide 2</option>
                <option value="slide3">Slide 3</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeMobileWebContent;