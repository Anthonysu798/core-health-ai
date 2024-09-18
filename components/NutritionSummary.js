import React from 'react';

const NutritionSummary = () => {
  const nutritionData = {
    calories: { consumed: 1500, goal: 2000 },
    protein: { consumed: 75, goal: 100 },
    carbs: { consumed: 150, goal: 200 },
    fat: { consumed: 50, goal: 65 },
  };

  const renderProgressBar = (consumed, goal) => {
    const percentage = Math.min((consumed / goal) * 100, 100);
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Nutrition Summary</h3>
      <ul className="space-y-4">
        {Object.entries(nutritionData).map(([nutrient, { consumed, goal }]) => (
          <li key={nutrient}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 capitalize">{nutrient}</span>
              <span className="text-sm text-gray-500">{consumed} / {goal}g</span>
            </div>
            {renderProgressBar(consumed, goal)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionSummary;