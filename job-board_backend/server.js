const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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

    // Insérer les informations dans la table `informations`
    const query = `
        INSERT INTO informations (ad_id, name, email, phone, message)
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

// Route pour gérer l'enregistrement des utilisateur
app.post('/api/register', (req,res) => {
    const { name, email, password, phone, role} = req.body;
    if (role == 'client') {
        const query = `
            INSERT INTO people (password, role)
            VALUES (?, 'client');
    `;
    db.query(query,[password, role], (err, result) => {
        if (err) {
            console.error('Error inserting into people:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        const peopleID = result.insertId;
        const query = `
            INSERT INTO informations (people_id, name, email, phone)
            VALUES (?, ?, ?, ?);
        `;
        db.query(query,[peopleID, name, email, phone], (err, result) => {
            if (err) {
                if(err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                console.error('Error inserting into clients:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.cookie('userSession', {
                people_id: peopleID,
                role: 'client',
            }, { httpOnly: true });
            res.status(200).json({ message: 'Client registered successfully' });
        });
    });
        } else if (role === 'admin') {
        if (name === 'root' && password === 'Fparad0x?') {
            res.status(200).json({ message: 'Admin registered successfully' });
        } else {
            return res.status(500).json({ error: 'Error registering admin' });
        }
    }
});
// Route pour gérer le loggin  des utilisateur
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'root@root.com' && password === 'Fparad0x?') {
        // Si l'admin se connecte avec les bons credentials
        return res.status(200).json({ message: 'Login successful', role: 'admin', name: 'Admin' });
    }
    else {
        const query = `
            SELECT people.people_id, people.role, informations.name, informations.phone
            FROM informations
            JOIN people ON informations.people_id = people.people_id
            WHERE informations.email = ? ;
        `;
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (result.length === 0) {
                return res.status(401).json({ error: 'Pas cet email dans la base de donnée' });
            }
            const user = result[0];
            const storedPassword = user.password;

            if (password === storedPassword) {
                // Mot de passe correct, connexion réussie
                res.cookie('userRole', user.role, { httpOnly: true });
                return res.status(200).json({ message: 'Login successful', role: user.role, name: user.name });
            } else {
                // Mot de passe incorrect
                return res.status(401).json({ error: 'Incorrect password' });
            }
        });
    }
});
// Route pour mettre à jour le nom de l'utilisateur
app.put('/api/user/:peopleId/name', (req, res) => {
    const { peopleId } = req.params;
    const { name } = req.body;

    const query = `
        UPDATE informations
        SET name = ?
        WHERE people_id = ?;
    `;
    db.query(query, [name, peopleId], (err, result) => {
        if (err) {
            console.error('Error updating user name:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User name updated successfully' });
    });
});

// Route pour mettre à jour le téléphone de l'utilisateur
app.put('/api/user/:peopleId/phone', (req, res) => {
    const { peopleId } = req.params;
    const { phone } = req.body;

    const query = `
        UPDATE informations
        SET phone = ?
        WHERE people_id = ?;
    `;
    db.query(query, [phone, peopleId], (err, result) => {
        if (err) {
            console.error('Error updating user phone:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User phone updated successfully' });
    });
});

// Route pour mettre à jour le mot de passe de l'utilisateur
app.put('/api/user/:peopleId/password', (req, res) => {
    const { peopleId } = req.params;
    const { password } = req.body;

    const query = `
        UPDATE people
        SET password = ?
        WHERE people_id = ?;
    `;
    db.query(query, [password, peopleId], (err, result) => {
        if (err) {
            console.error('Error updating user password:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User password updated successfully' });
    });
});

// Route pour supprimer toutes les informations d'un utilisateur
app.delete('/api/user/:peopleId', (req, res) => {
    const { peopleId } = req.params;

    const deleteInformationQuery = `
        DELETE FROM informations
        WHERE people_id = ?;
    `;

    db.query(deleteInformationQuery, [peopleId], (err, result) => {
        if (err) {
            console.error('Error deleting user information:', err);
            return res.status(500).json({ error: 'Database error while deleting user information' });
        }

        const deletePeopleQuery = `
            DELETE FROM people
            WHERE people_id = ?;
        `;

        db.query(deletePeopleQuery, [peopleId], (err, result) => {
            if (err) {
                console.error('Error deleting user from people table:', err);
                return res.status(500).json({ error: 'Database error while deleting user' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
