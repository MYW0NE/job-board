import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaBell, FaUser, FaStar, FaBriefcase, FaIdCard, FaCog, FaQuestionCircle, FaLock } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); 

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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
        <div className="logo"><Link to="/">JobSphere</Link></div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/opinions">Opinions on Companies</Link>
          <Link to="/salary-estimation">Salary Estimation</Link>
        </nav>
      </div>

      <div className="header-right">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        
        <div className="profile-container" ref={profileRef}>
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <p className="user-email">tomgrosso@outlook.fr</p>
              <ul>
                <li><Link to="/profile"><FaIdCard /> Profil</Link></li>
                <li><Link to="/my-jobs"><FaBriefcase /> Mes offres d'emploi</Link></li>
                <li><Link to="/my-reviews"><FaStar /> Mes avis</Link></li>
                <li><Link to="/demographics"><FaLock /> Ma démographie</Link></li>
                <li><Link to="/settings"><FaCog /> Paramètres</Link></li>
                <li><Link to="/help"><FaQuestionCircle /> Centre d'aide</Link></li>
                <li><Link to="/privacy"><FaLock /> Centre de confidentialité</Link></li>
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
