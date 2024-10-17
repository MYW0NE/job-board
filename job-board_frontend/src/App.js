import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Research from './components/research'; 
import JobAdList from './components/JobAdList';
import JobDetails from './components/JobDetails';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; 
import Profile from './components/Profile';
import axios from 'axios'; 
import './App.css';   

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Fetch job ads from the API
  useEffect(() => {
    axios.get('http://localhost:5000/api/job-ads') 
      .then(response => {
        setJobs(response.data); 
        setSearchResults(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
        setLoading(false); 
      });
  }, []);

  const handleSearch = (searchQuery, locationQuery) => {
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setSearchResults(filteredJobs);
  };

  const handleLearnMore = (jobId) => {
    setSelectedJobId(jobId); 
  };

  const handleBack = () => {
    setSelectedJobId(null); 
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const showRegister = () => {
    setIsRegistering(true);
    setIsForgotPassword(false);
  };

  const showLogin = () => {
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const showForgotPassword = () => {
    setIsForgotPassword(true);
    setIsRegistering(false);
  };

  const resetToLogin = () => {
    setIsForgotPassword(false);
    setIsRegistering(false);
  };

  return (
    <div className="App">
      <Header setIsLoggedIn={setIsLoggedIn} />
      <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {isLoggedIn ? (
        <>
      <Research onSearch={handleSearch} />
            <h2 className='page_title'>Offres d'emplois</h2>
            <div className="container">
            
              <div className="jobListings">
                {loading ? (
                  <p>Loading jobs...</p>
                ) : searchResults.length === 0 ? (
                  <p>No jobs found</p>
                ) : (
                  <JobAdList jobs={searchResults} onLearnMore={handleLearnMore} />
                )}
              </div>

              <div className="job-details">
                {selectedJobId ? (
                  <JobDetails jobId={selectedJobId} onBack={handleBack} />
                ) : (
                  <p>No job selected</p>
                )}
              </div>
          </div>
        </>
      ) : isRegistering ? (
        <Register onRegister={handleRegister} onShowLogin={showLogin} />
      ) : isForgotPassword ? (
        <ForgotPassword 
          onReset={resetToLogin} 
          onLogin={showLogin} 
          onRegister={showRegister} 
        />
      ) : (
        <Login 
          onLogin={handleLogin} 
          onShowRegister={showRegister} 
          onForgotPassword={showForgotPassword} 
        />
      )}
    </div>
  );
}

export default App;
