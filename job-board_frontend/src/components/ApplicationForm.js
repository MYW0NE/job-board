import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = ({ jobId, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Soumettre les informations d'application au backend
    axios.post('http://localhost:5000/api/apply', {
      ad_id: jobId,
      name,
      email,
      phone,
      message,
    })
    .then(response => {
      console.log(response.data);
      alert('Application submitted successfully');
      onBack();  // Fermer le formulaire après la soumission
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      alert('Error submitting application');
    });
  };

  return (
    <div className="application-form">
      <h2>Apply for Job {jobId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>Close</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
