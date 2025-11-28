import '../styles/Profile.css';

import { CiEdit } from "react-icons/ci";
import { BsGenderMale, BsGenderFemale, BsGenderTrans, BsQuestionLg } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { FiPhone } from "react-icons/fi";
import { LuUserRoundPen, LuUsers, LuUserX, LuUserPlus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { useState, useEffect, useRef } from "react";

const Profile = () => {

    const user = {
        name: 'Nguyen Duc Minh',
        avatarUrl: 'https://i.pinimg.com/736x/35/5a/c9/355ac931b4ff2deed77e8e7fedd3f763.jpg',
        coverPhotoUrl: 'https://i.pinimg.com/1200x/f6/de/eb/f6deeb73c59af4aa4c78799a427e52fa.jpg',
        phone: '0123 456 789',
        bio: 'đi cùng giọng hát của Tuấn từ ngày còn ngồi trên ghế nhà trường, tới giờ cũng đã ra đời chục năm. Giọng hát của Tuấn cũng khác xưa nhiều. chỉ có điều sao mình nghe càng thấy cảm xúc. thời trẻ Tuấn hát bay bổng mà mạnh mẽ, giờ đây giọng ca trở nên trấm lắng và cảm xúc nhiều hơn.',
        gender: 'unrevealed',
        dateOfBirth: '21/02/2005',
        location: {
            country: 'Vietnam',
            city: 'Thanh Hoa'
        },
        status: 'online',
        lastSeen: Date.now(),
        friends: 1,
        friendRequests: null,
        blockedUsers: null,
        settings: {
            theme: 'light',
            language: 'en',
            notifications: false,
            privacy: {
                showLastSeen: true,
                showOnlineStatus: true,
            }
        }
    }

    const [dropdownFriendSelect, setDropdownFriendSelect] = useState('FRIENDS');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    
    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="profile-page">
            <div className="upper-container">
                <img src={`${user.coverPhotoUrl}`} alt="" className="cover-photo" />
                <img src={`${user.avatarUrl}`} alt="" className="avatar" />

                <span className="profile-name">{user.name}</span>
                <span className="status">{user.status}</span>

                <span className="profile-bio">{user.bio}</span>
                <CiEdit className="edit-bio-icon" />
            </div>

            <div className="lower-container">
                <div className="infor-card">
                    <span className="info-label">INFORMATION</span>
                    <LuUserRoundPen className='edit-info-icon'></LuUserRoundPen>

                    <div className="info-item">
                        <div className="info-container">
                            {user.gender === 'male' ? <BsGenderMale className="info-icon" /> :
                            user.gender === 'female' ? <BsGenderFemale className="info-icon" /> :
                            user.gender === 'other' ? <BsGenderTrans className="info-icon" /> :
                            <BsQuestionLg className="info-icon" />}
                            <span className="info-value">{user.gender}</span>
                        </div>

                        <div className="info-container">
                            <HiOutlineCalendarDateRange className="info-icon" />
                            <span className="info-value">{user.dateOfBirth}</span>
                        </div>

                        <div className="info-container">
                            <IoLocationOutline className="info-icon" />
                            <span className="info-value">{user.location.city} - {user.location.country}</span>
                        </div>

                        <div className="info-container">
                            <FiPhone className="info-icon" />
                            <span className="info-value">{user.phone}</span>
                        </div>
                    </div>

                    {dropdownFriendSelect && (<button className="friend-select" onClick={() => setShowDropdown(!showDropdown)} ><IoIosArrowDown /> {dropdownFriendSelect}</button>)}
                        
                    <div className={`dropdown-friend-selector ${showDropdown ? 'show' : ''}`} ref={dropdownRef}>
                        <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('FRIENDS'); setShowDropdown(!showDropdown); }}><LuUsers className="dropdown-icon" /> FRIENDS</button>
                        <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('REQUESTS'); setShowDropdown(!showDropdown); }}><LuUserPlus className="dropdown-icon" /> FRIEND REQUESTS</button>
                        <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('BLOCKED'); setShowDropdown(!showDropdown); }}><LuUserX className="dropdown-icon" /> BLOCKED USERS</button>
                    </div>
                    
                    <div className="friend-container">
                        {user.friends && (
                            <div className="friend-list">
                                {/* Render friend list here */}
                            </div>,
                            <button className="view-all-btn">View All</button>
                        )}

                        
                    </div>
                </div>

                <div className="posts-section">
                    post - coming soon !!!
                </div>
            </div>
        </div>
    );
}

export default Profile;