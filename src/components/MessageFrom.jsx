import "./styles/MessageFrom.css";

const MessageFrom = (props) => {
    const { avatar, from, lastActive, status, onClick } = props;

    const renderLastActive = () => {
        if (status === "online" || lastActive === 0) return "Online";
        if (lastActive === 1) return "1 minute ago";
        return `${lastActive} minutes ago`;
    };

    return (
        <>
            <div className="messageFrom-root" onClick={onClick}>
                <div className="messageFrom-avatar-wrapper">
                    <img
                        src={avatar}
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
                        {renderLastActive()}
                    </span>
                </div>
            </div>
        </>
    );
};

export default MessageFrom;
