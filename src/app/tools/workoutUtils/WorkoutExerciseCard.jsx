"use client"

import { useState } from 'react';

const WorkoutExerciseCard = ({ exercise }) => {
  const name  = exercise.exercise;
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState(exercise.weight);
  const [equipment, setEquipment] = useState(exercise.equipment);

  const handleSetsChange = (e) => {
    setSets(e.target.textContent);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.textContent);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.textContent);
  };

  const handleEquipmentChange = (e) => {
    setEquipment(e.target.textContent);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h6 className="text-xl font-medium text-white mb-2">{name}</h6>
      <div className="flex flex-wrap justify-between border-t border-b border-gray-700 py-2">
        <div className="text-gray-400 mb-1">
          <p className="font-semibold">Sets:</p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleSetsChange}
          >
            {sets}
          </p>
        </div>
        <div className="text-gray-400 mb-1">
          <p className="font-semibold">Reps:</p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleRepsChange}
          >
            {reps}
          </p>
        </div>
        <div className="text-gray-400 mb-1">
          <p className="font-semibold">Weight:</p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleWeightChange}
          >
            {weight}
          </p>
        </div>
        <div className="text-gray-400 mb-1">
          <p className="font-semibold">Equipment:</p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleEquipmentChange}
          >
            {equipment}
          </p>
        </div>
      </div>
      {/* Add any additional exercise details or descriptions here */}
    </div>
  );
};

export default WorkoutExerciseCard