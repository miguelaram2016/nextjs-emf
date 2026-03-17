import ContactForm from './components/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import "./styles/HomePage.css";

const testimonials = [
  {
    name: "Natalie D.",
    text: "\"Gains by Miguel\"",
  },
  {
    name: "Michele Y.",
    text: "\"I feel like I haven't aged at all and we've been working together for 2 years already.\"",
  },
  {
    name: "Robert R.",
    text: "\"I feel stronger, lighter. I am really liking who I see in the mirror!\"",
  },
];

const HomePage = () => {
  return (
    <main className='home-container'>
      {/* Hero Section - Jaw Dropping */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient-orb hero-orb-1"></div>
          <div className="hero-gradient-orb hero-orb-2"></div>
          <div className="hero-grid-pattern"></div>
          <div className="hero-noise"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Evidence-Based Fitness
          </div>
          
          <h1 className="hero-title">
            Not Sure Where to <span className="text-gradient">Start?</span>
            <br />I'll Help You Figure It Out.
          </h1>
          
          <p className="hero-subtitle">
            <span className="hero-subtitle-item">Fitness Consulting + Personalized Programs</span>
            <span className="hero-separator">•</span>
            <span className="hero-subtitle-item">Direction When You Need It</span>
            <span className="hero-separator">•</span>
            <span className="hero-subtitle-item">No Long-Term Commitment</span>
          </p>
          
          <div className="hero-buttons">
            <Link href="/services" className="hero-cta-button primary">
              Get Direction
              <svg className="hero-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="https://temp-kinetic.vercel.app/auth/signup" className="hero-cta-button accent" target="_blank" rel="noopener noreferrer">
              Start Your Training
              <svg className="hero-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/tools" className="hero-cta-button secondary">
              Free Tools
            </Link>
          </div>
          
          <div className="hero-founder">
            <div className="hero-founder-image">
              <Image 
                src="/images/mar.png" 
                alt="Miguel Ramirez" 
                width={60} 
                height={60}
                className="founder-avatar"
                unoptimized
              />
            </div>
            <div className="hero-founder-text">
              <p>I help people who feel stuck or overwhelmed get pointed in the right direction.</p>
              <span className="hero-founder-name">— Miguel Ramirez, Kinesiology</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="hero-scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Clients Transformed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Personalized Approach</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-heading">What Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="testimonial-quote-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-name">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="who-section">
        <div className="section-container">
          <h2 className="section-heading">Who Is This For?</h2>
          <div className="who-grid">
            <div className="who-card">
              <div className="who-icon">🤷</div>
              <h3>You've Tried Everything</h3>
              <p>You've cycled through diets, programs, and gadgets — nothing sticks. You need a plan that actually fits your life.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">⏰</div>
              <h3>Time Is Your Constraint</h3>
              <p>You don't have hours to spend at the gym. You need efficient, effective training that works with your schedule.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🎯</div>
              <h3>You Just Need Direction</h3>
              <p>You don't need a babysitter — you need someone to point you in the right direction and build you a roadmap.</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🏥</div>
              <h3>Recovering or Restarting</h3>
              <p>You're coming back from an injury or a long break, and you need safe, smart guidance to get back on track.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="section-container">
          <h2 className="section-heading">How It Works</h2>
          <div className="how-steps">
            <div className="how-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Share Your Goals</h3>
                <p>Tell me about where you are now, where you want to go, and any constraints you have (time, equipment, injuries).</p>
              </div>
            </div>
            <div className="how-connector"></div>
            <div className="how-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Get Your Roadmap</h3>
                <p>I build a personalized program tailored to your situation — not some generic template from the internet.</p>
              </div>
            </div>
            <div className="how-connector"></div>
            <div className="how-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Train with Confidence</h3>
                <p>You get everything you need to succeed: exercises, sets, reps, and the strategy to make progress.</p>
              </div>
            </div>
          </div>
          <div className="how-cta">
            <Link href="/services" className="hero-cta-button primary">
              Get Your Direction
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="tools-section">
        <div className="section-container">
          <div className="tools-content">
            <h2 className="section-heading">Free Fitness Tools</h2>
            <p className="tools-subtext">
              Calculate your BMI, find your ideal calorie intake, or build custom workouts — all free.
            </p>
            <Link href="/tools" className="hero-cta-button primary">
              Try Free Tools
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>  
  )
}

export default HomePage
