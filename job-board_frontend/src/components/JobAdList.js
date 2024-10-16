import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAd from './JobAd'; // Assurez-vous d'importer JobAd correctement

const JobAdList = ({ onLearnMore }) => {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div className="job-listings">
      <h2>Job Listings</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.ad_id} className="job-ad">
            <JobAd 
              title={job.title} 
              shortDescription={job.description} 
              onLearnMore={() => onLearnMore(job.ad_id)}
              onApply={() => console.log(`Apply to job ${job.ad_id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobAdList;
