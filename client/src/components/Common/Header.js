import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            setUser(null);
        }
    }, [location]); 

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        switch (user.role) {
            case 'admin':
                return '/admin';
            case 'store_owner':
                return '/store-owner';
            default:
                return '/dashboard';
        }
    };

    return (
        <header className="main-header">
            <div className="logo">
                <Link to={getDashboardLink()}>StoreRatings</Link>
            </div>
            <nav className="main-nav">
                <ul>
                    {user ? (
                        <>
                            <li><span className="welcome-text">Welcome, {user.name}</span></li>
                            <li><Link to={getDashboardLink()}>Dashboard</Link></li>
                            <li><button onClick={logoutHandler} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;