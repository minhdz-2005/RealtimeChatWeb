import '../styles/Profile.css';

import { CiEdit } from "react-icons/ci";
import { BsGenderMale, BsGenderFemale, BsGenderTrans, BsQuestionLg } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { FiPhone } from "react-icons/fi";
import { LuUserRoundPen, LuUsers, LuUserX, LuUserPlus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { useState, useEffect, useRef } from "react";

// FOR LOGGED IN USER PROFILE PAGE
const Profile = () => {
    const [profile, setProfile] = useState(null);
    
    // FETCH PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            const StoredUser = JSON.parse(localStorage.getItem('user'));
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${StoredUser.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

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
            {profile && (
                <>
                    <div className="upper-container">
                        <img src={`${profile.coverPhotoUrl}`} alt="Cover Photo" className="cover-photo" />
                        <img src={`${profile.avatarUrl}`} alt="Avatar" className="avatar" />

                        <span className="profile-name">{profile.name}</span>
                        <span className="status">{profile.status}</span>

                        <span className="profile-bio">{profile.bio}</span>
                        <CiEdit className="edit-bio-icon" />
                    </div>

                    <div className="lower-container">
                        <div className="infor-card">
                            <span className="info-label">INFORMATION</span>
                            <LuUserRoundPen className='edit-info-icon'></LuUserRoundPen>

                            <div className="info-item">
                                <div className="info-container">
                                    {profile.gender === 'male' ? <BsGenderMale className="info-icon" /> :
                                    profile.gender === 'female' ? <BsGenderFemale className="info-icon" /> :
                                    profile.gender === 'other' ? <BsGenderTrans className="info-icon" /> :
                                    <BsQuestionLg className="info-icon" />}
                                    <span className="info-value">{profile.gender}</span>
                                </div>

                                <div className="info-container">
                                    <HiOutlineCalendarDateRange className="info-icon" />
                                    <span className="info-value">{profile.dateOfBirth}</span>
                                </div>

                                <div className="info-container">
                                    <IoLocationOutline className="info-icon" />
                                    <span className="info-value">{profile.location.city} - {profile.location.country}</span>
                                </div>

                                <div className="info-container">
                                    <FiPhone className="info-icon" />
                                    <span className="info-value">{profile.phone}</span>
                                </div>
                            </div>

                            {dropdownFriendSelect && (<button className="friend-select" onClick={() => setShowDropdown(!showDropdown)} ><IoIosArrowDown /> {dropdownFriendSelect}</button>)}
                                
                            <div className={`dropdown-friend-selector ${showDropdown ? 'show' : ''}`} ref={dropdownRef}>
                                <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('FRIENDS'); setShowDropdown(!showDropdown); }}><LuUsers className="dropdown-icon" /> FRIENDS</button>
                                <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('REQUESTS'); setShowDropdown(!showDropdown); }}><LuUserPlus className="dropdown-icon" /> FRIEND REQUESTS</button>
                                <button className="dropdown-item" onClick={() => { setDropdownFriendSelect('BLOCKED'); setShowDropdown(!showDropdown); }}><LuUserX className="dropdown-icon" /> BLOCKED USERS</button>
                            </div>
                            
                            <div className="friend-container">
                                {profile.friends && (
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
                </>
            )}
        </div>
    );
}

export default Profile;