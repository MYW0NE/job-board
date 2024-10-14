// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Research from './components/research';
import JobAdList from './components/JobAdList';
import './App.css';   


function App() {
  const [jobs, setJobs] = useState([]); // State to store all jobs
  const [searchResults, setSearchResults] = useState([]); // State to store filtered jobs
  const [loading, setLoading] = useState(true); // State to handle loading
  const [selectedJob, setSelectedJob] = useState(null); // State to store selected job for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Simulate job data instead of fetching from the backend
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
      setLoading(false); // Set loading to false after fetching jobs
    }, 2000); // Simulate a 2-second API call delay
  }, []);

  // Search function to handle filtering jobs
  const handleSearch = (searchQuery, locationQuery) => {
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setSearchResults(filteredJobs);
  };

  // Handler for learning more about a job (opens modal)
  const handleLearnMore = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    setSelectedJob(job);
    setIsModalOpen(true); // Open modal
  };

  // Handler for applying to a job
  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
    // Implement application logic here
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <Research onSearch={handleSearch} />
    <div className="jobListings">
      <h2>Job Listings</h2>
    </div>
      {/* Conditionally show loading, no results, or job list */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : searchResults.length === 0 ? (
        <p>
          La recherche emplois ouilygfliuglui ne donne aucun résultat. <br/><br/>
          Suggestions de recherche : <br/><br/>
          - Essayez des termes plus généraux <br/>
          - Vérifiez l'orthographe <br/>
          - Utilisez des mots entiers à la place d'abréviations
        </p>
      ) : (
        <JobAdList 
          jobs={searchResults} 
          onLearnMore={handleLearnMore} 
          onApply={handleApply} 
        />
      )}

      {/* Modal structure to display job details if a job is selected */}
      {isModalOpen && selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.shortDescription}</p>
            <p>Location: {selectedJob.location}</p>
            <p>Salary: {selectedJob.salary}</p>
            <button className="close-button" onClick={closeModal}>Apply</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
 