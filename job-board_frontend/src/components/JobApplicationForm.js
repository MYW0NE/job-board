// // src/components/ApplyForm.js
// import React, { useState } from 'react';

// const ApplyForm = ({ onSubmit, isLoggedIn, onClose }) => {
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (!isLoggedIn) {
//       formData.append('name', name);
//       formData.append('lastName', lastName);
//       formData.append('email', email);
//       formData.append('phone', phone);
//     }
//     formData.append('resume', resume);
//     formData.append('coverLetter', coverLetter);
    
//     onSubmit(formData);
//   };

//   return (
//     <div className="apply-form">
//       <h2>Apply for Job</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLoggedIn && (
//           <>
//             <input
//               type="text"
//               placeholder="First Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </>
//         )}
//         <input
//           type="file"
//           accept=".pdf, .doc, .docx"
//           onChange={(e) => setResume(e.target.files[0])}
//           required
//         />
//         <textarea
//           placeholder="Cover Letter (optional)"
//           value={coverLetter}
//           onChange={(e) => setCoverLetter(e.target.value)}
//           rows="4"
//         />
//         <button type="submit">Submit Application</button>
//         <button type="button" onClick={onClose}>Close</button>
//       </form>
//     </div>
//   );
// };

// export default ApplyForm;
