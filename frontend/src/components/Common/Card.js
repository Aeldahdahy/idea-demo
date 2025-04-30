import React from 'react';

function Card() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Ribbon */}
      <div className="absolute top-0 right-0 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
        GLOBAL PRO
      </div>

      {/* Header Image and Logo */}
      <div className="relative">
        <div className="h-24 bg-gray-200 flex items-center justify-start p-4">
          <div className="text-2xl font-bold text-gray-800">lewa.</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <h2 className="text-xl font-bold text-gray-800">Lewa Studios</h2>
        <p className="text-sm text-blue-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
          </svg>
          W. Midlands, United Kingdom
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">
          Lewa Studios isn’t just a beauty studio, it’s a cultural hub. We deliver premium hair, nail, and aesthetic services while building a thriving, creative community. With each sector aiming for £1.5M turnover, Lewa is redefining beauty spaces.
        </p>

        {/* Bullet Points */}
        <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
          <li>Collaborated with Garnier – the largest cosmetic brand in the world</li>
          <li>Located in the heart of Birmingham (jewellery quarter)</li>
          <li>The salon boasts an expansive, newly renovated space designed top taste</li>
        </ul>

        {/* Investment Info */}
        <div className="flex justify-between mt-4 text-gray-800">
          <div>
            <p className="text-lg font-bold">$325,000</p>
            <p className="text-xs text-gray-500">Total Required</p>
          </div>
          <div>
            <p className="text-lg font-bold">$65,000</p>
            <p className="text-xs text-gray-500">Min per Investor</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-4 bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
          FIND OUT MORE
        </button>
      </div>
    </div>
  );
}

export default Card;