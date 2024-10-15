import React, { useState } from 'react';

const PostJobForm = ({ onAddJobAd }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [companies_id, setCompaniesId] = useState(1); // Assuming company ID is already known or selected

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobAdData = { title, location, salary, description, companies_id };

        try {
            const response = await fetch('http://localhost:5000/api/job-ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobAdData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Job Ad successfully posted!');
                // Pass the new job ad data to the parent (App.js) to add it to the list
                onAddJobAd(result);
                // Clear the form fields
                setTitle('');
                setLocation('');
                setSalary('');
                setDescription('');
            } else {
                alert(`Failed to post job ad: ${result.error}`);
            }
        } catch (error) {
            console.error('Error posting job ad:', error);
            alert('Error posting job ad.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Post a New Job Ad</h2>
            
            <div>
                <label>Title: </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            
            <div>
                <label>Location: </label>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                />
            </div>
            
            <div>
                <label>Salary: </label>
                <input 
                    type="number" 
                    value={salary} 
                    onChange={(e) => setSalary(e.target.value)} 
                    required 
                />
            </div>

            <div>
                <label>Description: </label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default PostJobForm;
