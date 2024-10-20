import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import axios from 'axios'; // Import axios to send requests to the backend

const Login = ({ onLogin, onShowRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const LoginData = {
      email,
      password
    };
    axios.post('http://127.0.0.1:5000/api/login', LoginData)
    .then(response => {
      console.log('Login successful:', response.data);
      onLogin();
    })
    .catch(error => {
      // Gestion des erreurs
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.error) {
        // Afficher l'erreur renvoyée par le backend
        setError(error.response.data.error);
      } else {
        // Si aucune erreur spécifique n'est renvoyée, afficher un message par défaut
        setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
      }
    });
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
