"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './styles/Footer.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
              width={40}
              height={40}
              src='/assets/emfLogo.svg'
              alt='El Mar Fitness Logo'
              className="footer-logo-img"
            />
            <span className="footer-brand-name">El Mar Fitness</span>
          </Link>
          <p className="footer-brand-tagline">
            Evidence-based fitness consulting powered by Kinesiology.
          </p>
          <div className="footer-socials">
            <a href="mailto:mramirez@elmarfitness.com" className="footer-social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        
        <div className="footer-links-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link href="/services#in-person">Fitness Direction</Link></li>
            <li><Link href="/services#in-person">Fitness Guide</Link></li>
            <li><Link href="/services#online">Training Partner</Link></li>
            <li><Link href="/services#online">Meal Planning</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4 className="footer-heading">Let's Connect</h4>
          <p className="footer-contact-text">Ready to get direction? I'd love to hear from you.</p>
          <a href="mailto:mramirez@elmarfitness.com" className="footer-email">
            mramirez@elmarfitness.com
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} El Mar Fitness. All rights reserved.</p>
        <p className="footer-credits">Built with precision in Austin, TX</p>
      </div>
    </footer>
  );
};

export default Footer;
