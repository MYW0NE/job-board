import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Research from './components/research';
import JobAdList from './components/JobAdList';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // Import the ForgotPassword component
import './App.css';   

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Simulated job data (for testing)
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        shortDescription: 'We are looking for a talented frontend developer with React experience.',
        location: 'Remote',
        salary: '$60,000 - $80,000',
      },
      {
        id: 2,
        title: 'Backend Developer',
        shortDescription: 'Join our team as a backend developer with Node.js and MongoDB experience.',
        location: 'New York',
        salary: '$70,000 - $90,000',
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        shortDescription: 'We need a full stack developer proficient in both frontend and backend technologies.',
        location: 'San Francisco',
        salary: '$90,000 - $120,000',
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs); // Set the mock data into jobs
      setSearchResults(mockJobs); // Initialize search results with all jobs
      setLoading(false); // Simulate job loading complete
    }, 2000); 
  }, []);

  const handleSearch = (searchQuery, locationQuery) => {
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setSearchResults(filteredJobs);
  };

  const handleLearnMore = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  // Debug: Log important state variables
  console.log({ isLoggedIn, isRegistering, isForgotPassword });

  return (
    <div className="App">
      <Header />

      {/* Debug: Force rendering a message */}
      <p>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>

      {/* Conditional rendering logic */}
      {isLoggedIn ? (
        <>
          <Research onSearch={handleSearch} />
          <div className="jobListings">
            <h2>Job Listings</h2>
          </div>

          {loading ? (
            <p>Loading jobs...</p>
          ) : searchResults.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <JobAdList jobs={searchResults} onLearnMore={handleLearnMore} />
          )}

          {isModalOpen && selectedJob && (
            <div className="modal">
              <div className="modal-content">
                <h2>{selectedJob.title}</h2>
                <p>{selectedJob.shortDescription}</p>
                <p>Location: {selectedJob.location}</p>
                <p>Salary: {selectedJob.salary}</p>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </>
      ) : isRegistering ? (
        <Register onRegister={handleRegister} />
      ) : isForgotPassword ? (
        <ForgotPassword onReset={resetToLogin} />
      ) : (
        <Login onLogin={handleLogin} onShowRegister={showRegister} onForgotPassword={showForgotPassword} />
      )}
    </div>
  );
}

export default App;