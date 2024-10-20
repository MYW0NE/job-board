import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAd from './JobAd'; 
import ApplyForm from './ApplyForm';
import './JobAd.css'; 

const JobAdList = ({ onLearnMore, isLoggedIn }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

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
    setShowApplyForm(true); // Show the apply form
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/apply', {
        ...formData,
        ad_id: selectedJobId, // Send the job ad id
      });
      console.log('Application submitted:', response.data);
      setShowApplyForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCloseForm = () => {
    setShowApplyForm(false); // Close the form and return to job listings
  };

  return (
    <div className="job-listings">
      {!showApplyForm ? (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job_ad_deco" key={job.ad_id}>
              <div className="job-ad">
                <JobAd 
                  title={job.title} 
                  shortDescription={job.description} 
                  onLearnMore={() => onLearnMore(job.ad_id)} 
                  onApply={() => handleApplyClick(job.ad_id)} 
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ApplyForm
          jobId={selectedJobId}
          onSubmit={handleFormSubmit} 
          isLoggedIn={isLoggedIn} // Pass the login state
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

export default JobAdList;
