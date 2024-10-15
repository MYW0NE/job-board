// src/components/ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css'; // Import any CSS for styling

const ForgotPassword = ({ onReset }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Reset link sent to:', email);
    alert(`A password reset link has been sent to ${email}`);
    onReset(); // Call this function to return to the login/register page
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
      </div>
    </div>
  );
};

export default ForgotPassword;
