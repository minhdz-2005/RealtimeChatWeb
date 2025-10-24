import '../styles/Login.css';

import { useState } from 'react';

import { CiUser, CiLock } from "react-icons/ci";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <div className="login-page">
                <img src="../src/assets/images/logo-light.png" alt="logo" className="logo" />

                <form action="" className="login-form">
                    <label htmlFor="username" className="input-label">Username</label>
                    <div className="input-wrapper">
                        <CiUser className="input-icon" />
                        <input type="text" id="username" className="input-field" placeholder="Enter your username" />
                    </div>

                    <label htmlFor="password" className="input-label">Password</label>
                    <div className="input-wrapper">
                        <CiLock className="input-icon" />
                        <input type={showPassword ? "text" : "password"} id="password" className="input-field" placeholder="Enter your password" />
                        {showPassword ? (
                            <FaRegEye className="eye-icon" onClick={togglePasswordVisibility} />
                        ) : (
                            <FaRegEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                        )}
                    </div>

                    <a href="#" className="forgot-pass">Forgot my password</a>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="divider">
                    <span className="line"></span>
                    <span className="text">Or continue with</span>
                    <span className="line"></span>
                </div>

                <div className="social-login">
                    <button className="facebook">
                        <FaFacebook className="social-icon" />
                        Facebook
                    </button>
                    <button className="google">
                        <FcGoogle className="social-icon" />
                        Google
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
