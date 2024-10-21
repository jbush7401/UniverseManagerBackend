require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const authenticateToken = require('./middleware/auth');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Register the user routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/roster/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const {rows} = await db.query('SELECT * FROM wrestlers');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});