import React from 'react';

const ExerciseCard = ({ exercise }) => {
  const { exerciseId, name, description, categories, equipment, videoUrl } = exercise;

  const renderThumbnail = () => {
    if (videoUrl) {
      return (
        <div className="mb-4">
          <iframe
            title="Exercise Video"
            width="560"
            height="315"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <p>No video available</p>
          {/* Placeholder thumbnail */}
          <img
            src="placeholder-thumbnail.jpg"
            alt="No Video Thumbnail"
            className="w-full h-auto"
          />
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-blue-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{name}</h2>
      <p className="mb-4">Exercise ID: {exerciseId}</p>
      <p className="mb-4">{description}</p>
      <p className="mb-4">Categories: {categories.join(', ')}</p>
      <p className="mb-4">Equipment: {equipment}</p>
      {renderThumbnail()}
    </div>
  );
};

export default ExerciseCard;
