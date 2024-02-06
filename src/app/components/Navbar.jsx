"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "../constants";
import './styles/Navbar.css';

const Navbar = ({ loggedIn }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleLinkClick = (title) => {
    setActive(title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dashboardLink = loggedIn ? "Dashboard" : "Log In";
  const dashboardPath = loggedIn ? "/dashboard" : "/login";

  return (
    <nav className="navbar-container">
      <div className='navbar-content'>
        <Link href='/'>
          <div className='nav-logo' onClick={() => handleLinkClick('Home')}>
            <Image
              width={50}
              height={50}
              src='/assets/emfLogo.svg'
              alt='logo' 
            />
            <p className='nav-title'>
              <span className='md:block hidden'>El Mar Fitness</span>
              <span className='xs:block md:hidden'>EMF</span>
            </p>
          </div>
        </Link>

        <ul className='nav-links'>
          <li className={`${active === dashboardLink ? "text-white" : "text-gray-300"} hover:text-white sm:text-md md:text-[16px] font-medium cursor-pointer`}>
            <Link href={dashboardPath}>
              <div onClick={() => handleLinkClick(dashboardLink)}>{dashboardLink}</div>
            </Link>
          </li>
          {navLinks.filter(nav => nav.id !== "dashboard").map(nav => (
            <li key={nav.id} className={`${active === nav.title ? "navlinks-active" : "text-gray-300"}`}>
              <Link href={`/${nav.id}`}>
                <div onClick={() => handleLinkClick(nav.title)}>{nav.title}</div>
              </Link>
            </li>
          ))}
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
          <div className="nav-dropdown-menu">
            <ul className='nav-links-dropdown'>
              <li className={`${active === dashboardLink ? "navlinks-active" : "text-gray-300"}`}>
                <Link href={dashboardPath}>
                  <div onClick={() => {
                    setToggle(!toggle);
                    handleLinkClick(dashboardLink);
                  }}>{dashboardLink}</div>
                </Link>
              </li>
              {navLinks.filter(nav => nav.id !== "dashboard").map(nav => (
                <li key={nav.id} className={`${active === nav.title ? "navlinks-active" : "text-gray-300"}`}>
                  <Link href={`/${nav.id}`}>
                    <div onClick={() => {
                      setToggle(!toggle);
                      handleLinkClick(nav.title);
                    }}>{nav.title}</div>
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
