import '../styles/Messages.css';
import MessageFrom from '../components/MessageFrom';
import Message from '../components/Message';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket';

import { CiSearch, CiMenuKebab, CiSettings, CiLogout } from 'react-icons/ci';
import { IoIosClose } from "react-icons/io";
import { IoCheckmarkOutline, IoCheckmarkDoneOutline, IoImageOutline, IoMenuSharp, IoCreateOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy, HiOutlineMicrophone } from "react-icons/hi";
import { PiPaperPlaneTilt, PiGif } from "react-icons/pi";
import { LuUserCog } from "react-icons/lu";

const Messages = () => {

    // data test
    const user = {
        name: "Minh",
        lastActive: 5,
        avatar: "../src/assets/images/logo-light.png"
    };

    // const message = {
    //     content: "minh dep trai",
    //     status: 'Received',
    // };

    // EFFECT FIELD
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [showFormNewConv, setShowFormNewConv] = useState(false);
    const [messageInput, setMessageInput] = useState("");

    // CLICK OUTSIDE EVENT FOR MENU
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
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const threadRef = useRef(null);
    const textareaRef = useRef(null);

    // SCROLL TO BOTTOM WHEN NEW MESSAGE ARRIVE
    useEffect(() => {
        if (threadRef.current) {
            threadRef.current.scrollTop = threadRef.current.scrollHeight;
        }
    }, [messages]);

    // RESTORE SELECTED CONVERSATION FROM LOCALSTORAGE
    useEffect(() => {
        const currentConversationId = localStorage.getItem("currentConversationId");
        if (currentConversationId) {
            const conversation = conversations.find(conv => conv._id === currentConversationId);
            if (conversation) {
                setSelectedConversation(conversation);
            }
        }
    }, [conversations]);

    // console.log("selectedConversation: ", selectedConversation);

    // FETCH MESSAGES WHEN SELECT CONVERSATION
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConversation) return;

            localStorage.setItem("currentConversationId", selectedConversation._id);

            // JOIN ROOM SOCKET.IO
            socket.emit("joinConversation", selectedConversation._id);

            try {
                const token = localStorage.getItem("token");
                if(!token) {
                    return;
                }
                const res = await fetch(`${import.meta.env.VITE_API_URL}/message/${selectedConversation._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || "Failed to fetch messages");
                }

                const data = await res.json();
                setMessages(data || []);

            } catch (err) {
                console.error("Error to fetch messages", err);
            }
        };

        fetchMessages();
    }, [selectedConversation]);

    //console.log("messages: ", currentUser);
    
    // SOCKET.IO SETUP
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        return () => {
            socket.disconnect();
        };
    }, []);

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
                // console.log("data conv", data);
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

    // LISTEN FOR NEW MESSAGES VIA SOCKET.IO
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Kiểm tra nếu message mới thuộc về cuộc trò chuyện hiện tại
            if (selectedConversation && newMessage.conversationId === selectedConversation._id) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [selectedConversation]);

    // SEND MESSAGE LOGIC
    const sendMessage = async (conversationId, content) => {
        // IF CONTENT IS EMPTY
        if (!content.trim()) {
            setMessageInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';   // về lại trạng thái 1 dòng
            }
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                return;
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversationId,
                    sender: currentUser.id,
                    content,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to send message");
            }

            // const data = await res.json();
            // console.log("Sent message data: ", data.data);
            // setMessages((prevMessages) => [...prevMessages, data.data]);
            setMessageInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';   // về lại trạng thái 1 dòng
            }
        } catch (err) {
            console.error("Error to send message", err);
        }
    };

    // CLICK ENTER TO SEND MESSAGE
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(selectedConversation._id, messageInput);
        }
    };

    // AUTO GROW TEXTAREA
    const handleChange = (e) => {
        setMessageInput(e.target.value);

        // auto grow
        const el = e.target;
        
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;

        if (el.value === '') {
            el.style.height = 'auto'; // về lại trạng thái 1 dòng
        }
    };

    // LOGOUT FUNCTION
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentConversationId");
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
                        {/* <MessageFrom
                            from={user.name}
                            lastActive={user.lastActive}
                            avatar={user.avatar}
                        /> */}
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
                                        onClick={() => setSelectedConversation(conv)}
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
                            {selectedConversation ? (
                                <MessageFrom
                                    from={getOtherParticipant(selectedConversation)?.username || "Select a conversation"}
                                    lastActive={user.lastActive}
                                    avatar={user.avatar}
                                />
                            ) : (
                                <span>Select a conversation</span>
                            )}
                        </div>
                        {selectedConversation ? <CiMenuKebab className='messages-main-menu-icon' /> : null}
                    </div>

                    <div className="messages-top-divider"></div>

                    <div className="messages-thread" ref={threadRef}>
                        {messages.length === 0 && (
                            <span className="messages-no-message">No messages yet.</span>
                        )}
                        {messages && messages.map((msg, index) => {
                            const prevMsg = index > 0 ? messages[index - 1] : null;
                            const currentMsg = messages[index];
                            const nextMsg = index < messages.length ? messages[index + 1] : null;
                            let pos = false;

                            const isSameSenderAsPrev = prevMsg && prevMsg.sender._id === currentMsg.sender._id;
                            const isSameSenderAsNext = nextMsg && nextMsg.sender._id === currentMsg.sender._id;
                            
                            // console.log('currentMsg: ', currentMsg);

                            if (currentMsg) {
                                if (isSameSenderAsNext && isSameSenderAsPrev) {
                                    pos = 'mid';
                                }
                                else if (!isSameSenderAsPrev && isSameSenderAsNext) {
                                    pos = 'first';
                                }
                                else if (!isSameSenderAsNext && isSameSenderAsPrev) {
                                    pos = 'last';
                                }
                                else if (!isSameSenderAsNext && !isSameSenderAsPrev) {
                                    pos = 'none';
                                }
                            }
                            return (
                                <Message 
                                    pos={pos} 
                                    className={msg.sender._id === currentUser.id ? 'send' : 'receive'} 
                                    status={msg.sender._id === currentUser.id ? 'send' : 'receive'} 
                                    message={msg.content} key={msg._id} 
                                />
                            )
                        })}
                    </div>

                    <div className="messages-input-wrapper">
                        <div className="messages-input-tools">
                            <HiOutlineEmojiHappy className='messages-message-icon' />
                            <IoImageOutline className='messages-message-icon' />
                            <PiGif className='messages-message-icon' />
                            <HiOutlineMicrophone className='messages-message-icon' />
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={messageInput}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="messages-input-message"
                            placeholder='Say something...'
                            rows={1}
                        />

                        <button 
                            onClick={() => sendMessage(selectedConversation._id, messageInput)} 
                            className="messages-send-button"
                        >
                            <PiPaperPlaneTilt className='messages-send-icon' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;
