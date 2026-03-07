"use client"
import { useState } from 'react';
import { MaxSingle, OneRepMaxCalc } from './workoutUtils';
import SquatFreeBody  from './SquatFreeBody';
import { MacronutrientCalc, BMICalculator, TDEECalc, HealthyTips } from './nutritionUtils/';
import SearchExercises from './trainingUtils/SearchExercises';
import CreateExercise from './trainingUtils/CreateExercise';
import TrainingPrograms from './TrainingPrograms';
import './Tools.css';

const trainingTools = [
  { id: 'OneRepMaxCalc', title: '1RM Calculator', description: 'Estimate your one rep max from submaximal loads.', icon: '🏋️' },
  { id: 'MaxSingle', title: 'Max Single Protocol', description: 'Warm-up protocol for testing your 1RM safely.', icon: '🔥' },
  { id: 'SquatFreeBody', title: 'Squat Form Guide', description: 'Analyze your squat mechanics with visual feedback.', icon: '🦵' },
  { id: 'SearchExercises', title: 'Exercise Search', description: 'Search a database of exercises with descriptions and videos.', icon: '🔍' },
  { id: 'CreateExercise', title: 'Create Exercise', description: 'Build custom exercises for your workouts.', icon: '✏️' },
  { id: 'TrainingPrograms', title: 'Training Programs', description: 'Browse pre-built training programs.', icon: '📋' },
];

const nutritionTools = [
  { id: 'TDEECalc', title: 'TDEE Calculator', description: 'Find your Total Daily Energy Expenditure.', icon: '⚡' },
  { id: 'BMICalculator', title: 'BMI Calculator', description: 'Check your Body Mass Index.', icon: '📊' },
  { id: 'MacronutrientCalc', title: 'Macro Calculator', description: 'Calculate your ideal protein, carbs, and fats.', icon: '🥗' },
];

const Tools = () => {
  const [expandedTool, setExpandedTool] = useState(null);

  const renderToolComponent = (toolId) => {
    switch (toolId) {
      case 'MaxSingle':
        return <MaxSingle />;
      case 'OneRepMaxCalc':
        return <OneRepMaxCalc />;
      case 'SquatFreeBody':
        return <SquatFreeBody />;
      case 'SearchExercises':
        return <SearchExercises />;
      case 'CreateExercise':
        return <CreateExercise />;
      case 'TrainingPrograms':
        return <TrainingPrograms />;
      case 'TDEECalc':
        return <TDEECalc />;
      case 'BMICalculator':
        return <BMICalculator />;
      case 'MacronutrientCalc':
        return <MacronutrientCalc />;
      default:
        return null;
    }
  };

  const ToolCard = ({ tool, index }) => (
    <div 
      className={`tool-card bg-gray-800 p-5 rounded-lg hover:bg-gray-750 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500 ${expandedTool === tool.id ? 'tool-card-expanded' : ''}`}
      onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{tool.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{tool.title}</h3>
          <p className="text-gray-400 text-sm">{tool.description}</p>
        </div>
        <span className={`text-gray-500 transition-transform ${expandedTool === tool.id ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {expandedTool === tool.id && (
        <div className="tool-content animate-fadeIn">
          {renderToolComponent(tool.id)}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-2">Free Fitness Tools</h1>
      <p className="text-gray-400 mb-8">Calculate, track, and optimize your fitness journey — completely free.</p>
      
      {/* Training Tools Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🏋️</span> Training Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </section>

      {/* Nutrition Tools Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🥗</span> Nutrition Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutritionTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </section>

      {/* Healthy Tips */}
      <section>
        <HealthyTips />
      </section>
    </div>
  );
};

export default Tools;
