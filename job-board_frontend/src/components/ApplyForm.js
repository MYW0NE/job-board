// src/components/ApplyForm.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const ApplyForm = ({ jobId, onSubmit, isLoggedIn, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalText: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:5000/api/apply', {
      ad_id: jobId, 
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.additionalText,
    })
    .then(response => {
      console.log('Application submitted successfully:', response.data);
      setMessage('Votre candidature a été envoyée avec succès !');
      onSubmit(formData);
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setMessage("Une erreur s'est produite!");
    });
  };

  return (
    <div className="apply-form">
      <h3>Apply for Job #{jobId}</h3>
      <form onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <>
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
          </>
        )}
        <textarea
          name="additionalText"
          placeholder="Message"
          value={formData.additionalText}
          onChange={handleChange}
        />
        <button type="submit">Envoyer</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default ApplyForm;
