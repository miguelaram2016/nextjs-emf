"use client"
import { useRef } from 'react';
import Image from 'next/image';
import { services } from './Services';
import './Services.css';

const Services = () => {
  const inPersonRef = useRef(null);
  const onlineRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const renderServiceCards = (classification) => {
    return services
      .filter(service => service.classification === classification)
      .map((service, index) => (
        <div key={service.name} className="services-card" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="service-card-header">
            <div className="service-icon">
              {service.Icon && <service.Icon />}
            </div>
            <div className="service-badge">{classification === 'in-person' ? 'In-Person' : 'Online'}</div>
          </div>
          
          <div className="service-image-container">
            <Image 
              src={`/services${service.image}`} 
              alt={service.service} 
              width={400}
              height={200}
              className="service-image"
              unoptimized
            />
            <div className="service-image-overlay"></div>
          </div>
          
          <div className="service-content">
            <h2>{service.service}</h2>
            <div className="service-price">{service.price}</div>
            <p className="service-description">{service.description}</p>
            
            {service.highlights && (
              <ul className="service-highlights">
                {service.highlights.map((highlight, i) => (
                  <li key={i}>
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            
            <a href={service.bookingLink} target="_blank" rel="noopener noreferrer" className="service-cta">
              {service.bookingLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      ));
  };

  return (
    <main className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <div className="hero-orb-1"></div>
          <div className="hero-orb-2"></div>
        </div>
        
        <div className="services-hero-content">
          <h1 className="services-title">Fitness Programs</h1>
          <p className="services-description">
            Whether you just need direction or want ongoing support, I build personalized programs 
            that fit your life — not the other way around. No gym membership required. No long-term lock-ins.
          </p>
          
          <div className="services-tabs">
            <button onClick={() => scrollToRef(inPersonRef)} className="services-tab active">
              One-Time
            </button>
            <button onClick={() => scrollToRef(onlineRef)} className="services-tab">
              Ongoing
            </button>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="services-section" ref={inPersonRef} id="in-person">
        <div className="services-container">
          <h2 className="services-section-title">
            <span className="title-accent">One-Time</span> Programs
          </h2>
          <p className="services-section-desc">Perfect for when you need a roadmap but want to train independently.</p>
          
          <div className="services-grid">
            {renderServiceCards('in-person')}
          </div>
        </div>
      </section>

      <section className="services-section" ref={onlineRef} id="online">
        <div className="services-container">
          <h2 className="services-section-title">
            <span className="title-accent">Ongoing</span> Coaching
          </h2>
          <p className="services-section-desc">Full support for serious athletes who want consistent guidance.</p>
          
          <div className="services-grid">
            {renderServiceCards('online')}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="services-guarantee">
        <div className="guarantee-content">
          <div className="guarantee-icon">✓</div>
          <h3>100% Satisfaction Guarantee</h3>
          <p>Not sure if we're the right fit? Book a free 15-minute discovery call to see if my approach works for you.</p>
        </div>
      </section>
    </main>
  );
};

export default Services;
