import React, { useState } from 'react';
import './Register.css'; // Import the CSS file for styling
import { FaPhone } from 'react-icons/fa';

const Register = ({ onRegister, onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    // Handle registration logic here
    console.log('Registered with:', {
      email,
      name,
      lastName,
      phoneNumber,
      password,
    });
    
    // Call this function on successful registration
    onRegister(); 
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
              placeholder="Prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Nom de famille"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Input with Icon */}
          <div className="input-group">
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={phoneNumber}
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

          {/* Confirm Password Input */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
