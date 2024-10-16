import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaBell, FaUser, FaStar, FaBriefcase, FaIdCard, FaCog, FaQuestionCircle, FaLock } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './Header.css';

const Header = () => {
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

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {/* Link the logo to the JobAdList (Home) page */}
          <Link to="/">JobSphere</Link>
        </div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          {/* Link the Home option to the JobAdList (Home) page */}
          <Link to="/">Home</Link>
          {/* <a href="#">Opinions on Companies</a>
          <a href="#">Salary Estimation</a> */}
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
                <li><a href="#"><FaIdCard /> Profil</a></li>
                {/* <Link to={isLoggedIn ? '/Profile' : '/Login'}>
                    <FaIdCard /> Profil
                  </Link> */}
                {/* <li><a href="#"><FaBriefcase /> Mes offres d'emploi</a></li>
                <li><a href="#"><FaStar /> Mes avis</a></li>
                <li><a href="#"><FaLock /> Ma démographie</a></li>
                <li><a href="#"><FaCog /> Paramètres</a></li>
                <li><a href="#"><FaQuestionCircle /> Centre d'aide</a></li>
                <li><a href="#"><FaLock /> Centre de confidentialité</a></li> */}
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
