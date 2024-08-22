const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const db = require('./db');

app.get('/roster', async (req, res) => {
    try {
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