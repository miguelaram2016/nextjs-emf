"use client"
import { useState, useRef } from 'react';
import { MaxSingle, OneRepMaxCalc } from './workoutUtils';
import SquatFreeBody  from './SquatFreeBody';
import { MacronutrientCalc, BMICalculator, TDEECalc, HealthyTips } from './nutritionUtils/';

const Tools = () => {
  const [expandedTool, setExpandedTool] = useState(null);
  const toolContainerRef = useRef(null);

  const toolDescriptions = {
    MaxSingle: {
      title: 'Max Single Protocol',
      description: 'This tool helps you warm up to your one rep max attempt.'
    },
    OneRepMaxCalc: {
      title: 'One Rep Max Calculator',
      description: 'Estimate your one rep max based on other rep maxes.'
    },
    SquatFreeBody: {
      title: 'Squat Free Body Diagram',
      description: 'Analyze squat mechanics with a free body diagram.'
    },
    Exercises: {
      title: 'Exercises',
      description: 'A collection of exercises with descriptions and videos.'
    },
    TDEECalc: {
      title: 'TDEE Calculator',
      description: 'Estimate your Total Daily Energy Expenditure (TDEE).'
    },
    BMICalculator: {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index (BMI).'
    },
    MacronutrientCalc: {
      title: 'Macronutrient Calculator',
      description: 'Calculate recommended macronutrient distribution.'
    }
  };

  const handleToolClick = (toolName) => {
    setExpandedTool(expandedTool === toolName ? null : toolName);
  };

  const renderToolDescription = (toolName) => {
    const tool = toolDescriptions[toolName];
    return (
      <>
        <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
        <p className="mb-2">{tool.description}</p>
        <p className="mb-2">Click below to {expandedTool === toolName ? 'close' : 'open'} the {tool.title}:</p>
      </>
    );
  };

  const renderToolComponent = (toolName) => {
    switch (toolName) {
      case 'MaxSingle':
        return <MaxSingle />;
      case 'OneRepMaxCalc':
        return <OneRepMaxCalc />;
      case 'SquatFreeBody':
        return <SquatFreeBody />;
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

  return (
    <div className="container mx-auto py-10">
      <HealthyTips />
      <h1 className="text-3xl font-bold mb-6">Training Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(toolDescriptions).map(toolName => (
          <div key={toolName} className="flex flex-col bg-gray-800 p-4 rounded-lg">
            {renderToolDescription(toolName)}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
              onClick={() => handleToolClick(toolName)}
            >
              {expandedTool === toolName ? `Close ${toolName}` : `Open ${toolName}`}
            </button>
          </div>
        ))}
      </div>

      <div ref={toolContainerRef}>
        {expandedTool && renderToolComponent(expandedTool)}
      </div>
    </div>
  );
};

export default Tools;
