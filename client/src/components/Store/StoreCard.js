import React, { useState } from 'react';
import axios from 'axios';
import './StoreCard.css';

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= rating ? "on" : "off"}
                        onClick={() => setRating(index)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};


const StoreCard = ({ store, userRating, onRatingSubmitted }) => {
    const [rating, setRating] = useState(userRating ? userRating.rating : 0);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmitRating = async () => {
        if (rating === 0) {
            setError('Please select a rating from 1 to 5.');
            return;
        }
        setError('');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (userRating) {
                
                await axios.put(`http://localhost:5000/api/users/ratings/${userRating.id}`, { rating }, config);
            } else {
                
                await axios.post('http://localhost:5000/api/users/ratings', { storeId: store.id, rating }, config);
            }
            onRatingSubmitted(); 
        } catch (err) {
            setError('Failed to submit rating.');
        }
    };

    return (
        <div className="store-card">
            <h3 className="store-name">{store.name}</h3>
            <p className="store-address">{store.address}</p>
            <div className="rating-section">
                <h4>Your Rating</h4>
                <StarRating rating={rating} setRating={setRating} />
                <button className="btn-submit-rating" onClick={handleSubmitRating}>
                    {userRating ? 'Update Rating' : 'Submit Rating'}
                </button>
                {error && <p className="msg-error">{error}</p>}
            </div>
        </div>
    );
};

export default StoreCard;