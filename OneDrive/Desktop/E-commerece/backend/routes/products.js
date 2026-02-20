const express = require('express');
const router = express.Router();

const products = [
    { id: '1', name: 'Premium Wireless Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', description: 'Experience pure sound with noise cancellation.' },
    { id: '2', name: 'Minimalist Smartwatch', price: 199.50, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', description: 'Stay connected effortlessly with a sleek design.' },
    { id: '3', name: 'Ergonomic Mechanical Keyboard', price: 149.00, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', description: 'Type with precision on satisfying switches.' },
    { id: '4', name: '4K Action Camera', price: 349.99, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', description: 'Capture every adventure in stunning detail.' },
    { id: '5', name: 'Portable SSD 1TB', price: 119.99, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80', description: 'Ultra-fast storage on the go.' },
    { id: '6', name: 'Wireless Charging Pad', price: 49.99, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80', description: 'Sleek and fast charging for your devices.' }
];

router.get('/', (req, res) => {
    res.json(products);
});

module.exports = router;
