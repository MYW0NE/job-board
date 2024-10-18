 // src/components/ApplyForm.js
 import React, { useState } from 'react';
 import './ApplyForm.css'; 
 
 const ApplyForm = ({ jobId, jobTitle, onSubmit, isLoggedIn, onClose }) => {
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
     <div className="apply-form-container">
       <h3 className="apply-form-title">Postuler pour "{jobTitle}"</h3> {/* Show job title */}
       <form onSubmit={handleSubmit} className="apply-form">
         {!isLoggedIn && (
           <>
             <input
               type="text"
               name="name"
               placeholder="Prénom"
               value={formData.name}
               onChange={handleChange}
               required
               className="apply-input"
             />
             <input
               type="text"
               name="lastName"
               placeholder="Nom"
               value={formData.lastName}
               onChange={handleChange}
               required
               className="apply-input"
             />
             <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               required
               className="apply-input"
             />
             <input
               type="tel"
               name="phoneNumber"
               placeholder="Numéro de téléphone"
               value={formData.phoneNumber}
               onChange={handleChange}
               required
               className="apply-input"
             />
           </>
         )}
         <input
           type="file"
           name="resume"
           onChange={handleFileChange}
           required
           className="apply-input-file"
         />
         <textarea
           name="additionalText"
           placeholder="Commentaire"
           value={formData.additionalText}
           onChange={handleChange}
           className="apply-textarea"
         />
         <div className="apply-form-buttons">
           <button type="submit" className="apply-button">Envoyer la candidature</button>
           <button type="button" onClick={onClose} className="cancel-button">Annuler</button>
         </div>
       </form>
     </div>
   );
 };
 
 export default ApplyForm;