import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    // Poll cart count every 2 seconds if user is logged in
    useEffect(() => {
        let interval;
        if (token) {
            const fetchCart = () => {
                fetch('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(data => {
                        const count = data.reduce((acc, item) => acc + item.quantity, 0);
                        setCartCount(count);
                    })
                    .catch(err => console.error(err));
            };
            fetchCart(); // initial fetch
            interval = setInterval(fetchCart, 2000);
        } else {
            setCartCount(0);
        }
        return () => clearInterval(interval);
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    <Package className="brand-icon" style={{ color: 'var(--primary)' }} />
                    Nexus
                </Link>
                <div className="navbar-nav">
                    <Link to="/" className="nav-link">Products</Link>

                    {user ? (
                        <>
                            <Link to="/cart" className="nav-link cart-icon-wrapper">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                Logout ({user.username})
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
