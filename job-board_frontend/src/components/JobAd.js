import React from 'react';

const JobAd = ({ title, shortDescription, onLearnMore, onApply }) => {
  return (
    <div className="job-ad">
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <button onClick={onLearnMore}>En savoir plus</button>
      <button onClick={onApply}>Postuler</button>
    </div>
  );
};

export default JobAd;
