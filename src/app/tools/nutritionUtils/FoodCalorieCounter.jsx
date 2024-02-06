import React, { useState } from 'react';

const FoodCalorieCounter = () => {
  const [foodItem, setFoodItem] = useState({name: '', calories: ''});
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleAdd = () => {
    if (foodItem.name && foodItem.calories) {
      setFoodList([...foodList, foodItem]);
      setTotalCalories(totalCalories + Number(foodItem.calories));
      setFoodItem({name: '', calories: ''});
    }
  };

  return (
    <div style={{padding: '10px', backgroundColor: '#121212', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'}}>
      <h2 className="text-xl font-semibold my-4" style={{textAlign: 'center', color: '#F0F0F0'}}>Food Calorie Counter</h2>
      
      <div className="flex flex-row mb-4">
        <div className="flex flex-col mr-2">
          <label htmlFor="foodName" className="text-lg" style={{color: '#F0F0F0'}}>Food Item:</label>
          <input
            type="text"
            id="foodName"
            className="px-4 py-2 rounded focus:outline-none"
            style={{backgroundColor: '#2E3440', color: '#F0F0F0'}}
            value={foodItem.name}
            onChange={(e) => setFoodItem({...foodItem, name: e.target.value})}
          />
        </div>

        <div className="flex flex-col ml-2">
          <label htmlFor="calories" className="text-lg" style={{color: '#F0F0F0'}}>Calories:</label>
          <input
            type="number"
            id="calories"
            className="px-4 py-2 rounded focus:outline-none"
            style={{backgroundColor: '#2E3440', color: '#F0F0F0'}}
            value={foodItem.calories}
            onChange={(e) => setFoodItem({...foodItem, calories: e.target.value})}
          />
        </div>
      </div>

      <button
        className="px-4 py-2 rounded focus:outline-none"
        style={{backgroundColor: '#3B4252', color: '#F0F0F0'}}
        onClick={handleAdd}
      >
        Add
      </button>

      <h3 className="text-lg mt-4" style={{textAlign: 'center', color: '#F0F0F0'}}>Total Calories: {totalCalories}</h3>

      <div style={{ marginTop: '20px', textAlign: 'center', color: '#F0F0F0'}}>
        <h3 className="text-lg">Food Items:</h3>
        <ul>
          {foodList.map((item, index) => (
            <li key={index} className="text-lg" style={{color: '#F0F0F0'}}>
              {item.name} - {item.calories} calories
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodCalorieCounter;
