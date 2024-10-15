import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JobAd from './components/JobAd';
import Header from './components/Header';
import JobDetails from './components/JobDetails';
import PostJobForm from './components/PostJobForm';
import './App.css';

const App = () => {
    const [jobAds, setJobAds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/job-ads')
            .then(response => response.json())
            .then(data => setJobAds(data))
            .catch(error => console.error('Error fetching job ads:', error));
    }, []);

    const handleAddJobAd = (newJobAd) => {
        setJobAds([...jobAds, newJobAd]);
        setShowPostForm(false);
    };

    const handleLearnMore = (ad) => {
        setSelectedJob(ad);
    };

    const handleApply = (ad) => {
        console.log(`Apply for ${ad.title}`);
    };

    const togglePostForm = () => {
        setShowPostForm(!showPostForm);
        setSelectedJob(null);
    };

    return (
        <Router>
            <div className="job-board">
                <Header />

                <Switch>
                    {/* Job Ads Page as the Default Route */}
                    <Route exact path="/">
                        <div style={{ marginBottom: "20px" }}>
                            <button onClick={togglePostForm}>
                                {showPostForm ? "Back to Job List" : "Post a New Job"}
                            </button>
                        </div>

                        {showPostForm ? (
                            <PostJobForm onAddJobAd={handleAddJobAd} />
                        ) : (
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
                                    {selectedJob && <JobDetails job={selectedJob} />}
                                </div>
                            </div>
                        )}
                    </Route>

                    {/* Example for a Job Details page */}
                    <Route path="/job/:id">
                        <JobDetails job={selectedJob} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
