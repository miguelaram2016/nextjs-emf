"use client"

import React, { useState, useEffect } from 'react';

import { repPercentages } from '../../constants';

const OneRepMaxCalc = () => {
    const [exercise, setExercise] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [oneRepMax, setOneRepMax] = useState(0);


    useEffect(() => {
      if (reps > 0) {
        const repMax = Math.round(weight / (1.0278 - 0.0278 * reps));
        setOneRepMax(repMax.toFixed(1));
      }
    }, [reps, weight]);

    const handleChangeExercise = e => setExercise(e.target.value);
    const handleChangeReps = e => setReps(e.target.value);
    const handleChangeWeight = e => setWeight(e.target.value);
    const handleChangeUnit = e => setUnit(e.target.value);

    const calculateRepMax = (rep) => {
      rep = Number(rep);
      if (reps <= 0) return 0;
      const repMax = Math.round(weight / (1.0278 - 0.0278 * reps)) * (repPercentages[rep] / 100);
      return repMax;
    };

    return (
        <div className="text-white bg-gray-800 mt-20 p-10 rounded-xl">
            <h1 className="text-center text-3xl mb-4">One Rep Max Calculator</h1>
            <div className="flex flex-col items-center">
                <input type="text" onChange={handleChangeExercise} className="p-2 mb-4 border-2 border-blue-500 bg-transparent text-white placeholder-blue-500" placeholder="Exercise" />
                <input type="number" onChange={handleChangeReps} className="p-2 mb-4 border-2 border-blue-500 bg-transparent text-white placeholder-blue-500" placeholder="Number of Reps" />
                <input type="number" onChange={handleChangeWeight} className="p-2 mb-4 border-2 border-blue-500 bg-transparent text-white placeholder-blue-500" placeholder="Weight" />
                <select onChange={handleChangeUnit} className="p-2 mb-4 border-2 border-blue-500 bg-transparent text-white">
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
                <div className="mb-4">
                  Your {exercise} One Rep Max is: {oneRepMax} {unit}
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="border-b-2 border-blue-500 text-white">
                            <th className="w-1/3">Repetitions</th>
                            <th className="w-1/3">Weight ({unit})</th>
                            <th className="w-1/3">Percentage of 1RM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(repPercentages).map(rep => (
                            <tr key={rep} className="border-b border-blue-500 text-white">
                                <td>{rep}</td>
                                <td>{(calculateRepMax(rep)).toFixed(1)}</td>
                                <td>{repPercentages[rep]}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OneRepMaxCalc;
