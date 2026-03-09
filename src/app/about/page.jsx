import React from 'react';
import Image from 'next/image';
import ContactForm from '../components/ContactForm.jsx';

const About = () => {
  return (
    <main className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/images/mar.png"
            alt="Miguel Ramirez"
            className="rounded-full mb-8"
            width={160}
            height={160}
          />
          <h1 className="text-4xl font-bold text-white mb-4">I Help People Who Feel Stuck Get Direction</h1>
          <p className="text-xl text-blue-400">Fitness Consultant | Kinesiology | El Mar Fitness</p>
        </div>

        {/* My Journey Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">My Journey</h2>
          <div className="text-lg text-gray-300 space-y-4">
            <p>
              I played soccer in high school, along with tennis and cross country. But I was never the most "in shape" kid on the team. My coaches mostly used a boot camp approach — lots of yelling, running laps, pushups. It never worked for me.
            </p>
            <p>
              I wanted to <em>learn</em>. I wanted to understand <em>why</em> certain exercises made me better, not just get yelled at for not running fast enough. The coaches didn't focus on mechanics, on proper conditioning, on the science behind it all. It felt like I was just "playing" rather than actually <em>practicing</em> and improving.
            </p>
            <p>
              In college, I knew I needed to make a change. My health was struggling, and I decided it was time to take control. That's when I discovered strength training — and it changed my life.
            </p>
            <p>
              I was originally an Electrical and Computer Engineering major. But halfway through, I switched to a health track. I thought I'd go into physical therapy, but I realized I wanted to help people <em>before</em> they needed medical intervention — and without the corporate overhead. That's when I chose Kinesiology.
            </p>
            <p>
              <strong>Today, I focus on:</strong> Strength training, powerbuilding, powerlifting, bodybuilding — anything that improves bone density and builds muscle mass. I also incorporate light cardio for heart health, but the heavy lifting is where the real results are.
            </p>
          </div>
        </section>

        {/* What Makes Me Different */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why My Approach Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">🎓 Education</h3>
              <p className="text-gray-300">
                I have a B.S. in Kinesiology — most trainers don't have a formal degree. I chose the health track because I wanted to help others in an educated, evidence-based way.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">🔧 Engineering Mindset</h3>
              <p className="text-gray-300">
                My engineering background means I like to find the underlying mechanics. I break things down bit by bit to understand the nature of movement — no guesswork, just mechanics.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">🤖 AI + Human Expertise</h3>
              <p className="text-gray-300">
                I work with AI tools to enhance my coaching, but I always conduct my own research. An AI can answer many questions — but do you really want to risk hallucinations when it comes to your health?
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">� MAR = The Sea</h3>
              <p className="text-gray-300">
                "El Mar" means "the sea" in Spanish. MAR are my initials. I speak Spanish fluently and bring that cultural connection to my coaching.
              </p>
            </div>
          </div>
        </section>

        {/* Who I Help */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Who I Help</h2>
          <p className="text-lg text-gray-300 mb-4">
            I help <strong>anyone who needs direction</strong> and wants help from an educated, evidence-based coach. Whether you're:
          </p>
          <ul className="text-lg text-gray-300 space-y-2 list-disc list-inside">
            <li>Coming back from an injury and don't know where to start</li>
            <li>Overwhelmed by conflicting fitness advice online</li>
            <li>Someone who's tried everything but nothing sticks</li>
            <li>Too busy for hours at the gym but want results</li>
            <li>Just want someone to point them in the right direction</li>
          </ul>
        </section>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">My Philosophy</h2>
          <div className="bg-gradient-to-r from-blue-900 to-gray-800 p-8 rounded-lg">
            <p className="text-xl text-white italic text-center">
              "I don't believe in cookie-cutter programs or locking you into long-term contracts. 
              My goal isn't to be your forever trainer — it's to give you the tools and knowledge 
              to train smarter, not harder."
            </p>
            <p className="text-center text-blue-400 mt-4">— Miguel Ramirez</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-12">
          <p className="text-lg text-gray-300 mb-6">
            Ready to get pointed in the right direction?
          </p>
          <a 
            href="/services" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View My Programs
          </a>
        </section>

      </div>
      <ContactForm />
    </main>
  );
};

export default About;
