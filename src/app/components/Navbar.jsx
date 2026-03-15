"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "../constants";
import './styles/Navbar.css';

const Navbar = ({ loggedIn }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (title) => {
    setActive(title);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const dashboardLink = loggedIn ? "Dashboard" : "Log In";
  const dashboardPath = loggedIn ? "/dashboard" : "https://temp-kinetic.vercel.app/";

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className='navbar-content'>
        <Link href='/' className="nav-logo-link">
          <div className='nav-logo' onClick={() => handleLinkClick('Home')}>
            <Image
              width={50}
              height={50}
              src='/assets/emfLogo.svg'
              alt='logo' 
              className="nav-logo-img"
            />
            <p className='nav-title'>
              <span className='md:block hidden'>El Mar Fitness</span>
              <span className='xs:block md:hidden'>EMF</span>
            </p>
          </div>
        </Link>

        <ul className='nav-links'>
          {navLinks.filter(nav => nav.id !== "dashboard").map(nav => (
            <li key={nav.id} className={`nav-link-item ${active === nav.title ? 'active' : ''}`}>
              <Link href={`/${nav.id}`}>
                <span onClick={() => handleLinkClick(nav.title)}>{nav.title}</span>
              </Link>
            </li>
          ))}
          <li className="nav-link-item login-link">
            <Link href={dashboardPath}>
              <span onClick={() => handleLinkClick(dashboardLink)}>{dashboardLink}</span>
            </Link>
          </li>
        </ul>

        <div className='nav-button' onClick={() => setToggle(!toggle)}>
          <Image
            src={toggle ? '/assets/close.svg' : '/assets/menu.svg'}
            height={50}
            width={50}
            alt='menu'
            className='nav-button-img'
          />
        </div>
        
        {toggle && (
          <div className="nav-dropdown-menu glass">
            <ul className='nav-links-dropdown'>
              <li className="nav-dropdown-item">
                <Link href={dashboardPath}>
                  <span onClick={() => {
                    setToggle(!toggle);
                    handleLinkClick(dashboardLink);
                  }}>{dashboardLink}</span>
                </Link>
              </li>
              {navLinks.filter(nav => nav.id !== "dashboard").map(nav => (
                <li key={nav.id} className="nav-dropdown-item">
                  <Link href={`/${nav.id}`}>
                    <span onClick={() => {
                      setToggle(!toggle);
                      handleLinkClick(nav.title);
                    }}>{nav.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
