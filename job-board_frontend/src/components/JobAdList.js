import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAd from './JobAd'; 
import ApplyForm from './ApplyForm';
import './JobAd.css'; 

const JobAdList = ({ onLearnMore, isLoggedIn }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  // Fetch the job ads from the API
  useEffect(() => {
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
    setShowApplyForm(true); // Show the apply form and hide the job listings
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Submit the application form
      const response = await axios.post(`http://localhost:5000/api/apply/${selectedJobId}`, formData);
      console.log('Application submitted:', response.data);
      setShowApplyForm(false); // Hide the form and show the job listings again
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCloseForm = () => {
    setShowApplyForm(false); // Close the form and show the job listings again
  };

  return (
    <div className="job-listings">
      {/* Conditional rendering to show either the job ads or the apply form */}
      {!showApplyForm ? (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job_ad_deco" key={job.ad_id}>
              <div className="job-ad">
                <JobAd 
                  title={job.title} 
                  shortDescription={job.description} 
                  onLearnMore={() => onLearnMore(job.ad_id)} 
                  onApply={() => handleApplyClick(job.ad_id)} // Open the apply form
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ApplyForm
          jobId={selectedJobId}
          onSubmit={handleFormSubmit} // Handle the form submission
          isLoggedIn={isLoggedIn} // Pass the login state
          onClose={handleCloseForm} // Close the form and return to the job listings
        />
      )}
    </div>
  );
};

export default JobAdList;

