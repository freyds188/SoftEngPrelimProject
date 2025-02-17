const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AsyncStorage = require('@react-native-async-storage/async-storage');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, gender, age, mobile } = req.body; // Accept new fields
    try {
        const userExists = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                resolve(results.length > 0);
            });
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO users (name, email, password, gender, age, mobile) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, email, hashedPassword, gender, age, mobile], // Include new fields in the query
            (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Return the user name in the response
        res.status(201).json({ message: 'User registered successfully', userName: name });
    } catch (error) {
        console.error('Error registering user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email); // Log the email being used for login

    try {
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) {
                    console.error('Database query error:', err); // Log any database query errors
                    return reject(err);
                }
                resolve(results);
            });
        });

        console.log('User found:', user); // Log the user found in the database

        if (user.length === 0) {
            console.log('No user found with this email.'); // Log if no user is found
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        console.log('Password match:', isMatch); // Log the result of the password comparison

        if (!isMatch) {
            console.log('Password does not match.'); // Log if the password does not match
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Optionally, generate a JWT token for the user
        const token = jwt.sign({ id: user[0].id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ message: 'Login successful', user: user[0], token });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;