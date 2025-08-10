import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StoreCard from '../components/Store/StoreCard';
import './UserDashboard.css';

const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const fetchData = useCallback(async () => {
        if (!token) return;
        try {
            const config = { 
                headers: { Authorization: `Bearer ${token}` },
                params: { search }
            };
            const [storesRes, ratingsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/users/stores', config),
               
                axios.get('http://localhost:5000/api/users/my-ratings', config) 
            ]);
            setStores(storesRes.data);
            setRatings(ratingsRes.data);
        } catch (err) {
            setError('Could not fetch data. Please try again.');
            console.error(err);
        }
    }, [search, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!token) {
        return (
            <div className="center-message">
                <h2>Welcome</h2>
                <p>Please <Link to="/login">log in</Link> to rate stores.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="search-bar-container">
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search stores by name or address..."
                    className="search-input"
                />
            </div>
            {error && <p className="msg-error center-message">{error}</p>}
            <div className="store-grid">
                {stores.map(store => {
                    const userRating = ratings.find(r => r.storeId === store.id);
                    return (
                        <StoreCard 
                            key={store.id} 
                            store={store} 
                            userRating={userRating}
                            onRatingSubmitted={fetchData}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UserDashboard;