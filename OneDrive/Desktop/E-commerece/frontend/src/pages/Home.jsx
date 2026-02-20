import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const addToCart = (product) => {
        if (!token) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }
        fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ product })
        })
            .catch(err => console.error(err));
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Next-Gen Tech Essentials
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover our curated collection of premium gadgets designed to elevate your everyday experiences.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2.5rem'
            }}>
                {products.map(product => (
                    <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>{product.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.6 }}>
                                {product.description}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'white' }}>
                                    ${product.price.toFixed(2)}
                                </span>
                                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                                    <ShoppingCart size={18} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
