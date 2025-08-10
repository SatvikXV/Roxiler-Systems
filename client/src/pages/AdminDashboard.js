import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import AddStoreForm from '../components/Admin/AddStoreForm';
import AddUserForm from '../components/Admin/AddUserForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [stores, setStores] = useState([]);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const token = localStorage.getItem('token');

    const fetchData = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [dashRes, storesRes, usersRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/dashboard', config),
                axios.get('http://localhost:5000/api/admin/stores', config),
                axios.get('http://localhost:5000/api/admin/users', config)
            ]);
            setDashboardData(dashRes.data);
            setStores(storesRes.data);
            setUsers(usersRes.data);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, fetchData]);

    const filteredUsers = useMemo(() => {
        let sortedUsers = [...users].sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        if (!filter) return sortedUsers;
        return sortedUsers.filter(user =>
            user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.toLowerCase())
        );
    }, [users, filter, sortKey]);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div className="stats-container">
                <div className="stat-card">Total Users <span>{dashboardData?.userCount}</span></div>
                <div className="stat-card">Total Stores <span>{dashboardData?.storeCount}</span></div>
                <div className="stat-card">Total Ratings <span>{dashboardData?.ratingCount}</span></div>
            </div>
            <div className="dashboard-grid">
                <AddStoreForm onStoreAdded={fetchData} />
                <AddUserForm onUserAdded={fetchData} />
            </div>

            <div className="list-container">
                <h3>Users</h3>
                <div className="filter-sort-controls">
                    <input
                        type="text"
                        placeholder="Filter users by name or email..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-input"
                    />
                    <select onChange={(e) => setSortKey(e.target.value)} value={sortKey} className="sort-select">
                        <option value="name">Sort by Name</option>
                        <option value="email">Sort by Email</option>
                        <option value="role">Sort by Role</option>
                    </select>
                </div>
                <ul className="item-list">
                    {filteredUsers.map(user => <li key={user.id}>{user.name} ({user.email}) - <strong>{user.role}</strong></li>)}
                </ul>
            </div>

            <div className="list-container">
                <h3>Stores</h3>
                <ul className="item-list">
                    {stores.map(store => <li key={store.id}>{store.name} - <em>{store.address}</em></li>)}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;