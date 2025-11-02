import '../styles/Messages.css';
import MessageFrom from '../components/MessageFrom';
import Message from '../components/Message';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { CiSearch, CiMenuKebab, CiSettings, CiLogout } from 'react-icons/ci';
import { IoIosClose } from "react-icons/io";
import { IoCheckmarkOutline, IoCheckmarkDoneOutline, IoImageOutline, IoMenuSharp  } from "react-icons/io5";
import { HiOutlineEmojiHappy, HiOutlineMicrophone } from "react-icons/hi";
import { PiPaperPlaneTilt, PiGif } from "react-icons/pi";
import { LuUserCog } from "react-icons/lu";

const Messages = () => {
    const user = {
        name: "Minh",
        lastActive: 5,
        avatar: "../src/assets/images/logo-light.png"
    };

    const message = {
        content: "minh dep trai",
        status: 'Received',
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <div className="messages-page">
                <div className="list-message">
                    <div className="logo-and-menu">
                        <span className="brand-name">Mizum</span>

                        <div className="menu-wrapper" ref={menuRef}>
                            {menuOpen && (
                                <IoIosClose
                                    className='close-icon'
                                    onClick={() => setMenuOpen(!menuOpen)}
                                />) || (
                                <IoMenuSharp 
                                    className='menu-icon'
                                    onClick={() => setMenuOpen(!menuOpen)}
                                />
                            )}

                            <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`}>
                                <button onClick={() => navigate('/profile')} className="menu-item"><LuUserCog className='menu-icons'></LuUserCog> Profile</button>
                                <button className="menu-item"><CiSettings className='menu-icons'></CiSettings> Settings</button>
                                <button className="menu-item logout" onClick={handleLogout}><CiLogout className='menu-icons'></CiLogout> Log out</button>
                            </div>
                        </div>
                    </div>

                    <div className="search-wrapper">
                        <CiSearch className='search-icon' />
                        <input type="text" className="search-bar" placeholder='Search' />
                    </div>

                    <MessageFrom from={user.name} lastActive={user.lastActive} avatar={user.avatar} />
                </div>

                <div className="right-field">
                    <div className="name-and-menu">
                        <MessageFrom from={user.name} lastActive={user.lastActive} avatar={user.avatar} />
                        <CiMenuKebab className='menu-icon' />
                    </div>

                    <div className="line"></div>

                    <div className="messages">
                        <div className="receive-message">
                            <img src="../src/assets/images/logo-light.png" alt="avatar" className="message-avatar" />
                            <Message message="minh dep trai" />
                        </div>

                        <div className="my-message">
                            <Message message={message.content} />
                            <div className="status-wrapper">
                                {message.status === 'Received' && <IoCheckmarkOutline className='check-icon' />}
                                {message.status === 'Read' && <IoCheckmarkDoneOutline className='check-icon' />}
                                <span className="status">{message.status}</span>
                            </div>
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <HiOutlineEmojiHappy className='message-icons' />
                        <IoImageOutline className='message-icons' />
                        <PiGif className='message-icons' />
                        <HiOutlineMicrophone className='message-icons' />
                        <input type="text" className="input-message" placeholder='Say something' />
                        <PiPaperPlaneTilt className='sent-icon' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;
