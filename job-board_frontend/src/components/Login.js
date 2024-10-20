import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios'; 

const Login = ({ onLogin, onShowRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const LoginData = { email, password };
    
    axios.post('http://127.0.0.1:5000/api/login', LoginData)
    .then(response => {
      const { userId } = response.data; // Récupère userId de la réponse
      console.log('Login successful:', response.data);

      // Stocker l'ID utilisateur dans localStorage pour l'utiliser plus tard
      localStorage.setItem('userId', userId);
      
      // Appeler la fonction onLogin pour mettre à jour l'état de l'application
      onLogin();
    })
    .catch(error => {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
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

          <p className="register-link" onClick={onShowRegister}>
            Pas de compte ? S'inscrire
          </p>

          <p className="forgot-password" onClick={onForgotPassword}>
            Mot de passe oublié ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
