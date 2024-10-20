import React, { useState } from 'react';
import './Register.css'; // Import the CSS file for styling
import axios from 'axios';
import { FaPhone } from 'react-icons/fa';

const Register = ({ onRegister, onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();



    // Handle registration logic here
    const refistrationData = {
      name,
      email,
      phone,
      password,
      role: 'client',
    };
    //Requéte POST pour enregistrer l'utilisateur
    axios.post('http://127.0.01:5000/api/register', refistrationData)
      .then(response => {
        console.log('Inscription réussie:', response.data);
        onRegister();
      })
      .catch(error => {
        console.error('Error registering:', error);
        setError('Erreur lors de l\'enregistrement');
      }); 
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>S'inscrire</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Input with Icon */}
          <div className="input-group">
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="button_profil">S'inscrire</button>

          {/* Link to Login Page */}
          <p className="login-link" onClick={onShowLogin}>
            Déjà un compte ? Se connecter
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
