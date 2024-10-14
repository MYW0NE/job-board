// src/components/JobAdList.js
import React from 'react';
import JobAd from './JobAd';
import './JobAd.css'

const JobAdList = ({ jobs, onLearnMore, onApply }) => {
    console.log("Jobs received:", jobs);
    return (
      <div className="job-ad-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobAd
              key={job.id}
              title={job.title}
              shortDescription={job.shortDescription}
              onLearnMore={() => onLearnMore(job.id)}
              onApply={() => onApply(job.id)}
            />
          ))
        ) : (
          <p>La recherche emplois ouilygfliuglui ne donne aucun résultat. <br/><br/>
          Suggestions de recherche : <br/><br/>
          - Essayez des termes plus généraux <br/>
          - Vérifiez l'orthographe <br/>
          - Utilisez des mots entiers à la place d'abréviations
          </p>
        )}
      </div>
    );
  };  

export default JobAdList;
