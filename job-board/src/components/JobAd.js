import React from 'react';

const JobAd = ({ title, location, salary, description, onLearnMore }) => {
    return (
        <div className="job-ad">
            <h2>{title}</h2>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Salary:</strong> ${salary}</p>
            <p>{description}</p>
            <button onClick={onLearnMore}>Learn More</button>
        </div>
    );
};

export default JobAd;
