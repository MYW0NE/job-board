import React, { useState } from 'react';
import './ForgotPassword.css'; // Import the CSS

const ForgotPassword = ({ onReset, onLogin, onRegister }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log('Reset link sent to:', email);
    alert(`A password reset link has been sent to ${email}`);
    onReset(); // Call the reset function to go back to login or register page
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Mot de passe oublié</h2>
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
          <button type="submit" className="button_profil">Envoyer le lien de réinitialisation</button>
        </form>

        {/* Navigation Links */}
        <div className="login-register-links">
          <p className="back-to-login" onClick={onLogin}>
            Se connecter
          </p>
          <p className="register-link" onClick={onRegister}>
            Pas de compte ? S'enregistrer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
