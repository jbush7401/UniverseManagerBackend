const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

//Register a new user
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const {rows}  = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        res.status(201).json({ user: rows[0] });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Login a user

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const {rows} = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({userId: user.id, username: user.username}, process.env.JWT_SECRET);
            res.json({token});
        } else {
            res.status(401).json({message: 'Invalid username or password'});
        }
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;