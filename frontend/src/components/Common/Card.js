import React from 'react';
import { useFunctions } from '../../useFunctions.js'; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import { encryptId } from "../../Security/encryptionUtils";


function Card({ project, errorFetching }) {
  const { API_BASE_URL } = useFunctions();
  // Determine if we should show the loading state
  const isLoading = !project || errorFetching === 'error' || project.isPlaceholder;

  // Skeleton loading component for placeholders
  const Skeleton = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
  );

    // Encrypt the project ID for the URL
    let encryptedProjectId;
    try {
      encryptedProjectId = encryptId(project._id);
    } catch (error) {
      console.error('Failed to encrypt project ID:', error);
      return (
        <Card
          className="shadow-sm overflow-hidden"
          style={{ backgroundColor: "#e6ebf5", maxWidth: "28rem", margin: "0 auto", borderRadius: "0.75rem" }}
        >
          <Card.Body className="p-4">
            <p style={{ color: 'red', textAlign: 'center' }}>
              Error: Unable to load project link due to encryption failure.
            </p>
          </Card.Body>
        </Card>
      );
    }

  if (isLoading) {
    return (
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
        {/* Ribbon Placeholder */}
        <div className="absolute top-0 right-0 bg-gray-200 text-gray-200 text-xs font-bold px-2 py-1 rounded-bl-lg">
          LOADING
        </div>

        {/* Header Placeholder */}
        <div className="relative h-48 w-full">
          <Skeleton className="w-full h-full" />
          {/* Logo Placeholder */}
          <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-md ml-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          {/* Title and Location Placeholder */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Description Placeholder */}
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-1" />

          {/* Bullet Points Placeholder */}
          <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
            <li><Skeleton className="h-4 w-3/4 inline-block" /></li>
            <li><Skeleton className="h-4 w-2/3 inline-block" /></li>
            <li><Skeleton className="h-4 w-4/5 inline-block" /></li>
          </ul>

          {/* Investment Info Placeholder */}
          <div className="flex justify-between mt-4">
            <div>
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-12 mt-1" />
            </div>
            <div>
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-12 mt-1" />
            </div>
          </div>

          {/* Button Placeholder */}
          <Skeleton className="w-full h-10 mt-4 rounded-lg" />
        </div>
      </div>
    );
  }

  // Get the first image from project_images array
  const primaryImage = project.project_images && Array.isArray(project.project_images) && project.project_images.length > 0
    ? `${API_BASE_URL}/${project.project_images[0]}`
    : null;

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
      {/* Ribbon */}
      <div className="absolute top-0 right-0 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
        {project.project_stage || 'SEED STAGE'}
      </div>

      {/* Header with Primary Image and Logo */}
      <div className="relative h-48 w-full">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={project.project_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No image available
          </div>
        )}
        {/* Logo Overlay */}
        {project.project_logo && (
          <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-md ml-4">
            <img
              src={`${API_BASE_URL}/${project.project_logo}`}
              alt={`${project.project_name} logo`}
              className="h-12 w-12 object-contain rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Title and Location */}
        <h2 className="text-xl font-bold text-gray-800">
          {project.project_name || 'Untitled Project'}
        </h2>
        <p className="text-sm text-blue-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5.13 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
          {project.city && project.state
            ? `${project.city}, ${project.state}`
            : 'Location not specified'}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">
          {project.market_description ||
            project.business_description ||
            'No description available.'}
        </p>

        {/* Bullet Points */}
        <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
          {project.bussiness_highlights ? (
            <li>{project.bussiness_highlights}</li>
          ) : (
            <li>No highlights provided.</li>
          )}
          <li>Industry: {project.project_industry || 'Not specified'}</li>
          <li>Deal Type: {project.deal_type || 'Not specified'}</li>
        </ul>

        {/* Investment Info */}
        <div className="flex justify-between mt-4 text-gray-800">
          <div>
            <p className="text-lg font-bold">
              {`${project.max_investment} EGP` || 'N/A'}
            </p>
            <p className="text-xs text-gray-500">Total Required</p>
          </div>
          <div>
            <p className="text-lg font-bold">
              {`${project.min_investment} EGP` || 'N/A'}
            </p>
            <p className="text-xs text-gray-500">Min per Investor</p>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/client-portal/investor/viewProject/${encryptedProjectId}`}
          className="w-full mt-4 bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-center">
          FIND OUT MORE
        </Link> 
      </div>
    </div>
  );
}

export default Card;