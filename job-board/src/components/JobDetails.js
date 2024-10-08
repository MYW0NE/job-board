import React from 'react';
import './JobDetails.css'; // Import CSS for styling

const JobDetails = ({ job }) => {
    if (!job) {
        return <div className="job-details">Select a job to see details.</div>;
    }

    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p>Full Description: This is where the full job description would go.</p>
            <p>Wages: $60,000 - $80,000</p>
            <p>Location: Remote</p>
            <p>Working Time: Full-time</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default JobDetails;
