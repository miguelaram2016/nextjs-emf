import ContactForm from './components/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import "./styles/HomePage.css";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Miguel&apos;s knowledge in Kinesiology completely transformed my approach to fitness. I&apos;ve never felt stronger!",
  },
  {
    name: "James T.",
    text: "Lost 30 lbs in 4 months while building muscle. His evidence-based approach works. Highly recommend!",
  },
  {
    name: "Amanda L.",
    text: "Training with Miguel helped me recover from my injury stronger than before. He truly cares about your progress.",
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
            Get Strong, Get Fit
          </p>
          <p className="intro-text">
            Personalized Training Programs <br></br>
            1-on-1 Support <br></br>
            Train the Way You Want <br></br>
            Maintain a Healthy Lifestyle
          </p>
          <p className='founder-intro'>
            Reach your goals fast, without compromising safety <br></br>
            <span className='text-sm align-top'>-Miguel Ramirez</span>
          </p>
          <div className="hero-buttons">
            <Link href="/services" className="hero-cta-button primary">
              Book a Session
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