'use client';

import Image from 'next/image';
import { DumbbellIcon, BrainIcon, HeartIcon, TargetIcon, CalendarIcon, TrendingUpIcon } from '../components/Icons';
import './styles/About.css';

const storySections = [
  {
    icon: <BrainIcon />,
    title: "The Foundation",
    description: "Kinesiology graduate from Texas A&M, I've spent years studying the science of human movement.",
  },
  {
    icon: <TargetIcon />,
    title: "The Problem I Solve",
    description: "Most people don't need more motivation—they need a clear path. That's exactly what I provide.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "The Approach",
    description: "Direction over dedication. Cut through the noise and focus on what actually moves the needle.",
  },
];

const About = () => {
  return (
    <main className="about-container">
      <div className="about-hero">
        <div className="about-hero-background">
          <div className="about-orb-1"></div>
          <div className="about-orb-2"></div>
          <div className="about-grid-pattern"></div>
        </div>
        
        <div className="about-hero-content">
          <div className="about-badge">
            <span className="about-badge-dot"></span>
            Kinesiology Graduate
          </div>
          
          <h1 className="about-title">
            Hi, I'm <span className="text-gradient">Miguel Ramirez</span>
          </h1>
          <p className="about-subtitle">
            Fitness consultant who helps people get "pointed in the right direction."
          </p>
        </div>
      </div>

      <section className="about-story">
        <div className="section-container">
          <h2 className="section-title">My Story</h2>
          
          <div className="story-intro">
            <p>
              I've spent years studying movement, training, and what actually works for real people—not athletes, not gym rats, just everyday folks who want to feel better in their bodies.
            </p>
          </div>
          
          <div className="story-grid">
            {storySections.map((section, index) => (
              <div key={index} className="story-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="story-card-icon">
                  {section.icon}
                </div>
                <h3 className="story-card-title">{section.title}</h3>
                <p className="story-card-description">{section.description}</p>
              </div>
            ))}
          </div>
          
          <div className="story-cta">
            <p>
              Whether you're completely new to fitness or you've been training for years without seeing results, I'll help you cut through the noise.
            </p>
            <a href="/services" className="story-cta-button">
              Let's Get Direction
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="story-cta-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="section-container">
          <h2 className="section-title">What I Believe</h2>
          <div className="values-grid">
            <div className="value-card">
              <BrainIcon />
              <h3>Evidence-Based</h3>
              <p>No fads, no hype. Just science-backed methods that work.</p>
            </div>
            <div className="value-card">
              <HeartIcon />
              <h3>Human-Centered</h3>
              <p>Fitness that fits your life, not the other way around.</p>
            </div>
            <div className="value-card">
              <DumbbellIcon />
              <h3>Progress Over Perfection</h3>
              <p>Small consistent wins beat massive efforts that burn out.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="section-container">
          <h2>Ready to get pointed in the right direction?</h2>
          <a href="/services" className="cta-button">View Services</a>
        </div>
      </section>
    </main>
  );
};

export default About;
