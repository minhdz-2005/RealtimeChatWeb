import '../styles/Messages.css';
import MessageFrom from '../components/MessageFrom';
import Message from '../components/Message';

import { CiSearch } from 'react-icons/ci';
import { IoCheckmarkOutline, IoCheckmarkDoneOutline, IoImageOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy, HiOutlineMicrophone } from "react-icons/hi";
import { PiPaperPlaneTilt, PiGif } from "react-icons/pi";


const Messages = () => {
    const user = {
        name: "Minh",
        lastActive: 5,
        avatar: "../src/assets/images/logo-light.png"
    }

    const message = {
        content: "minh dep trai",
        status: 'Received',
    }

    return (
        <>
            <div className="messages-page">
                <div className="list-message">
                    <span className="brand-name">Mizum</span>
                    <div className="search-wrapper">
                        <CiSearch className='search-icon'></CiSearch>
                        <input type="text" className="search-bar" placeholder='Search' />
                    </div>
                    
                    <MessageFrom className="message-from" from={user.name} lastActive={user.lastActive} avatar={user.avatar} />
                </div>

                <div className="right-field">
                    <MessageFrom from={user.name} lastActive={user.lastActive} avatar={user.avatar} />
                    <div className="line"></div>

                    <div className="messages">
                        <div className="receive-message">
                            <img src="../src/assets/images/logo-light.png" alt="avatar" className="message-avatar" />
                            <Message message="minh dep trai"></Message>
                        </div>

                        <div className="my-message">
                            <Message message={message.content}></Message>
                            
                            <div className="status-wrapper">
                                {message.status === 'Received' ? <IoCheckmarkOutline className='check-icon' /> : <></>}
                                {message.status === 'Read' ? <IoCheckmarkDoneOutline className='check-icon' /> : <></>}
                                <span className="status">{message.status}</span>
                            </div>
                            
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <HiOutlineEmojiHappy className='message-icons'></HiOutlineEmojiHappy>
                        <IoImageOutline className='message-icons'></IoImageOutline>
                        <PiGif className='message-icons'></PiGif>
                        <HiOutlineMicrophone className='message-icons'></HiOutlineMicrophone>

                        <input type="text" className="input-message" placeholder='Say something' />

                        <PiPaperPlaneTilt className='sent-icon'></PiPaperPlaneTilt>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messages;