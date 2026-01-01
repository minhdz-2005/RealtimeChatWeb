import { useEffect, useState } from "react";
import "./styles/MessageFrom.css";

const MessageFrom = (props) => {
    const { avatarUrl, from, lastActive, status, onClick, lastMessage, isSendByUser } = props;
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const processedLastActive = (lastActive) => {
        const convertedLastActive = new Date(lastActive);
        const diffInMs = now - convertedLastActive;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMs / 3600000);
        const diffInDays = Math.floor(diffInMs / 86400000);
        const diffInWeeks = Math.floor(diffInMs / 604800000);
        const diffInMonths = Math.floor(diffInMs / 2592000000);
        const diffInYears = Math.floor(diffInMs / 31536000000);

        if (diffInMinutes < 1) return "Just now";
        else if (diffInMinutes < 60)
            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        else if (diffInHours < 24)
            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        else if (diffInDays < 7)
            return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        else if (diffInWeeks < 4)
            return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
        else if (diffInMonths < 12)
            return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
        else
            return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }

    const processedLastMessage = (message) => {
        if (isSendByUser) {
            return `You: ${message}`;
        } else {
            return message;
        }
    }

    const renderLastActive = () => {
        if (status === "online") return "Online";
        else return processedLastActive(lastActive);
    };

    return (
        <>
            <div className="messageFrom-root" onClick={onClick}>
                <div className="messageFrom-avatar-wrapper">
                    <img
                        src={avatarUrl}
                        alt={`${from} avatar`}
                        className="messageFrom-avatar"
                    />
                    <span
                        className={`messageFrom-status-dot ${
                            status === "online" || lastActive === 0
                                ? "online"
                                : "offline"
                        }`}
                    ></span>
                </div>

                <div className="messageFrom-info">
                    <span className="messageFrom-name">{from}</span>
                    <span className="messageFrom-lastActive">
                        {lastMessage ? processedLastMessage(lastMessage) : renderLastActive()}
                    </span>
                </div>
            </div>
        </>
    );
};

export default MessageFrom;
