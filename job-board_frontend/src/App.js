import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Research from './components/Research'; 
import JobAdList from './components/JobAdList';
import JobDetails from './components/JobDetails';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; 
import ApplyForm from './components/ApplyForm'; 
import Profile from './components/Profile';
import axios from 'axios'; 
import './App.css';   

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [showApplyForm, setShowApplyForm] = useState(false); 
  const [showLoginForm, setShowLoginForm] = useState(false);  
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Keep track of login state
  const [showProfile, setShowProfile] = useState(false); // NEW: Track profile visibility

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

  const handleApplyClick = (job) => {
    setSelectedJob(job); 
    setShowApplyForm(true); 
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/apply`, {
        ad_id: selectedJob.ad_id, 
        ...formData,
      });
      setShowApplyForm(false); 
      setSelectedJobId(null);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleSearch = async (searchQuery, locationQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: {
          title: searchQuery,
          location: locationQuery
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      setSearchResults([]); 
    }
  };

  const handleLearnMore = (jobId) => {
    const selectedJob = searchResults.find(job => job.ad_id === jobId);
    setSelectedJob(selectedJob);  
    setSelectedJobId(jobId); 
  };

  const handleBack = () => {
    setSelectedJobId(null); 
    setShowApplyForm(false);  
    setSelectedJob(null);     
  };

  const handleLogin = () => {
    setIsLoggedIn(true);  
    setShowLoginForm(false);  
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  
  };

  const showLogin = () => {
    setShowLoginForm(true); 
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const showRegister = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowForgotPasswordForm(false);
  };

  const showForgotPassword = () => {
    setShowForgotPasswordForm(true);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  // NEW: Function to handle showing the profile page
  const handleShowProfile = () => {
    setShowProfile(true); // Show the profile page when clicking on "Profil"
  };

  const handleBackFromProfile = () => {
    setShowProfile(false); // Hide the profile page and go back to the main content
  };

  // NEW: Handle home click to hide login and other forms
  const handleHomeClick = () => {
    setShowLoginForm(false);
    setShowProfile(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  return (
    <div className="App">
      <Header 
        setShowLoginForm={setShowLoginForm} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        onLoginClick={showLogin} 
        onLogout={handleLogout} 
        onProfileClick={handleShowProfile} // NEW: Pass the profile click handler
        onHomeClick={handleHomeClick} // NEW: Pass the home click handler
      />  

      {showProfile ? ( // NEW: Render Profile component if showProfile is true
        <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onBack={handleBackFromProfile} />
      ) : showLoginForm ? (
        <Login onLogin={handleLogin} onShowRegister={showRegister} onForgotPassword={showForgotPassword} />
      ) : showRegisterForm ? (
        <Register onRegister={handleLogin} onShowLogin={showLogin} />
      ) : showForgotPasswordForm ? (
        <ForgotPassword 
          onReset={() => setShowForgotPasswordForm(false)} 
          onLogin={showLogin} 
          onRegister={showRegister} 
        />
      ) : (
        <>
          <h2 className='page_title'>Offres d'emplois</h2>
          <div className="container">
            <div className="jobListings">
              {loading ? (
                <p>Loading jobs...</p>
              ) : searchResults.length === 0 ? (
                <p>No jobs found</p>
              ) : (
                <JobAdList jobs={searchResults} onLearnMore={handleLearnMore} onApply={handleApplyClick} />
              )}
            </div>
            <div className="job-details">
              {showApplyForm && selectedJob ? (
                <ApplyForm
                  jobId={selectedJob.ad_id}  
                  onSubmit={handleFormSubmit}
                  onClose={handleBack}       
                  isLoggedIn={isLoggedIn} 
                />
              ) : selectedJobId ? (
                <JobDetails
                  jobId={selectedJobId}
                  onBack={handleBack}
                  onApply={() => handleApplyClick(selectedJob)}  
                />
              ) : (
                <p>No job selected</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
