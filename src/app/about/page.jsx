import React from 'react';
import Image from 'next/image';
import ContactForm from '../components/ContactForm.jsx';

const About = () => {
  return (
    <main className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/mar.png" // Adjust the path to your image in the public folder
            alt="Miguel Ramirez"
            className="rounded-full mb-8"
            width={128} // Width of the image
            height={128} // Height of the image
          />
          <h1 className="text-4xl font-bold text-white mb-6">Miguel Ramirez: Your Partner in Fitness</h1>
          <p className="text-lg text-white mb-6">
            At El Mar Fitness, founded by Miguel Ramirez, we specialize in evidence-based practices to guide you on your journey to a healthier life. Whether you&apos;re recovering from an injury, aiming to lose weight, build muscle, or gain strength, our personalized programs are designed to meet your unique needs.
          </p>
          <p className="text-lg text-white mb-6">
            Miguel&apos;s expertise in Kinesiology and use of research-backed and AI-enhanced training techniques ensure safe, effective, and transformative workouts. Join our community and experience a training environment that not only challenges but also inspires.
          </p>
        </div>
      </div>
      <ContactForm />
    </main>
  );
};

export default About;
