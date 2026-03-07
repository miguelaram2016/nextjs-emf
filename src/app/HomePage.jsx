import ContactForm from './components/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import "./styles/HomePage.css";

// eslint-disable-next-line react/no-unescaped-entities
const testimonials = [
  {
    name: "Natalie D.",
    text: "Gains by Miguel",
  },
  {
    name: "Michele Y.",
    text: "I feel like I haven't aged at all and we've been working together for 2 years already.",
  },
  {
    name: "Robert R.",
    text: "I feel stronger, lighter. I am really liking who I see in the mirror!",
  },
];

const HomePage = () => {
  return (
    <main className='home-container'>
      <div className='intro-section'>
        <div className='background-image-container'>
          <Image 
            src='/images/mar.png' 
            alt='emfBeach' 
            height={1000}
            width={1000}
            className='background-image'
          >
          </Image>
        </div>
        <div className='intro-text-container'>
          <p className='intro-heading'>
            Not Sure Where to Start? I'll Help You Figure It Out.
          </p>
          <p className="intro-text">
            Fitness Consulting + Personalized Programs <br></br>
            Direction When You Need It <br></br>
            No Long-Term Commitment Required <br></br>
            Evidence-Based. Kinesiology-Backed.
          </p>
          <p className='founder-intro'>
            I help people who feel stuck or overwhelmed get pointed in the right direction — whether you're starting out or getting back after a break. <br></br>
            <span className='text-sm align-top'>- Miguel Ramirez, Kinesiology</span>
          </p>
          <div className="hero-buttons">
            <Link href="/services" className="hero-cta-button primary">
              Get Direction
            </Link>
            <Link href="/tools" className="hero-cta-button secondary">
              Free Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="testimonials-heading">What Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">&quot;{testimonial.text}&quot;</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="who-is-this-for-section">
        <h2 className="who-is-this-for-heading">Who Is This For?</h2>
        <div className="who-is-this-for-grid">
          <div className="who-is-this-for-card">
            <span className="who-is-this-for-icon">🤷</span>
            <h3>You've Tried Everything</h3>
            <p>You've cycled through diets, programs, and gadgets — nothing sticks. You need a plan that actually fits your life.</p>
          </div>
          <div className="who-is-this-for-card">
            <span className="who-is-this-for-icon">⏰</span>
            <h3>Time Is Your Constraint</h3>
            <p>You don't have hours to spend at the gym. You need efficient, effective training that works with your schedule.</p>
          </div>
          <div className="who-is-this-for-card">
            <span className="who-is-this-for-icon">🎯</span>
            <h3>You Just Need Direction</h3>
            <p>You don't need a babysitter — you need someone to point you in the right direction and build you a roadmap.</p>
          </div>
          <div className="who-is-this-for-card">
            <span className="who-is-this-for-icon">🏥</span>
            <h3>Recovering or Restarting</h3>
            <p>You're coming back from an injury or a long break, and you need safe, smart guidance to get back on track.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="how-it-works-heading">How It Works</h2>
        <div className="how-it-works-steps">
          <div className="how-it-works-step">
            <div className="step-number">1</div>
            <h3>Share Your Goals</h3>
            <p>Tell me about where you are now, where you want to go, and any constraints you have (time, equipment, injuries).</p>
          </div>
          <div className="how-it-works-step">
            <div className="step-number">2</div>
            <h3>Get Your Roadmap</h3>
            <p>I build a personalized program tailored to your situation — not some generic template from the internet.</p>
          </div>
          <div className="how-it-works-step">
            <div className="step-number">3</div>
            <h3>Train with Confidence</h3>
            <p>You get everything you need to succeed: exercises, sets, reps, and the strategy to make progress.</p>
          </div>
        </div>
        <div className="how-it-works-cta">
          <Link href="/services" className="hero-cta-button primary">
            Get Your Direction
          </Link>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="tools-preview-section">
        <h2 className="tools-preview-heading">Free Fitness Tools</h2>
        <p className="tools-preview-subtext">
          Calculate your BMI, find your ideal calorie intake, or build custom workouts — all free.
        </p>
        <Link href="/tools" className="hero-cta-button primary">
          Try Free Tools
        </Link>
      </section>

      <ContactForm />
    </main>  
  )
}

export default HomePage