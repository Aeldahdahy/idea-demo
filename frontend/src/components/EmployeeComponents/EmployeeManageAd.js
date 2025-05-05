import React, { useState } from "react";
import { Eye } from "lucide-react";

function EmployeeManageAd() {
  const initialData = [
    { id: '1#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'remove' },
    { id: '2#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'Display' },
    { id: '3#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'Remove' },
  ];

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [eventTitle, setEventTitle] = useState('Redbull');
  const [eventSubtitle, setEventSubtitle] = useState('Redbull');
  const [websiteLink, setWebsiteLink] = useState('https://www.Redbull.com');

  const handleToggle = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: item.status === 'remove' ? 'Display' : 'remove' } : item
      )
    );
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.image.toLowerCase().includes(search.toLowerCase()) ||
      item.website.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddEvent = () => {
    alert('Add event functionality would be implemented here.');
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-6">
        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="event-title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="event-subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                Event Subtitle
              </label>
              <input
                type="text"
                id="event-subtitle"
                value={eventSubtitle}
                onChange={(e) => setEventSubtitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="event-logo" className="block text-sm font-medium text-gray-700 mb-1">
                Event Logo
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
                <input type="file" id="event-logo" className="hidden" accept="image/*" />
              </div>
            </div>
            <div>
              <label htmlFor="event-image" className="block text-sm font-medium text-gray-700 mb-1">
                Event Image/Video
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
                <input type="file" id="event-image" className="hidden" accept="image/*,video/*" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="website-link" className="block text-sm font-medium text-gray-700 mb-1">
                Website Link
              </label>
              <input
                type="text"
                id="website-link"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div className="sm:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={handleAddEvent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Subtitle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Image/Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website Link</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subtitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.image}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.website}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => handleToggle(item.id)}
                      role="switch"
                      aria-checked={item.status === 'Display'}
                    >
                      <div
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                          item.status === 'Display' ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                            item.status === 'Display' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManageAd;