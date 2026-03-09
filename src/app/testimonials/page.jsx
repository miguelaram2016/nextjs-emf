import React from 'react';
import TestimonialForm from '../components/TestimonialForm';

export const metadata = {
  title: 'Testimonials | El Mar Fitness',
  description: 'See what clients say about El Mar Fitness. Share your own experience.',
};

const Testimonials = () => {
  return (
    <main className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">What Clients Say</h1>
          <p className="text-xl text-gray-300">
            Real results from real people
          </p>
        </div>

        {/* Existing Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">"Gains by Miguel 💪"</p>
            <p className="text-blue-400 font-medium">- Natalie D.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">"I feel like I haven't aged at all and we've been working together for 2 years already."</p>
            <p className="text-blue-400 font-medium">- Michele Y.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">"I feel stronger, lighter. I am really liking who I see in the mirror!"</p>
            <p className="text-blue-400 font-medium">- Robert R.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-300 mb-4">"Miguel's knowledge in Kinesiology completely transformed my approach to fitness. I've never felt stronger!"</p>
            <p className="text-blue-400 font-medium">- Sarah M.</p>
          </div>
        </div>

        {/* Submit Testimonial Section */}
        <div className="bg-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Share Your Experience
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Have you worked with El Mar Fitness? Share your results and experience below.
            Your testimonial will be reviewed before being posted.
          </p>
          <TestimonialForm />
        </div>

      </div>
    </main>
  );
};

export default Testimonials;
