// src/components/ApplyForm.js
import React, { useState } from 'react';

const ApplyForm = ({ jobId, onSubmit, isLoggedIn, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    resume: null,
    additionalText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to parent component
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
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
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
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          required
        />
        <textarea
          name="additionalText"
          placeholder="Additional Information"
          value={formData.additionalText}
          onChange={handleChange}
        />
        <button type="submit">Submit Application</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ApplyForm;
