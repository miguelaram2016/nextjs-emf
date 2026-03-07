"use client"
import React, { useState } from 'react';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';

const SearchExercises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/exercises', {
        params: {
          search: searchTerm,
        },
      });
      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching exercises:', error);
      // Handle the error
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-md mr-2"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-700 rounded-md">
        Search
      </button>

      <h2 className="text-xl font-bold mt-4">Search Results</h2>
      {searchResults.length > 0 ? (
        <div className="mt-2">
          {searchResults.map((exercise) => (
            <ExerciseCard key={exercise._id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <p className="mt-2">No results found.</p>
      )}
    </div>
  );
};

export default SearchExercises;
