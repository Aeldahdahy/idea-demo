import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { encryptId } from '../../Security/encryptionUtils';
import { useFunctions } from '../../useFunctions.js';

// Error boundary component
const ErrorBoundary = ({ children, fallback }) => {
  try {
    return children;
  } catch (error) {
    console.error('Error in Card:', error);
    return fallback;
  }
};

// Skeleton loader component
const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const Card = memo(({ project, errorFetching, baseUrl }) => {
  const { API_BASE_URL } = useFunctions();
  const isLoading = !project || errorFetching === 'error' || project?.isPlaceholder;

  // Memoize encrypted project ID
  const encryptedProjectId = useMemo(() => {
    if (!project?._id) return null;
    try {
      return encryptId(project._id);
    } catch (error) {
      console.error('Failed to encrypt project ID:', error);
      return null;
    }
  }, [project?._id]);

  // Memoize primary image URL
  const primaryImage = useMemo(() => {
    if (
      project?.project_images &&
      Array.isArray(project.project_images) &&
      project.project_images.length > 0
    ) {
      return `${baseUrl || API_BASE_URL}/${project.project_images[0]}`;
    }
    return null;
  }, [project?.project_images, baseUrl, API_BASE_URL]);

  // Function to trim text and add ellipsis if needed
  const trimText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  if (encryptedProjectId === null && !isLoading) {
    return (
      <div
        className="shadow-sm overflow-hidden rounded-lg"
        style={{ backgroundColor: '#e6ebf5', maxWidth: '28rem', margin: '0 auto' }}
      >
        <div className="p-4">
          <p style={{ color: 'red', textAlign: 'center' }}>
            Error: Unable to load project link.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
        <div className="absolute top-0 right-0 bg-gray-200 text-gray-200 text-xs font-bold px-2 py-1 rounded-bl-lg">
          LOADING
        </div>
        <div className="relative h-48 w-full">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-md ml-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow justify-between">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-1" />
          <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
            <li><Skeleton className="h-4 w-3/4 inline-block" /></li>
            <li><Skeleton className="h-4 w-2/3 inline-block" /></li>
            <li><Skeleton className="h-4 w-4/5 inline-block" /></li>
          </ul>
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
          <Skeleton className="w-full h-10 mt-4 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div
          className="shadow-sm overflow-hidden rounded-lg"
          style={{ backgroundColor: '#e6ebf5', maxWidth: '28rem', margin: '0 auto' }}
        >
          <div className="p-4">
            <p style={{ color: 'red', textAlign: 'center' }}>
              Error: Unable to render project card.
            </p>
          </div>
        </div>
      }
    >
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col">
        <div className="absolute top-0 right-0 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
          {project.project_stage || 'SEED STAGE'}
        </div>
        <div className="relative h-48 w-full">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={project.project_name || 'Project image'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              No image available
            </div>
          )}
          {project.project_logo && (
            <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-md ml-4">
              <img
                src={`${baseUrl || API_BASE_URL}/${project.project_logo}`}
                alt={`${project.project_name || 'Project'} logo`}
                className="h-12 w-12 object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow justify-between">
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
          
          {/* Updated Market Description with label */}
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-gray-700">Market Description:</h3>
            <p className="text-sm text-gray-600">
              {trimText(project.market_description || project.business_description || 'No description available.', 120)}
            </p>
          </div>
          
          <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
            {/* Updated Business Highlights with label */}
            <li>
              <span className="font-semibold">Highlights:</span> {trimText(project.bussiness_highlights || 'No highlights provided.', 80)}
            </li>
            <li>Industry: {project.project_industry || 'Not specified'}</li>
            <li>Deal Type: {project.deal_type || 'Not specified'}</li>
          </ul>
          
          <div className="flex justify-between mt-4 text-gray-800">
            <div>
              <p className="text-lg font-bold">
                {project.max_investment ? `${project.max_investment} EGP` : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Total Required</p>
            </div>
            <div>
              <p className="text-lg font-bold">
                {project.min_investment ? `${project.min_investment} EGP` : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Min per Investor</p>
            </div>
          </div>
          <Link
            to={`/client-portal/investor/viewProject/${encryptedProjectId}`}
            className="w-full mt-4 bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-center"
          >
            FIND OUT MORE
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
});

Card.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    project_name: PropTypes.string,
    project_stage: PropTypes.string,
    project_images: PropTypes.arrayOf(PropTypes.string),
    project_logo: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    market_description: PropTypes.string,
    business_description: PropTypes.string,
    bussiness_highlights: PropTypes.string,
    project_industry: PropTypes.string,
    deal_type: PropTypes.string,
    max_investment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min_investment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPlaceholder: PropTypes.bool,
  }),
  errorFetching: PropTypes.string,
  baseUrl: PropTypes.string,
};

Card.defaultProps = {
  project: null,
  errorFetching: null,
  baseUrl: null,
};

export default Card;