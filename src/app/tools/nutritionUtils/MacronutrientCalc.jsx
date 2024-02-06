import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, LabelList } from 'recharts';

const MacronutrientCalc = () => {
  const [tdee, setTdee] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [macros, setMacros] = useState({ carbs: 0, protein: 0, fats: 0 });
  const COLORS = ['#2C5282', '#319795', '#2B6CB0'];

  const handleCalculate = () => {
    const tdeeVal = parseFloat(tdee);
    let carbs, protein, fats;

    if (goal === 'maintain') {
      protein = tdeeVal * 0.25;
      fats = tdeeVal * 0.25;
      carbs = tdeeVal * 0.5;
    } else if (goal === 'lose') {
      protein = tdeeVal * 0.4;
      fats = tdeeVal * 0.2;
      carbs = tdeeVal * 0.4;
    } else {
      // gain
      protein = tdeeVal * 0.3;
      fats = tdeeVal * 0.25;
      carbs = tdeeVal * 0.45;
    }

    setMacros({ carbs, protein, fats });
  };

  const pieData = [
    { name: 'Carbohydrates', value: macros.carbs },
    { name: 'Protein', value: macros.protein },
    { name: 'Fats', value: macros.fats },
  ];

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 text-white rounded-lg shadow-md p-8 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">Macronutrient Calculator</h2>
      <div className="mb-6">
        <label htmlFor="tdee" className="block text-gray-400">
          Total Daily Energy Expenditure (TDEE):
        </label>
        <input
          type="number"
          id="tdee"
          className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          value={tdee}
          onChange={(e) => setTdee(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="goal" className="block text-gray-400">
          Goal:
        </label>
        <select
          id="goal"
          className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="maintain">Maintain weight</option>
          <option value="lose">Lose weight</option>
          <option value="gain">Gain weight/muscle</option>
        </select>
      </div>
      <button
        className="w-full py-2 px-3 text-white bg-blue-500 rounded-md focus:bg-blue-600 hover:bg-blue-600"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {tdee > 0 && (
        <div className="mt-8">
          <p className="text-lg text-gray-400">
            Based on your TDEE of {tdee} calories and your goal to {goal} weight, here are your recommended macronutrients:
          </p>
          <div className="flex flex-col md:flex-row justify-center mt-6">
            <PieChart width={300} height={300} className="mx-auto">
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={true}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList
                  position="inside"
                  fill="#ffffff"
                  dataKey="value"
                  formatter={(value) => `${value.toFixed(0)} cals`}
                />
              </Pie>
              <Tooltip />
            </PieChart>
            <ul className="mt-6 sm:ml-40 md:mt-20 md:ml-10" style={{ listStyle: 'none', paddingLeft: 0 }}>
              {pieData.map((entry, index) => (
                <li
                  key={`item-${index}`}
                  className="flex items-center mb-2"
                >
                  <div
                    style={{ width: '1em', height: '1em', marginRight: '0.5em', backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-6 text-gray-400">
            <li>
              Carbohydrates: {macros.carbs.toFixed(2)} calories ({(macros.carbs / 4).toFixed(2)}g) -{' '}
              {(macros.carbs / tdee * 100).toFixed(2)}%
            </li>
            <li>
              Protein: {macros.protein.toFixed(2)} calories ({(macros.protein / 4).toFixed(2)}g) -{' '}
              {(macros.protein / tdee * 100).toFixed(2)}%
            </li>
            <li>
              Fats: {macros.fats.toFixed(2)} calories ({(macros.fats / 9).toFixed(2)}g) -{' '}
              {(macros.fats / tdee * 100).toFixed(2)}%
            </li>
          </ul>
          <p className="text-lg text-gray-400 mt-4">
            Ratio: {(macros.carbs / tdee * 100).toFixed(2)}% carbs / {(macros.protein / tdee * 100).toFixed(2)}% protein /{' '}
            {(macros.fats / tdee * 100).toFixed(2)}% fats
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Note: The macronutrient ratios provided here are general recommendations and may vary depending on individual needs, goals, and dietary preferences. It&apos;s always recommended to consult with a healthcare professional or registered dietitian for personalized advice.
          </p>
        </div>
      )}
    </div>
  );
};

export default MacronutrientCalc;
