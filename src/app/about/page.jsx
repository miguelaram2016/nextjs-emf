import React from 'react';
import Image from 'next/image';
import ContactForm from '../components/ContactForm.jsx';

const About = () => {
  return (
    <main className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/mar.png"
            alt="Miguel Ramirez"
            className="rounded-full mb-8"
            width={128}
            height={128}
          />
          <h1 className="text-4xl font-bold text-white mb-6">I Help People Who Feel Stuck Get Direction</h1>
          <p className="text-lg text-white mb-6">
            I'm Miguel Ramirez — Kinesiology graduate, fitness consultant, and founder of El Mar Fitness. I don't believe in cookie-cutter programs or locking you into long-term contracts. I believe in giving you the direction you need to train with confidence.
          </p>
          <p className="text-lg text-white mb-6">
            Whether you're recovering from an injury, getting back into fitness after a break, or just overwhelmed by all the conflicting advice out there — I'll help you figure it out. My approach combines Kinesiology-based movement science with practical, sustainable training methods. No hype. No fad diets. Just what works for *you*.
          </p>
          <p className="text-lg text-white mb-6">
            I've helped people of all ages and fitness levels build strength, lose weight, and feel better in their bodies. My goal isn't to be your forever trainer — it's to give you the tools and knowledge to train smarter, not harder.
          </p>
        </div>
      </div>
      <ContactForm />
    </main>
  );
};

export default About;
