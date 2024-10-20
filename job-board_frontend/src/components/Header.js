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

// import React, { useState, useEffect, useRef } from 'react';
// import { FaEnvelope, FaBell, FaUser, FaStar, FaBriefcase, FaIdCard, FaCog, FaQuestionCircle, FaLock, FaHamburger, FaAngleDoubleRight } from 'react-icons/fa'; 
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
// import './Header.css';

// const Header = ({onProfileClick, setIsLoggedIn}) => {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef(null); // Reference to profile container

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   // Close the profile dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleProfile = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(false);
//     console.log("toto")
//   }
//   return (
//     <header className="header">
//       <div className="header-left">
//         <div className="logo">
//           {/* Link the logo to the JobAdList (Home) page */}
//           <Link to="/">JobSphere</Link>
//         </div>
//         <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
//           {/* Link the Home option to the JobAdList (Home) page */}
//           {/* <Link to="/"></Link> */}
//           <a onClick={onProfileClick}>Offres / Profil</a>
//           {/* <a href="#">Opinions on Companies</a>
//           <a href="#">Salary Estimation</a> */}
//         </nav>
//       </div>

//       <div className="header-right">
//         <FaEnvelope className="icon" />
//         <FaBell className="icon" />
        
//         {/* Profile icon with dropdown */}
//         <div className="profile-container" ref={profileRef}>
//           <div className="icon profile-icon" onClick={toggleProfile}> ☰ </div>
//           {isProfileOpen && (
//             <div className="profile-dropdown">
//               {/* <p className="user-email">tomgrosso@outlook.fr</p> */}
//               <ul>
//                 <li><a onClick={onProfileClick}>Offres / Profil</a></li>
//                 {/* <Link to={isLoggedIn ? '/Profile' : '/Login'}>
//                     <FaIdCard /> Profil
//                   </Link> */}
//                 {/* <li><a href="#"><FaBriefcase /> Mes offres d'emploi</a></li>
//                 <li><a href="#"><FaStar /> Mes avis</a></li>
//                 <li><a href="#"><FaLock /> Ma démographie</a></li>
//                 <li><a href="#"><FaCog /> Paramètres</a></li>
//                 <li><a href="#"><FaQuestionCircle /> Centre d'aide</a></li>
//                 <li><a href="#"><FaLock /> Centre de confidentialité</a></li> */}
//               </ul>
//               <button className="logout-button">Déconnexion</button>
//             </div>
//           )}
//         </div>

//         <button className="cta-button">Entreprise / Publier une offre d'emploi</button>

//         <div className="hamburger" onClick={toggleNav}>
//           ☰
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
