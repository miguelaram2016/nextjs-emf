import React, { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [units, setUnits] = useState({ weight: 'kg', height: 'cm' });
  const [system, setSystem] = useState('metric');

  const handleCalculate = () => {
    const weightUnit = parseFloat(weight);
    const heightUnit = parseFloat(height);

    let weightKg, heightM;

    if (system === 'imperial') {
      weightKg = weightUnit / 2.20462;
      heightM = heightUnit * 0.0254;
    } else {
      weightKg = weightUnit;
      heightM = heightUnit / 100;
    }

    const bmi = weightKg / (heightM * heightM);
    setBmi(bmi.toFixed(1));

    if (bmi < 18.5) {
      setCategory('Underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setCategory('Normal weight');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const handleUnitSystemChange = (selectedSystem) => {
    if (selectedSystem === 'metric') {
      setUnits({ weight: 'kg', height: 'cm' });
    } else {
      setUnits({ weight: 'lb', height: 'in' });
    }
    setSystem(selectedSystem);
    setWeight('');
    setHeight('');
    setBmi(0);
    setCategory('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold my-10 py-10">Body Mass Index (BMI) Calculator</h2>
      <div className="flex flex-row justify-center mb-4">
        <div className="flex flex-col mr-4">
          <label htmlFor="weight" className="text-lg">
            Weight ({units.weight}):
          </label>
          <input
            type="number"
            id="weight"
            className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="height" className="text-lg">
            Height ({units.height}):
          </label>
          <input
            type="number"
            id="height"
            className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <button
          className={`mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none ${
            system === 'metric' ? 'opacity-50' : ''
          }`}
          onClick={() => handleUnitSystemChange('imperial')}
          disabled={system === 'imperial'}
        >
          Imperial
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none ${
            system === 'metric' ? '' : 'opacity-50'
          }`}
          onClick={() => handleUnitSystemChange('metric')}
          disabled={system === 'metric'}
        >
          Metric
        </button>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {bmi > 0 && (
        <div>
          <p className="text-lg mt-4">
            Your Body Mass Index (BMI) is <span className="font-bold">{bmi}</span>, which is classified as{' '}
            <span className="font-bold">{category}</span>.
          </p>
          <p className="text-sm mt-2">
            Please note that BMI is a generalization tool and may not accurately reflect an individual's health due to
            factors such as different body types, muscle mass, and genetic factors.
          </p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
