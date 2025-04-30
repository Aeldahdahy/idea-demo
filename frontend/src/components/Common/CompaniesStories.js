import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.js'; // Adjust the import path as necessary
import { useFunctions } from '../../useFunctions.js';

function CompaniesStories() {
  const [projects, setProjects] = useState([]);
  const { getAllProjectsBeforeAuth } = useFunctions();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjectsBeforeAuth();
        console.log('Fetched projects:', response); // Debugging line
        if (Array.isArray(response)) {
          setProjects(response);
        } else {
          throw new Error('Expected an array of projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []); // Adjust the delay as needed

  // Create placeholder projects for loading state
  const placeholderProjects = Array(5).fill({ id: 'placeholder', isPlaceholder: true });

  return (
    <div className="CompaniesStoriesContainer my-8 px-4">
      <h1 className="text-center mb-10" style={{ fontWeight: "bold", fontSize:35}}>Trending Projects</h1>
      <div className="overflow-hidden">
        <div className="flex animate-infinite-scroll hover:pause-animation gap-20">
          {(projects.length > 0 ? projects : placeholderProjects).map((project, index) => (
            <div key={`frozen-${project.id}-${index}`} className="flex-none mx-2">
              <Link to="/client-portal/clientSignForm" style={{ textDecoration: 'none' }}>
                <Card project={project} errorFetching={projects.length === 0 ? 'error' : null} />
              </Link>
            </div>
          ))}
          {(projects.length > 0 ? projects : placeholderProjects).map((project, index) => (
            <div key={`duplicate-${project.id}-${index}`} className="flex-none mx-2">
              <Link to="/client-portal/clientSignForm" style={{ textDecoration: 'none' }}>
                <Card project={project} errorFetching={projects.length === 0 ? 'error' : null} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default CompaniesStories;