"use client"
import { useRef } from 'react';
import Image from 'next/image';
import { services } from './Services'; // Adjust the import path as necessary
import './Services.css';

const Services = () => {
  const renderServiceCards = (classification) => {
    return services
      .filter(service => service.classification === classification)
      .map(service => (
        <div key={service.name} className="services-card">
          <Image 
            src={`/services${service.image}`} 
            alt={service.service} 
            width={100} // Adjust as needed
            height={100} // Adjust as needed
            unoptimized
          />
          <h2>{service.service}</h2>
          <p>{service.price}</p>
          <p>{service.description}</p>
          <a href={service.bookingLink} target="_blank" rel="noopener noreferrer">
            {service.bookingLabel}
          </a>
        </div>
      ));
  };

  const inPersonRef = useRef(null);
  const onlineRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop + 25,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="services-container">
      <div className="services-services">
        <h1 className="services-header">Training Services</h1>
        <div className="service-buttons">
          <button onClick={() => scrollToRef(inPersonRef)} className="service-button">In-Person</button>
          <button onClick={() => scrollToRef(onlineRef)} className="service-button">Online</button>
        </div>
        <p className="services-header-description">
          Transform your fitness journey with personalized training support. Dedicated to crafting personalized experiences that cater to your unique goals, be it recovery, weight management, muscle building, or strength enhancement, discover the luxury of customized fitness.
        </p>
        <div ref={inPersonRef} id="in-person-services" className="services-cards">
          {renderServiceCards('in-person')}
        </div>

        <div ref={onlineRef} id="online-services" className="services-cards">
          {renderServiceCards('online')}
        </div>
      </div>
    </main>
  );
};

export default Services;
