import React, { useState } from 'react';
import './Register.css'; // Import the CSS file for styling

const Register = ({ onRegister, onShowLogin }) => { // Accept onShowLogin prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle registration logic here
    console.log('Registered with Email:', email);
    
    // Call the onRegister function to update the login state in App
    onRegister(); // Call this function on successful registration
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button_profil">Register</button>

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