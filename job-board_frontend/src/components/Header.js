import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaBell, FaUser, FaStar, FaBriefcase, FaIdCard, FaCog, FaQuestionCircle, FaLock } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './Header.css';

const Header = ({ setIsLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); // Reference to profile container

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close the profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler for Home click to set isLoggedIn to true
  const handleHomeClick = () => {
    setIsLoggedIn(true);
  };

  const handleProfile = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    console.log("toto")
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {/* Link the logo to the JobAdList (Home) page and set isLoggedIn to true */}
          <Link to="/" onClick={handleHomeClick}>JobSphere</Link>
        </div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          {/* Link the Home option to the JobAdList (Home) page and set isLoggedIn to true */}
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </nav>
      </div>

      <div className="header-right">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        
        {/* Profile icon with dropdown */}
        <div className="profile-container" ref={profileRef}>
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              {/* <p className="user-email">tomgrosso@outlook.fr</p> */}
              <ul>
                <li><a onClick={handleProfile}><FaIdCard /> Profil</a></li>
              </ul>
              <button className="logout-button">Déconnexion</button>
            </div>
          )}
        </div>

        <button className="cta-button">Entreprise / Publier une offre d'emploi</button>

        <div className="hamburger" onClick={toggleNav}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
