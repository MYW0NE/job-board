const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API route to get job advertisements (title and description)
app.get('/api/job-ads', (req, res) => {
    const query = `
        SELECT ad_id, title, description 
        FROM advertisements;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching job ads:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// API route to get detailed information about a specific job and its company
app.get('/api/job-ads/:id', (req, res) => {
    const adId = req.params.id;
    const query = `
        SELECT advertisements.title, advertisements.location, advertisements.salary, advertisements.description, 
               companies.name AS company_name, companies.industry, companies.bigdescription
        FROM advertisements
        JOIN companies ON advertisements.companies_id = companies.companies_id
        WHERE advertisements.ad_id = ?;
    `;
    db.query(query, [adId], (err, results) => {
        if (err) {
            console.error('Error fetching job details:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Job ad not found' });
        }

        res.json(results[0]); // Return the first result (since ad_id is unique)
    });
});
// Route pour gérer l'enregistrement des candidatures
app.post('/api/apply', (req, res) => {
    const { ad_id, name, email, phone, message } = req.body;

    // Insérer les informations d'application dans la table information
    const query = `
        INSERT INTO information (ad_id, name, email, phone, message)
        VALUES (?, ?, ?, ?, ?);
    `;
    
    db.query(query, [ad_id, name, email, phone, message], (err, result) => {
        if (err) {
            console.error('Error inserting application:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Application submitted successfully' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
