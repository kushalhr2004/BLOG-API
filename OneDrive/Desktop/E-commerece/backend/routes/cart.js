const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// In-memory carts, mapped by userId
const carts = {};

router.use(authMiddleware);

router.get('/', (req, res) => {
    const userId = req.user.id;
    res.json(carts[userId] || []);
});

router.post('/', (req, res) => {
    const userId = req.user.id;
    const { product } = req.body;

    if (!product || !product.id) {
        return res.status(400).json({ message: 'Product is required' });
    }

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const existingItemIndex = carts[userId].findIndex(item => item.productId === product.id);
    if (existingItemIndex > -1) {
        carts[userId][existingItemIndex].quantity += 1;
    } else {
        carts[userId].push({
            id: Date.now().toString(),
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    res.status(201).json(carts[userId]);
});

router.delete('/:id', (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.id;

    if (carts[userId]) {
        carts[userId] = carts[userId].filter(item => item.id !== itemId);
    }
    res.json(carts[userId] || []);
});

module.exports = router;
