import { useState, useEffect } from 'react';
import { nutritionTips, fitnessTips } from '../../constants';

const HealthyTips = () => {
  const [tip, setTip] = useState('');
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const allTips = [...nutritionTips, ...fitnessTips];

    const randomTip = allTips[Math.floor(Math.random() * allTips.length)];
    setTip(randomTip);
  }, [refresh]);

  const refreshTip = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="bg-gray-900 text-white px-4 py-10 my-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Healthy Tip of the Day</h2>
      <p className="text-lg">
        {tip}
      </p>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 focus:outline-none"
        onClick={refreshTip}
      >
        Refresh Tip
      </button>
    </div>
  );
};

export default HealthyTips;
