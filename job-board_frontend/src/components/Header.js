import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaUser, FaStar, FaBriefcase, FaIdCard, FaCog, FaQuestionCircle, FaLock } from 'react-icons/fa'; // Icons for messaging, notifications, and profile
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to handle profile dropdown

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle the profile dropdown visibility
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo"><a href="#">JobSphere</a></div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <a href="#">Home</a>
          <a href="#">Opinions on Companies</a>
          <a href="#">Salary Estimation</a>
        </nav>
      </div>

      <div className="header-right">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        
        {/* Profile icon with dropdown */}
        <div className="profile-container">
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <p className="user-email">tomgrosso@outlook.fr</p>
              <ul>
                <li><a href="#"><FaIdCard />Profil</a></li>
                <li><a href="#"><FaBriefcase /> Mes offres d'emploi</a></li>
                <li><a href="#"><FaStar /> Mes avis</a></li>
                <li><a href="#"><FaLock /> Ma démographie</a></li>
                <li><a href="#"><FaCog /> Paramètres</a></li>
                <li><a href="#"><FaQuestionCircle /> Centre d'aide</a></li>
                <li><a href="#"><FaLock /> Centre de confidentialité</a></li>
              </ul>
              <button className="logout-button">Déconnexion</button>
            </div>
          )}
        </div>

        <button className="cta-button">Entreprise / Publier une offre d'emploi</button>

        {/* Hamburger menu on the right */}
        <div className="hamburger" onClick={toggleNav}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
