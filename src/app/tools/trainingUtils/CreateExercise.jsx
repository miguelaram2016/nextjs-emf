"use client"
import { useState } from 'react';
import axios from 'axios';

const CreateExercise = () => {
  const [exerciseId, setExerciseId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [equipment, setEquipment] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleCreateExercise = async () => {
    try {
      const newExercise = {
        exerciseId,
        name,
        description,
        categories,
        equipment,
        videoUrl,
      };

      const response = await axios.post('http://localhost:3001/api/exercises', newExercise);
      console.log('Exercise created:', response.data);

      // Reset the form
      setExerciseId('');
      setName('');
      setDescription('');
      setCategories([]);
      setEquipment('');
      setVideoUrl('');
    } catch (error) {
      console.error('Error creating exercise:', error);
      // Handle the error
    }
  };

  return (
    <div className="my-4 p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Create Exercise</h1>
      <form onSubmit={handleCreateExercise}>
        <div className="mb-4">
          <label htmlFor="exerciseId" className="block mb-2">
            Exercise ID:
          </label>
          <input
            type="text"
            id="exerciseId"
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            className="px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 w-full rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block mb-2">
            Categories:
          </label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value.split(','))}
            className="px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="equipment" className="block mb-2">
            Equipment:
          </label>
          <input
            type="text"
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block mb-2">
            Video URL:
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="px-4 py-2 w-full rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateExercise;
