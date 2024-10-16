import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = ({ onLogin, onShowRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    // Mockup for demo purposes; replace with actual login logic
    if (email === 'test@example.com' && password === 'password') {
      onLogin(); // Call this function on successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion</h2>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button_profil">Connexion</button>

          {/* Link to switch to Register page */}
          <p className="register-link" onClick={onShowRegister}>
            Pas de compte ? S'inscrire
          </p>

          {/* Link for Forgot Password */}
          <p className="forgot-password" onClick={onForgotPassword}>
            Mot de passe oublié ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
