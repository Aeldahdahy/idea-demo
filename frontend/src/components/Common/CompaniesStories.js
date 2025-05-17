import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.js'; // Adjust the import path if needed
import { useFunctions } from '../../useFunctions.js';

function CompaniesStories() {
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);
  const { getAllProjectsBeforeAuth } = useFunctions();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjectsBeforeAuth();
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
  }, []);

  const placeholderProjects = Array(5).fill({ id: 'placeholder', isPlaceholder: true });
  const displayedProjects = projects.length > 0 ? projects : placeholderProjects;

  return (
    <div className="CompaniesStoriesContainer my-8 px-4">
      <h1 className="text-center mb-10 font-bold text-[35px]">Trending Projects</h1>

      {/* Scrollable wrapper for user drag/swipe */}
      <div
        className="overflow-x-auto scroll-smooth no-scrollbar"
        ref={scrollRef}
      >
        {/* Auto-scrolling inner flex container */}
        <div className="flex animate-infinite-scroll hover:pause-animation gap-10 w-max">
          {/* Repeat cards twice for looping illusion */}
          {[...displayedProjects, ...displayedProjects].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-none mx-2 w-[300px] h-[680px]"
            >
              <Link to="/client-portal/clientSignForm" className="block w-full h-full no-underline">
                <Card
                  project={project}
                  errorFetching={projects.length === 0 ? 'error' : null}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CompaniesStories;
