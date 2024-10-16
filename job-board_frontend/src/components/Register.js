import React, { useState } from 'react';
import './Register.css'; // Import the CSS file for styling
import { FaPhone } from 'react-icons/fa';

const Register = ({ onRegister, onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    // Handle registration logic here
    console.log('Registered with Email:', email);
    // Mockup for demo purposes; replace with actual registration logic
    onRegister(); // Call this function on successful registration
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>S'inscrire</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* <div className="input-group">
            <input
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="last_name"
              placeholder="last_name"
              value={lastname}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="phone_number"
              placeholder="phone_number"
              value={FaPhone}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button_profil">S'inscrire</button>

          {/* Link to switch to login page */}
          <p className="login-link" onClick={onShowLogin}>
            Déjà un compte ? Se connecter
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
