import '../styles/Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CiUser, CiLock } from "react-icons/ci";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-page login-bg">
                {/* Overlay loading layer */}
                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Signing you in...</p>
                    </div>
                )}

                <div className="login-card">
                    <div className="login-header">
                        <img
                            src="../src/assets/images/ChatWebLogo.png"
                            alt="logo"
                            className="logo"
                        />
                        <h1 className="login-title">Welcome back</h1>
                        <p className="login-subtitle">
                            Log in to continue chatting in real-time.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <label htmlFor="username" className="input-label">Username</label>
                        <div className="input-wrapper">
                            <CiUser className="input-icon" />
                            <input
                                type="text"
                                id="username"
                                className="input-field"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <label htmlFor="password" className="input-label">Password</label>
                        <div className="input-wrapper">
                            <CiLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="input-field"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {showPassword ? (
                                <FaRegEye
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <div className="login-extra">
                            <a href="#" className="forgot-pass">Forgot my password</a>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="divider">
                        <span className="line"></span>
                        <span className="text">Or continue with</span>
                        <span className="line"></span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn facebook">
                            <FaFacebook className="social-icon" />
                            <span>Facebook</span>
                        </button>
                        <button type="button" className="social-btn google">
                            <FcGoogle className="social-icon" />
                            <span>Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
