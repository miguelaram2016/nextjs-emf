"use client"
import { useState } from 'react';
import Link from 'next/link';
import { MaxSingle, OneRepMaxCalc } from './workoutUtils';
import SquatFreeBody  from './SquatFreeBody';
import { MacronutrientCalc, BMICalculator, TDEECalc, HealthyTips } from './nutritionUtils/';
import SearchExercises from './trainingUtils/SearchExercises';
import CreateExercise from './trainingUtils/CreateExercise';
import TrainingPrograms from './TrainingPrograms';
import { DumbbellIcon, FlameIcon, SearchIcon, PencilIcon, ClipboardIcon, ZapIcon, BarChartIcon, SaladIcon, CalculatorIcon } from '../components/Icons';
import './Tools.css';

const trainingTools = [
  { id: 'OneRepMaxCalc', title: '1RM Calculator', description: 'Estimate your one rep max from submaximal loads.', icon: CalculatorIcon },
  { id: 'MaxSingle', title: 'Max Single Protocol', description: 'Warm-up protocol for testing your 1RM safely.', icon: FlameIcon },
  { id: 'SearchExercises', title: 'Exercise Search', description: 'Search a database of exercises with descriptions and videos.', icon: SearchIcon },
  { id: 'CreateExercise', title: 'Create Exercise', description: 'Build custom exercises for your workouts.', icon: PencilIcon },
  { id: 'TrainingPrograms', title: 'Training Programs', description: 'Browse pre-built training programs.', icon: ClipboardIcon },
];

const nutritionTools = [
  { id: 'TDEECalc', title: 'TDEE Calculator', description: 'Find your Total Daily Energy Expenditure.', icon: ZapIcon, link: '/tools/tdee-calculator' },
  { id: 'BMICalculator', title: 'BMI Calculator', description: 'Check your Body Mass Index.', icon: BarChartIcon, link: '/tools/bmi-calculator' },
  { id: 'MacronutrientCalc', title: 'Macro Calculator', description: 'Calculate your ideal protein, carbs, and fats.', icon: SaladIcon, link: '/tools/macro-calculator' },
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
      className={`tool-card ${expandedTool === tool.id ? 'tool-card-expanded' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => tool.link ? null : setExpandedTool(expandedTool === tool.id ? null : tool.id)}
    >
      <div className="tool-card-header">
        {tool.link ? (
          <Link href={tool.link} className="tool-card-icon-link">
            <div className="tool-card-icon">
              <tool.icon />
            </div>
          </Link>
        ) : (
          <div className="tool-card-icon">
            <tool.icon />
          </div>
        )}
        <div className="tool-card-info">
          {tool.link ? (
            <Link href={tool.link}>
              <h3 className="tool-card-title">{tool.title}</h3>
            </Link>
          ) : (
            <h3 className="tool-card-title">{tool.title}</h3>
          )}
          <p className="tool-card-description">{tool.description}</p>
        </div>
        {!tool.link && (
          <div className={`tool-card-chevron ${expandedTool === tool.id ? 'expanded' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
      {!tool.link && expandedTool === tool.id && (
        <div className="tool-content">
          {renderToolComponent(tool.id)}
        </div>
      )}
    </div>
  );

  return (
    <main className="tools-page">
      {/* Hero Section */}
      <section className="tools-hero">
        <div className="tools-hero-bg">
          <div className="tools-orb-1"></div>
          <div className="tools-orb-2"></div>
        </div>
        <div className="tools-hero-content">
          <h1 className="tools-title">
            Free Fitness <span className="text-gradient">Tools</span>
          </h1>
          <p className="tools-subtitle">
            Calculate, track, and optimize your fitness journey — completely free.
          </p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-content">
        <div className="section-container">
          {/* Training Tools */}
          <div className="tools-section">
            <h2 className="tools-section-title">
              <span className="tools-section-icon">🏋️</span>
              Training Tools
            </h2>
            <div className="tools-grid">
              {trainingTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>

          {/* Nutrition Tools */}
          <div className="tools-section">
            <h2 className="tools-section-title">
              <span className="tools-section-icon">🥗</span>
              Nutrition Tools
            </h2>
            <div className="tools-grid">
              {nutritionTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>

          {/* Healthy Tips */}
          <div className="tools-section">
            <HealthyTips />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tools;
