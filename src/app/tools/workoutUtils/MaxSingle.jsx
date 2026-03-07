"use client"
import  { useState } from 'react';
import MaxWorkout from './MaxWorkout';


export const MaxSingle = () => {
  const [maxWeight, setMaxWeight] = useState({
    squat: '',
    benchPress: '',
    deadlift: ''
  });

  const [workout, setWorkout] = useState(null);

  const handleChange = (e) => {
    setMaxWeight({
      ...maxWeight,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkout(maxWeight);
    
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-800">
      <h1 className="font-bold text-3xl my-10">Max Single Protocol</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 m-4 bg-white rounded shadow-md"
      >
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-md text-gray-900" htmlFor='squat'>
            Squat Max Weight
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type='number'
            name='squat'
            id='squat'
            value={maxWeight.squat}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-md text-gray-900" htmlFor='benchPress'>
            Bench Press Max Weight
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type='number'
            name='benchPress'
            id='benchPress'
            value={maxWeight.benchPress}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="mb-2 font-bold text-md text-gray-900" htmlFor='deadlift'>
            Deadlift Max Weight
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type='number'
            name='deadlift'
            id='deadlift'
            value={maxWeight.deadlift}
            onChange={handleChange}
          />
        </div>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          type="submit"
        >
          Generate Workout
        </button>
      </form>
      {workout && <MaxWorkout maxWeight={maxWeight}/>}
    </div>
  );
};


export default MaxSingle