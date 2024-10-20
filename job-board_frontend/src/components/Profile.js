import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the new CSS styles for the Profile component

const Profile = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userId = localStorage.getItem('userId'); // Récupère l'ID utilisateur depuis localStorage

  useEffect(() => {
    if (isLoggedIn && userId) {
      axios.get(`http://localhost:5000/api/user-profile`, {
        params: { userId },  // Passe l'ID de l'utilisateur dans la requête
      })
      .then(response => {
        console.log('User data fetched:', response.data);  // Vérifie les données récupérées
        setUserData(response.data);  // Remplit l'état avec les données récupérées
        setLoading(false);  // Arrête l'indicateur de chargement
      })
      .catch(error => {
        console.error('Erreur lors du chargement du profil :', error);
        setError('Impossible de charger le profil');
        setLoading(false);
      });
    } else {
      setError('ID utilisateur manquant ou utilisateur non connecté');
      setLoading(false);
    }
  }, [isLoggedIn, userId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    try {
      const response = await axios.put(`http://localhost:5000/api/user-profile`, {
        userId,
        ...userData, // Passe toutes les données mises à jour
      });
      setUserData(response.data); // Met à jour l'état avec les nouvelles données
      setEditMode(false); // Quitte le mode d'édition
      setError('');
      setSuccessMessage('Profil mis à jour avec succès !');
      
      // Re-fetch the updated user data from the server
      axios.get(`http://localhost:5000/api/user-profile`, {
        params: { userId },  // Passe l'ID de l'utilisateur dans la requête
      })
      .then(response => {
        setUserData(response.data);  // Update the state with new data
        setEditMode(false); // Exit edit mode
      })
      .catch(error => {
        console.error('Erreur lors du chargement des nouvelles données :', error);
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      setError('Impossible de mettre à jour le profil');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-user/${userId}`);
        setSuccessMessage('Votre compte a été supprimé avec succès.');
        localStorage.removeItem('userId'); // Supprime l'userId du localStorage
        // Effectuez ici des redirections ou des actions supplémentaires après la suppression.
      } catch (error) {
        console.error('Erreur lors de la suppression du compte :', error);
        setError('Impossible de supprimer votre compte.');
      }
    }
  };

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div className="profile">
      <h2>Votre Profil</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {editMode ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="profile-input"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="profile-input"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
          </button>
          <button type="button" onClick={() => setEditMode(false)}>
            Annuler
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Nom :</strong> {userData.name}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          <p><strong>Téléphone :</strong> {userData.phone}</p>
          <p><strong>Mot de passe :</strong> {userData.password}</p> 
          <button onClick={() => setEditMode(true)}>
            Modifier le Profil
          </button>
          <button className="delete-button" onClick={handleDeleteUser}>
            Supprimer mon compte
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
