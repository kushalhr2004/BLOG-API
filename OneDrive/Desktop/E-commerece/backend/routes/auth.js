const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // In-memory users array
const SECRET_KEY = 'super_secret_ecomm_key';

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = { id: Date.now().toString(), username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
        res.json({ token, user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
