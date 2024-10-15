const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');   

const app = express();
app.use(cors());
app.use(express.json()); 

// MySQL database connection
const db = mysql.createConnection({
    host: '163.5.23.73', 
    user: 'tom', 
    password: 'Fparad0x?',  
    database: 'databasedjob' 
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API route to get job advertisements
app.get('/api/job-ads', (req, res) => {
    const query = `
        SELECT advertisements.title, advertisements.location, advertisements.salary, advertisements.description, companies.name AS company_name 
        FROM advertisements
        JOIN companies ON advertisements.companies_id = companies.companies_id;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching job ads:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results); 
    });
});

// POST request to add a new job advertisement
app.post('/api/job-ads', (req, res) => {
    const { title, location, salary, description, companies_id } = req.body;

    const query = `
        INSERT INTO advertisements (companies_id, title, location, salary, description) 
        VALUES (?, ?, ?, ?, ?);
    `;
    
    db.query(query, [companies_id, title, location, salary, description], (err, results) => {
        if (err) {
            console.error('Error inserting job ad:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Fetch the newly inserted job ad
        const newAdId = results.insertId;
        const newJobAdQuery = `SELECT * FROM advertisements WHERE ad_id = ?`;
        db.query(newJobAdQuery, [newAdId], (err, newAd) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching the new job ad' });
            }
            res.json(newAd[0]); 
        });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
