// src/components/JobAdList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAd from './JobAd'; // Ensure JobAd is imported correctly
import ApplyForm from './ApplyForm'; // Import the ApplyForm component
import JobDetails from './JobDetails'; // Import the JobDetails component if it exists
import './JobAd.css'; 

const JobAdList = ({ onLearnMore, isLoggedIn }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null); // Track the selected job details

  useEffect(() => {
    // Fetch the job ads from the API
    axios.get('http://localhost:5000/api/job-ads')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
      });
  }, []);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyForm(true);
    const selectedJob = jobs.find(job => job.ad_id === jobId); // Find the selected job details
    setSelectedJobDetails(selectedJob); // Store the job details to display
    onLearnMore(jobId); // Call onLearnMore to trigger any additional logic (optional)
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Submit the application form
      const response = await axios.post(`http://localhost:5000/api/apply/${selectedJobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Application submitted:', response.data);
      setShowApplyForm(false); // Close the form on success
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCloseForm = () => {
    setShowApplyForm(false); // Close the form
  };

  return (
    <div className="job-listings">
      <div className="job-list">
        {jobs.map((job) => (
          <div className="job_ad_deco" key={job.ad_id}>
            <div className="job-ad">
              <JobAd 
                title={job.title} 
                shortDescription={job.description} 
                onLearnMore={() => onLearnMore(job.ad_id)} // You can keep this if you need additional "Learn More" logic
                onApply={() => handleApplyClick(job.ad_id)} // Open the apply form and show details
              />
            </div>
          </div>
        ))}
      </div>

      {/* {selectedJobDetails && (
        <div className="job-details">
          <h2>{selectedJobDetails.title}</h2>
          <p>{selectedJobDetails.description}</p>
          <p>Location: {selectedJobDetails.location}</p> */}
          {/* You can add more job details here if needed */}
        {/* </div>
      )} */}

      {showApplyForm && (
        <ApplyForm
          jobId={selectedJobId}
          onSubmit={handleFormSubmit}
          isLoggedIn={isLoggedIn} // Pass login state to adjust form fields
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default JobAdList;
