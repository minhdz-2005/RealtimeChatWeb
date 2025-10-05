import './styles/Register.css';
import { BsChatLeftText } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerm, setAcceptTerm] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const handleRememberMe = () => {
    //     setRememberMe(!rememberMe);
    // };

    return (
        <div className="register-page">
            <div className="img-left">
                <span className="img-title">Connect - Chat - Share</span>
            </div>

            <div className="form-right">
                <BsChatLeftText className="form-webicon" />
                <span className="form-webname">Secury</span>

                <p className='form-welcome'>Create an account</p>
                <p className='form-subwelcome'>Join your community and keep the conversation going.</p>

                <form className="form-container">
                    <label className='input-label' htmlFor="email">Email</label>
                    <div className="input-container">
                        <CiMail className="input-icon" />
                        <input type="text" id="email" placeholder="Enter your email" className="form-input" />
                    </div>

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

                    <div className="term-check">
                        <input
                            type="checkbox"
                            id="term"
                            checked={acceptTerm}
                            onChange={(e) => setAcceptTerm(e.target.checked)}
                            className="term-checkbox"
                        />
                        <label className="term-label">I accept the <a href="/">terms and conditions</a></label>
                    </div>

                    <button type="submit" className="form-button">Sign up</button>
                </form>

                <p className="signin-prompt">Already have an account? <a href="/"><u>Sign in</u></a></p>
            </div>
        </div>
    );
}

export default Register;