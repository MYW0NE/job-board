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
    const { ad_id, message, userId, isLoggedIn } = req.body;

    // Vérification des données nécessaires
    if (!ad_id || !message || (isLoggedIn && !userId)) {
        return res.status(400).json({ error: 'Les champs ad_id, message, et userId (pour les utilisateurs connectés) sont obligatoires.' });
    }

    if (isLoggedIn) {
        // L'utilisateur est connecté : on met à jour les informations dans la table `informations`
        const checkQuery = `SELECT * FROM informations WHERE people_id = ?;`;
        
        // Vérifier si la ligne existe déjà pour cet utilisateur
        db.query(checkQuery, [userId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', err);
                return res.status(500).json({ error: 'Erreur de la base de données lors de la vérification de l\'utilisateur.' });
            }

            if (results.length === 0) {
                // Si aucune ligne n'existe pour cet utilisateur, renvoyer une erreur
                return res.status(404).json({ error: 'Aucune information trouvée pour cet utilisateur.' });
            } else {
                // Effectuer la mise à jour
                const updateQuery = `
                    UPDATE informations 
                    SET ad_id = ?, message = ? 
                    WHERE people_id = ?;
                `;
                db.query(updateQuery, [ad_id, message, userId], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de la candidature:', err);
                        return res.status(500).json({ error: 'Erreur lors de la mise à jour dans la base de données.' });
                    }
                    res.status(200).json({ message: 'Candidature mise à jour avec succès' });
                });
            }
        });
    } else {
        // Si l'utilisateur n'est pas connecté, on insère une nouvelle ligne avec les informations fournies
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Les champs email, name et phone sont obligatoires pour les utilisateurs non connectés.' });
        }

        const insertQuery = `
            INSERT INTO informations (ad_id, name, email, phone, message)
            VALUES (?, ?, ?, ?, ?);
        `;
        db.query(insertQuery, [ad_id, name, email, phone, message], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion de la candidature:', err);
                return res.status(500).json({ error: 'Erreur lors de l\'insertion dans la base de données.' });
            }
            res.status(200).json({ message: 'Candidature soumise avec succès' });
        });
    }
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

// Route pour gérer le login des utilisateurs
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'root@root.com' && password === 'Fparad0x?') {
        // Admin login
        res.cookie('userId', 1, { httpOnly: true }); // Assigne un cookie pour l'admin
        return res.status(200).json({ message: 'Login successful', role: 'admin', name: 'Admin', userId: 1 });
    }
    else {
        const query = `
            SELECT people.people_id, people.role, informations.name, informations.phone, people.password
            FROM informations
            JOIN people ON informations.people_id = people.people_id
            WHERE informations.email = ?;
        `;
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', err);
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            if (result.length === 0) {
                return res.status(401).json({ error: 'Email non trouvé' });
            }

            const user = result[0];
            const storedPassword = user.password;

            if (password === storedPassword) {
                // Login réussi
                res.cookie('userId', user.people_id, { httpOnly: true }); // Enregistre l'id de l'utilisateur dans un cookie
                return res.status(200).json({ message: 'Login successful', role: user.role, name: user.name, userId: user.people_id });
            } else {
                // Mot de passe incorrect
                return res.status(401).json({ error: 'Mot de passe incorrect' });
            }
        });
    }
});

app.get('/api/user-profile', (req, res) => {
    const userId = req.query.userId; // Assurez-vous que l'ID de l'utilisateur est passé dans la requête

    console.log('Requête pour le profil utilisateur avec userId:', userId);

    if (!userId) {
        return res.status(400).json({ error: "ID utilisateur manquant" });
    }

    const query = `
        SELECT informations.name, informations.email, informations.phone, people.password
        FROM informations
        JOIN people ON informations.people_id = people.people_id
        WHERE people.people_id = ?;
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du profil :', err);
            return res.status(500).json({ error: 'Erreur de base de données' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Aucun utilisateur trouvé" });
        }
        res.status(200).json(result[0]); // Renvoie les informations trouvées
    });
});
app.put('/api/user-profile', (req, res) => {
    const { userId, name, email, phone, password } = req.body;

    console.log('Received update request for user:', userId, name, email, phone, password); // Log for debugging

    const updateQuery = `
        UPDATE people
        JOIN informations ON people.people_id = informations.people_id
        SET informations.name = ?, informations.email = ?, informations.phone = ?, people.password = ?
        WHERE people.people_id = ?;
    `;

    db.query(updateQuery, [name, email, phone, password, userId], (err, result) => {
        if (err) {
            console.error('Error updating user profile:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User profile updated successfully:', result); // Log to verify update success
        res.status(200).json({ message: 'Profile updated successfully' });
    });
});
// Route pour supprimer un utilisateur
app.delete('/api/delete-user/:userId', (req, res) => {
    const { userId } = req.params;

    // Supprimer d'abord les informations dans la table informations
    const deleteInformationsQuery = `DELETE FROM informations WHERE people_id = ?`;
    db.query(deleteInformationsQuery, [userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression des informations :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression des informations' });
        }

        // Supprimer ensuite l'utilisateur dans la table people
        const deletePeopleQuery = `DELETE FROM people WHERE people_id = ?`;
        db.query(deletePeopleQuery, [userId], (err, result) => {
            if (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', err);
                return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
