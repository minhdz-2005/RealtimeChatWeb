import './styles/Login.css';
import { BsChatLeftText } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const handleRememberMe = () => {
    //     setRememberMe(!rememberMe);
    // };

    return (
        <div className="login-page">
            <div className="img-left">
                <span className="img-title">Where conversations begin...</span>
            </div>

            <div className="form-right">
                <BsChatLeftText className="form-webicon" />
                <span className="form-webname">Secury</span>

                <p className='form-welcome'>Welcome back!</p>
                <p className='form-subwelcome'>Access your conversations and connect instantly.</p>

                <form className="form-container">
                    <label className='input-label' htmlFor="username">Username</label>
                    <div className="input-container">
                        <CiUser className="input-icon" />
                        <input type="text" id="username" placeholder="Enter your username" className="form-input" />
                    </div>

                    <label className='input-label' htmlFor="password">Password</label>
                    <div className="input-container">
                        <CiLock className="input-icon" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder="Enter your password" 
                            className="form-input" 
                        />
                        <div 
                            className="password-toggle" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="remember-checkbox"
                        />
                        <label className="remember-label">Remember me</label>
                    </div>
                    
                    <button type="submit" className="form-button">Sign in</button>
                </form>

                <p className="signup-prompt">Don't have an account? <a href="/"><u>Create an account</u></a></p>
            </div>
        </div>
    );
}

export default Login;