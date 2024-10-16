import React from 'react';

const JobAd = ({ title, shortDescription, onLearnMore, onApply }) => {
  return (
    <div className="job-ad">
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <button onClick={onLearnMore}>Learn More</button>
      <button onClick={onApply}>Apply</button>
    </div>
  );
};

export default JobAd;
