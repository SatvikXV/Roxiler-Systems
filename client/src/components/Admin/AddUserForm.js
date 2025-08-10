import React, { useState } from 'react';
import axios from 'axios';
import '../Form.css';

const AddUserForm = ({ onUserAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('normal');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post('http://localhost:5000/api/admin/users', { name, email, password, role }, config);
            setSuccess('User added successfully!');
            setName('');
            setEmail('');
            setPassword('');
            setRole('normal');
            onUserAdded();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add user.');
        }
    };

    return (
        <div className="form-container">
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user-name">Name</label>
                    <input id="user-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="user-email">Email</label>
                    <input id="user-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="user-password">Password</label>
                    <input id="user-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="user-role">Role</label>
                    <select id="user-role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="normal">Normal User</option>
                        <option value="admin">Admin</option>
                        <option value="store_owner">Store Owner</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">Add User</button>
            </form>
            {error && <p className="msg-error">{error}</p>}
            {success && <p className="msg-success">{success}</p>}
        </div>
    );
};

export default AddUserForm;