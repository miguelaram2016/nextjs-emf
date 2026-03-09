"use client"
import Link from 'next/link';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>El Mar Fitness</h3>
          <p>Evidence-based fitness consulting powered by Kinesiology.</p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Ready to get direction? Let's talk.</p>
          <a href="mailto:miguel@elmarfitness.com" className="footer-email">
            miguel@elmarfitness.com
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} El Mar Fitness. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
