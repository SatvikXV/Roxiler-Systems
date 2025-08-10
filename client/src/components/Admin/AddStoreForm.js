import React, { useState } from 'react';
import axios from 'axios';
import '../Form.css';

const AddStoreForm = ({ onStoreAdded }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const storeData = { name, address };
            if (ownerId) {
                storeData.ownerId = ownerId;
            }
            await axios.post('http://localhost:5000/api/admin/stores', storeData, config);
            setSuccess('Store added successfully!');
            setName('');
            setAddress('');
            setOwnerId('');
            onStoreAdded(); 
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add store.');
        }
    };

    return (
        <div className="form-container">
            <h3>Add New Store</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="store-name">Store Name</label>
                    <input id="store-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="store-address">Address</label>
                    <textarea id="store-address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="store-owner">Owner ID (Optional)</label>
                    <input id="store-owner" type="number" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} placeholder="Enter user ID of the owner" />
                </div>
                <button type="submit" className="btn-submit">Add Store</button>
            </form>
            {error && <p className="msg-error">{error}</p>}
            {success && <p className="msg-success">{success}</p>}
        </div>
    );
};

export default AddStoreForm;