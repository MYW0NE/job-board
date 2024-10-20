import React, { useState } from 'react';
import axios from 'axios'; 

const ApplyForm = ({ jobId, onSubmit, isLoggedIn, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      ad_id: jobId,
      message: formData.message, // Toujours inclure le message
      isLoggedIn,
    };

    if (isLoggedIn) {
      // Récupérer le userId pour l'utilisateur connecté (ex: depuis localStorage)
      const userId = localStorage.getItem('userId');
      applicationData.userId = userId;
    } else {
      // Si l'utilisateur n'est pas connecté, inclure les champs name, email et phone
      applicationData.name = formData.name;
      applicationData.email = formData.email;
      applicationData.phone = formData.phone;
    }

    // Envoi des données au backend
    axios.post('http://localhost:5000/api/apply', applicationData)
      .then(response => {
        console.log('Application submitted successfully:', response.data);
        setMessage('Votre candidature a été envoyée avec succès !');
        onSubmit(applicationData);  // Callback après la soumission
      })
      .catch(error => {
        console.error('Error submitting application:', error);
        setMessage("Une erreur s'est produite lors de l'envoi de votre candidature.");
      });
  };

  return (
    <div className="apply-form">
      <h3>Postuler pour l'annonce #{jobId}</h3>

      {/* Formulaire pour les utilisateurs connectés */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Envoyer</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </form>
      ) : (
        // Formulaire pour les utilisateurs non connectés
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Envoyer</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </form>
      )}

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default ApplyForm;
