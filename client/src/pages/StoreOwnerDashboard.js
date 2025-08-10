import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreOwnerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('http://localhost:5000/api/store-owner/dashboard', config);
                setDashboardData(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Could not fetch dashboard data.');
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h2>Store Owner Dashboard</h2>
            {error && <p className="msg-error">{error}</p>}
            {dashboardData && (
                <div className="stats-container">
                    <div className="stat-card">
                        Average Rating
                        <span>{dashboardData.averageRating}</span>
                    </div>
                </div>
            )}
            {dashboardData?.ratings.length > 0 && (
                 <div className="list-container">
                    <h3>Ratings Received</h3>
                    <ul className="item-list">
                        {dashboardData.ratings.map(rating => (
                            <li key={rating.id}>
                                <strong>{rating.user.name}</strong> gave a rating of <strong>{rating.rating}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StoreOwnerDashboard;