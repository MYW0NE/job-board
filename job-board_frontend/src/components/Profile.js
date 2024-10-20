// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import './Profile.css'; // Import the new CSS styles for the Profile component

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userData, setUserData] = useState({
    Nom: '',
    password: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:5000/api/user-profile')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Erreur lors du chargement du profil :', error);
        });
    }
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put('http://localhost:5000/api/user-profile', userData);
      setUserData(response.data);
      setEditMode(false);
      setError('');
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      setError('Impossible de mettre à jour le profil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const showRegister = () => {
    setIsRegistering(true);
    setIsForgotPassword(false);
  };

  const showLogin = () => {
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const showForgotPassword = () => {
    setIsForgotPassword(true);
    setIsRegistering(false);
  };

  const resetToLogin = () => {
    setIsForgotPassword(false);
    setIsRegistering(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        {isRegistering ? (
          <Register onRegister={handleRegister} onShowLogin={showLogin} />
        ) : isForgotPassword ? (
          <ForgotPassword 
            onReset={resetToLogin} 
            onLogin={showLogin} 
            onRegister={showRegister} 
          />
        ) : (
          <Login 
            onLogin={handleLogin} 
            onShowRegister={showRegister} 
            onForgotPassword={showForgotPassword} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Votre Profil</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {editMode ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="Nom"
              value={userData.firstName}
              onChange={handleInputChange}
              required
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="text"
              name="password"
              value={userData.lastName}
              onChange={handleInputChange}
              required
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="profile-input"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
          </button>
          <button type="button" onClick={() => setEditMode(false)}>
            Annuler
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Nom :</strong> {userData.firstName}</p>
          <p><strong>Mot de passe :</strong> {userData.lastName}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          <p><strong>Téléphone :</strong> {userData.phone}</p>
          <button onClick={() => setEditMode(true)}>
            Modifier le Profil
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
