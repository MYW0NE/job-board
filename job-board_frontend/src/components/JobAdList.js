import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAd from './JobAd'; 
import ApplyForm from './ApplyForm';
import './JobAd.css'; 

const JobAdList = ({ onLearnMore, isLoggedIn }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Track selected job object
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

  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job (including title and id)
    setShowApplyForm(true); // Show the application form
    onLearnMore(job.ad_id); // Optional callback for additional logic
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Submit the application form
      const response = await axios.post(`http://localhost:5000/api/apply/${selectedJob.ad_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Application submitted:', response.data);
      setShowApplyForm(false); // Close the form on success
      setSelectedJob(null); // Clear selected job
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCloseForm = () => {
    setShowApplyForm(false); // Close the form without submission
    setSelectedJob(null); // Clear selected job
  };

  return (
    <div className="job-listings">
      {/* Conditional rendering: show job ads or the apply form */}
      {showApplyForm ? (
        <ApplyForm
          jobId={selectedJob.ad_id} // Pass job ID to form
          jobTitle={selectedJob.title} // Pass job title to form
          onSubmit={handleFormSubmit} // Handle the form submission
          isLoggedIn={isLoggedIn} 
          onClose={handleCloseForm} // Close the form
        />
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job_ad_deco" key={job.ad_id}>
              <div className="job-ad">
                <JobAd 
                  title={job.title} 
                  shortDescription={job.description} 
                  onLearnMore={() => onLearnMore(job.ad_id)} // Optional additional logic for "Learn More"
                  onApply={() => handleApplyClick(job)} // Pass the whole job object for applying
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobAdList;
