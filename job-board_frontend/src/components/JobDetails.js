import React from 'react';
import './JobDetails.css'; // Import CSS for styling

const JobDetails = ({ job }) => {
    if (!job) {
        return <div className="job-details">Select a job to see details.</div>;
    }

    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p><strong>Full Description:</strong> {job.description}</p>
            <p><strong>Wages:</strong> {job.wages}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Working Time:</strong> {job.workingTime}</p>
            {/* Add more dynamic fields as needed */}
        </div>
    );
};

export default JobDetails;
