import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchCart = () => {
        fetch('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [token, navigate]);

    const removeFromCart = (id) => {
        fetch(`http://localhost:5000/api/cart/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.error(err));
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <ShoppingBag size={80} style={{ margin: '0 auto 1.5rem', opacity: 0.3, color: 'var(--primary)' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart feels a bit light</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Add some futuristic gear and checking out will be a breeze.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Keep Exploring
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ flex: '1 1 60%' }}>
                        {cart.map(item => (
                            <div key={item.id} className="card" style={{ display: 'flex', padding: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', marginRight: '1.5rem' }} />
                                <div style={{ flexGrow: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>${item.price.toFixed(2)} &times; {item.quantity}</p>
                                </div>
                                <div style={{ textAlign: 'right', marginLeft: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.8} title="Remove item">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '1 1 35%' }}>
                        <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}>
                                Complete Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
