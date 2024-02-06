import React from 'react';

const MaxWorkout = ({ maxWeight }) => {
  // Calculate warm-up and work sets as a fraction of the max weight, with reps
  const workoutWeights = {
    squat: {
      warmup: [
        {weight: maxWeight.squat * 0.5, reps: 5},
        {weight: maxWeight.squat * 0.6, reps: 4},
        {weight: maxWeight.squat * 0.7, reps: 3},
        {weight: maxWeight.squat * 0.8, reps: 2},
      ],
      work: maxWeight.squat,
    },
    benchPress: {
      warmup: [
        {weight: maxWeight.benchPress * 0.5, reps: 5},
        {weight: maxWeight.benchPress * 0.6, reps: 4},
        {weight: maxWeight.benchPress * 0.7, reps: 3},
        {weight: maxWeight.benchPress * 0.8, reps: 2},
      ],
      work: maxWeight.benchPress,
    },
    deadlift: {
      warmup: [
        {weight: maxWeight.deadlift * 0.5, reps: 5},
        {weight: maxWeight.deadlift * 0.6, reps: 4},
        {weight: maxWeight.deadlift * 0.7, reps: 3},
        {weight: maxWeight.deadlift * 0.8, reps: 2},
      ],
      work: maxWeight.deadlift,
    },
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 rounded shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Workout:</h2>
      {Object.entries(workoutWeights).map(([exercise, weights]) => (
        <div key={exercise}>
          <h3 className="font-bold text-lg mb-2">{exercise.charAt(0).toUpperCase() + exercise.slice(1)}:</h3>
          <p className="font-bold">Warm Up Sets:</p>
          {weights.warmup.map((set, index) => (
            <p key={index}>- Set {index + 1}: {set.weight.toFixed(2)} lbs for {set.reps} reps</p>
          ))}
          <p className="font-bold">Work Set:</p>
          <p>- 1 rep at {weights.work} lbs</p>
        </div>
      ))}
    </div>
  );
};

export default MaxWorkout;
