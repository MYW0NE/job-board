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

  useEffect(() => {
    axios.get('http://localhost:5000/api/job-ads') 
      .then(response => {
        console.log(response.data); // Log the response data
        setJobs(response.data); 
        setSearchResults(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
        setLoading(false); 
      });
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job); 
    setShowApplyForm(true); 
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/apply/${selectedJob.ad_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Application submitted:', response.data);
      setShowApplyForm(false); 
      setSelectedJobId(null);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  // Updated handleSearch to call backend
  const handleSearch = async (searchQuery, locationQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: {
          title: searchQuery,
          location: locationQuery
        }
      });
      console.log('Search Results:', response.data); // Log the search results
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for jobs:', error);
      setSearchResults([]); // Reset search results on error
    }
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
        <Register onRegister={() => setIsLoggedIn(true)} onShowLogin={() => setIsRegistering(false)} />
      ) : isForgotPassword ? (
        <ForgotPassword 
          onReset={() => setIsForgotPassword(false)} 
          onLogin={() => setIsForgotPassword(false)} 
          onRegister={() => setIsRegistering(true)} 
        />
      ) : (
        <Login 
          onLogin={() => setIsLoggedIn(true)} 
          onShowRegister={() => setIsRegistering(true)} 
          onForgotPassword={() => setIsForgotPassword(true)} 
        />
      )}
    </div>
  );
}

export default App;
