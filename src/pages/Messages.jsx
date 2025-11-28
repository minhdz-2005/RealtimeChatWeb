import '../styles/Messages.css';
import MessageFrom from '../components/MessageFrom';
import Message from '../components/Message';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { CiSearch, CiMenuKebab, CiSettings, CiLogout } from 'react-icons/ci';
import { IoIosClose } from "react-icons/io";
import { IoCheckmarkOutline, IoCheckmarkDoneOutline, IoImageOutline, IoMenuSharp, IoCreateOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy, HiOutlineMicrophone } from "react-icons/hi";
import { PiPaperPlaneTilt, PiGif } from "react-icons/pi";
import { LuUserCog } from "react-icons/lu";

const Messages = () => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    // data test
    const user = {
        name: "Minh",
        lastActive: 5,
        avatar: "../src/assets/images/logo-light.png"
    };

    const message = {
        content: "minh dep trai",
        status: 'Received',
    };

    // EFFECT FIELD

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [showFormNewConv, setShowFormNewConv] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setShowFormNewConv(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    
    // LOGIC FIELD
    const [conversations, setConversations] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("user"));


    // FETCH CONVERSATION
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const token = localStorage.getItem("token");
                if(!token) {
                    return;
                }

                const res = await fetch(`${import.meta.env.VITE_API_URL}/conversation`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || "Failed to fetch conversation");
                }

                const data = await res.json();
                console.log("data conv", data);
                setConversations(data || []);

            } catch (err) {
                console.error("Error to fetch conversation", err);
            }
        };

        fetchConversations();
    }, []);

    // GET OTHER FROM CONVERSATION
    const getOtherParticipant = (conversation) => {
        if (!currentUser) return null;

        // console.log("conv p: ", conversation.participants);

        // Giả sử backend populate "participants"
        const others = (conversation.participants || []).filter(
            (p) => p._id !== currentUser.id
        );

        // Nếu là chat 1-1 thì others[0] chính là người cần hiển thị
        return others[0] || conversation.participants?.[0] || null;
    };

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <div className="messages-page messages-shell">
                {/* Sidebar trái */}
                <div className="messages-sidebar">
                    <div className="messages-sidebar-header">
                        <span className="messages-brand-name">Mizum</span>

                        <div className="messages-menu-wrapper">
                            {menuOpen ? (
                                <IoIosClose
                                    className='messages-close-icon'
                                    onClick={() => setMenuOpen(false)}
                                />
                            ) : (
                                <IoMenuSharp
                                    className='messages-menu-icon'
                                    onClick={() => setMenuOpen(true)}
                                />
                            )}

                            <div ref={menuRef} className={`messages-dropdown-menu ${menuOpen ? 'show' : ''}`}>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="messages-menu-item"
                                >
                                    <LuUserCog className='messages-menu-item-icon' />
                                    Profile
                                </button>
                                <button className="messages-menu-item">
                                    <CiSettings className='messages-menu-item-icon' />
                                    Settings
                                </button>
                                <button
                                    className="messages-menu-item messages-logout"
                                    onClick={handleLogout}
                                >
                                    <CiLogout className='messages-menu-item-icon' />
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="messages-search-wrapper">
                        <CiSearch className='messages-search-icon' />
                        <input
                            type="text"
                            className="messages-search-bar"
                            placeholder='Search'
                        />
                        <IoCreateOutline onClick={() => setShowFormNewConv(true)} className='messages-create-icon' />
                        {showFormNewConv && (
                            <div className="messages-new-conv-overlay">
                                <div ref={menuRef} className="messages-new-conv-form">
                                    <div className="messages-new-conv-header">
                                        <h4 className="messages-new-conv-title">New conversation</h4>
                                        <button
                                            type="button"
                                            className="messages-new-conv-close"
                                            onClick={() => setShowFormNewConv(false)}
                                        >
                                            <IoIosClose />
                                        </button>
                                    </div>

                                    <form className="messages-new-conv-body">
                                        <div className="messages-new-conv-field">
                                            <label htmlFor="new-conv-to" className="messages-new-conv-label">
                                                To:
                                            </label>
                                            <input
                                                id="new-conv-to"
                                                type="text"
                                                className="messages-new-conv-input"
                                                placeholder="Enter username"
                                            />
                                        </div>

                                        <div className="messages-new-conv-actions">
                                            <button
                                                type="submit"
                                                className="messages-new-conv-btn messages-new-conv-btn--primary"
                                            >
                                                Start chat
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="messages-conversations">
                        <MessageFrom
                            from={user.name}
                            lastActive={user.lastActive}
                            avatar={user.avatar}
                        />
                        {/* Sau này map list conversations ở đây */}
                        {!conversations.length === 0 && (
                            <span>No conversation yet.</span>
                        )}

                        {conversations && (
                            conversations.map((conv) => {
                                const other = getOtherParticipant(conv);
                                // console.log("other: ", other);

                                return (
                                    <MessageFrom 
                                        key={conv._id}
                                        from={other?.username || "Ngu"}
                                        lastActive={user.lastActive}
                                        avatar={user.avatar}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Khu vực chat chính */}
                <div className="messages-main">
                    <div className="messages-main-header">
                        <div className="messages-main-user">
                            <MessageFrom
                                from={user.name}
                                lastActive={user.lastActive}
                                avatar={user.avatar}
                            />
                        </div>
                        <CiMenuKebab className='messages-main-menu-icon' />
                    </div>

                    <div className="messages-top-divider"></div>

                    <div className="messages-thread">
                        <div className="messages-receive">
                            <img
                                src="../src/assets/images/logo-light.png"
                                alt="avatar"
                                className="messages-message-avatar"
                            />
                            <Message status='receive' message="minh dep trai" />
                        </div>

                        <div className="messages-send">
                            <Message status='send' message={message.content} />
                            <div className="messages-status-wrapper">
                                {message.status === 'Received' && (
                                    <IoCheckmarkOutline className='messages-check-icon' />
                                )}
                                {message.status === 'Read' && (
                                    <IoCheckmarkDoneOutline className='messages-check-icon' />
                                )}
                                <span className="messages-status-text">{message.status}</span>
                            </div>
                        </div>
                    </div>

                    <div className="messages-input-wrapper">
                        <div className="messages-input-tools">
                            <HiOutlineEmojiHappy className='messages-message-icon' />
                            <IoImageOutline className='messages-message-icon' />
                            <PiGif className='messages-message-icon' />
                            <HiOutlineMicrophone className='messages-message-icon' />
                        </div>

                        <input
                            type="text"
                            className="messages-input-message"
                            placeholder='Say something...'
                        />

                        <button className="messages-send-button">
                            <PiPaperPlaneTilt className='messages-send-icon' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;
