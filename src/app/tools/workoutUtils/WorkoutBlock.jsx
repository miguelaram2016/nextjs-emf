"use client"

import { useState } from 'react';
import WeekCard from './WeekCard.jsx';

const WorkoutBlock = ({ trainingBlock }) => {
  const { program } = trainingBlock;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderWeekCards = () => {
    return program.map((week, index) => (
      <WeekCard trainingWeek={program[index]} key={index} />
    ));
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">
        <button
          className="flex items-center focus:outline-none"
          onClick={toggleExpand}
        >
          <span className="mr-2">
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 6a1 1 0 00-1 1v6a1 1 0 002 0V7a1 1 0 00-1-1zm-1 8a1 1 0 100 2 1 1 0 000-2zm2-8a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 14a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 100-6 3 3 0 000 6zm0-6a1 1 0 110 2 1 1 0 010-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          {trainingBlock.blockName}
        </button>
      </h2>
      {expanded && <div>{renderWeekCards()}</div>}
    </div>
  );
};

export default WorkoutBlock;
