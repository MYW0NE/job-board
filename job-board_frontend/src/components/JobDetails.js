import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetails = ({ jobId, onBack }) => {
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    if (jobId) {
      axios.get(`http://localhost:5000/api/job-ads/${jobId}`)
        .then(response => {
          setJobDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [jobId]);

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <div>
      <h2>{jobDetails.title}</h2>
      <p><strong>Location:</strong> {jobDetails.location || 'N/A'}</p>
      <p><strong>Salary:</strong> {jobDetails.salary || 'N/A'}</p>
      <p><strong>Company Name:</strong> {jobDetails.company_name || 'N/A'}</p>
      <p><strong>Industry:</strong> {jobDetails.industry || 'N/A'}</p>
      <p><strong>Company Description:</strong> {jobDetails.bigdescription || 'N/A'}</p>
      <button onClick={onBack}>Postuler</button>
    </div>
  );
};

export default JobDetails;
