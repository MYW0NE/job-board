import React, { useState } from 'react';
import JobAd from './components/JobAd';
import Header from './components/Header';
import JobDetails from './components/JobDetails'; // Import JobDetails
import './App.css';

const App = () => {
    const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job

    // Sample job ads data (mock data)
    const jobAds = [
        {
            id: 1,
            title: "Software Engineer",
            shortDescription: "Develop and maintain web applications."
        },
        {
            id: 2,
            title: "Product Manager",
            shortDescription: "Oversee product development and strategy."
        },
        {
            id: 3,
            title: "UX Designer",
            shortDescription: "Design user-friendly interfaces."
        }
    ];

    const handleLearnMore = (ad) => {
        setSelectedJob(ad); // Set selected job
    };

    const handleApply = (ad) => {
        // Placeholder for apply functionality
        console.log(`Apply for ${ad.title}`);
    };

    return (
        <div className="job-board">
            <Header />
            <div className="job-container">
                <div className="job-list">
                    {jobAds.map(ad => (
                        <JobAd 
                            key={ad.id} 
                            {...ad} 
                            onLearnMore={() => handleLearnMore(ad)} 
                            onApply={() => handleApply(ad)} 
                        />
                    ))}
                </div>
                <div className="job-details-container">
                    <JobDetails job={selectedJob} /> {/* Pass selected job */}
                </div>
            </div>
        </div>
    );
};

export default App;
