import React, { useState } from 'react';
import './PasswordReset.css';

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'If an account with that email exists, a password reset link has been sent.');
                setError('');
            } else {
                setError(data.error || 'An error occurred during password reset.');
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred during password reset.');
            setMessage('');
        }
    };

    return (
        <div className="password-reset-container">
            <h2>Password Reset</h2>
            {message && <p>{message}</p>}
            {error && <p className="error">{error}</p>}
            {!message && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
}

export default PasswordReset;