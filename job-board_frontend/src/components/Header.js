import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaBell, FaUser } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, onLoginClick, onLogout, onProfileClick, onHomeClick }) => { // Ajout de onHomeClick
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
        <div className="logo">
          {/* Lien vers la page d'accueil avec onHomeClick */}
          <Link to="/" onClick={onHomeClick}>JobSphere</Link> {/* Clic sur "Home" */}
        </div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <Link to="/" onClick={onHomeClick}>Home</Link> {/* Clic sur "Home" */}
        </nav>
      </div>

      <div className="header-right">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        
        <div className="profile-container" ref={profileRef}>
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
          {isProfileOpen && (
            <div className="profile-dropdown">
              {isLoggedIn ? (
                <>
                  <ul>
                    <li><a href="#" onClick={onProfileClick}>Profil</a></li> {/* Clic pour afficher le profil */}
                  </ul>
                  <button className="logout-button" onClick={onLogout}>Déconnexion</button>
                </>
              ) : (
                <button className="login-button" onClick={onLoginClick}>Connexion</button>
              )}
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
