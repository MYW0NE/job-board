import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Research from './components/research';  // Corrected the import to match file name casing
import JobAdList from './components/JobAdList';
import JobDetails from './components/JobDetails'; // Importe JobDetails ici
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; 
import axios from 'axios'; 
import './App.css';   

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null); // On change pour stocker l'ID du job
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Fetch job ads from the API
  useEffect(() => {
    // TODO: React appelle 2 fois useEffect() au load de la page
    axios.get('http://127.0.0.1:5000/api/job-ads') 
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
    setSelectedJobId(jobId); // Stocke l'ID du job sélectionné
  };

  const handleBack = () => {
    setSelectedJobId(null); // Reset l'ID pour revenir à la liste des annonces
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
      <Header setIsLoggedIn={setIsLoggedIn}/>

      {/* Conditional rendering logic for login, registration, forgot password, and job listings */}
      {isLoggedIn ? (
        <>
          <Research onSearch={handleSearch} />
          <div className="jobListings">
            <h2>Offres d'emplois</h2>
            {loading ? (
              <p>Loading jobs...</p>
            ) : searchResults.length === 0 ? (
              <p>No jobs found</p>
            ) : (
              <JobAdList jobs={searchResults} onLearnMore={handleLearnMore} />
            )}
          </div>

          {loading ? (
            <p>Loading jobs...</p>
          ) : selectedJobId ? (
            // Si un job est sélectionné, afficher les détails de l'annonce
            <JobDetails jobId={selectedJobId} onBack={handleBack} />
          ) : searchResults.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <JobAdList jobs={searchResults} onLearnMore={handleLearnMore} />
          )}
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
