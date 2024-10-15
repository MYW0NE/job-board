// src/components/Profile.js
import React from 'react';

function Profile({ isLoggedIn, onShowLogin, onShowRegister }) {
  return (
    <div className="profile-menu">
      <h3>Profile</h3>
      {isLoggedIn ? (
        <p>Welcome, you're logged in!</p>
      ) : (
        <div>
          <button className="button_profil" onClick={onShowLogin}>Login</button>
          <button className="button_profil" onClick={onShowRegister}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
