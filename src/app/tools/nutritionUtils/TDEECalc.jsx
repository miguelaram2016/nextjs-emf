import { useState } from 'react';

const TDEECalc = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calories, setCalories] = useState(0);
  const [units, setUnits] = useState({weight: 'kg', height: 'cm'});
  const [system, setSystem] = useState('metric');
  const [bmr, setBMR] = useState(0);
  const [exercise, setExercise] = useState(0);

  const handleCalculate = () => {
    const weightUnit = parseFloat(weight);
    const heightUnit = parseFloat(height);
    const ageYears = parseFloat(age);

    let weightKg, heightCm;

    if (system === 'imperial') {
      weightKg = weightUnit / 2.20462;
      heightCm = heightUnit / 0.393701;
    } else {
      weightKg = weightUnit;
      heightCm = heightUnit;
    }

    let basalMR = 0;

    if (gender === 'male') {
      basalMR = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else if (gender === 'female') {
      basalMR = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    } else {
      const maleBmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
      const femaleBmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
      basalMR = (maleBmr + femaleBmr) / 2;
    }

    setBMR(basalMR);

    let tdee = 0;
    let activityFactor = 1.2;

    if (activityLevel === 'lightly-active') {
      activityFactor = 1.375;
    } else if (activityLevel === 'moderately-active') {
      activityFactor = 1.55;
    } else if (activityLevel === 'very-active') {
      activityFactor = 1.725;
    } else if (activityLevel === 'super-active') {
      activityFactor = 1.9;
    }

    tdee = basalMR * activityFactor;
    setExercise(tdee - basalMR);
    setCalories(tdee);
  };

  const handleSystemChange = (e) => {
    const newSystem = e.target.value;
    setSystem(newSystem);
    if (newSystem === 'imperial') {
      setUnits({weight: 'lbs', height: 'in'});
    } else {
      setUnits({weight: 'kg', height: 'cm'});
    }
  };

  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Total Daily Energy Expenditure (TDEE) Calculator</h1>
        <div className='mb-10 '>
          The TDEE Calculator uses BMR and NEAT to estimate your daily calorie expenditure. Tailor your nutrition plan and maximize your progress towards goals with precision. Unlock your potential with the TDEE Calculator for optimal results.        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="flex flex-col mb-4">
              <label htmlFor="system" className="text-lg">
                Unit System:
              </label>
              <select
                id="system"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
                value={system}
                onChange={handleSystemChange}
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, in)</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
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
            <div className="flex flex-col mb-4">
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
            <div className="flex flex-col mb-4">
              <label htmlFor="age" className="text-lg">
                Age (years):
              </label>
              <input
                type="number"
                id="age"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
          <label htmlFor="gender" className="text-lg">
            Gender:
          </label>
          <select
            id="gender"
            className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other/Non-binary</option>
          </select>
        </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="activityLevel" className="text-lg">
                Activity Level:
              </label>
              <select
                id="activityLevel"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="lightly-active">Lightly Active (light exercise/sports 1-3 days/week)</option>
                <option value="moderately-active">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                <option value="very-active">Very Active (hard exercise/sports 6-7 days/week)</option>
                <option value="super-active">Super Active (very hard exercise/sports & physical job or 2x training)</option>
              </select>
            </div>
            
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Caloric Needs</h2>
            {calories > 0 ? (
              <div>
                <p className="text-lg">
                  Your Basal Metabolic Rate <br></br> (BMR) is <span className="font-bold">{Math.round(bmr)} calories</span>.
                </p>
                <p className="text-lg">
                  Your daily calorie expenditure due to exercise and physical activity is <span className="font-bold">{Math.round(exercise)} calories</span>.
                </p>
                <p className="text-lg">
                  Your Total Daily Energy Expenditure <br></br> (TDEE) is <span className="font-bold">{Math.round(calories)} calories</span>.
                </p>
                <p className="text-lg mt-4">To maintain your current weight, you should aim for this number of calories each day. Adjust your calorie intake to lose or gain weight accordingly.</p>
              </div>
            ) : (
              <p className="text-lg">Enter your information and click calculate to see your recommended caloric needs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TDEECalc;
