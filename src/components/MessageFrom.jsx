import "./styles/MessageFrom.css";

const MessageFrom = (props) => {

    return (
        <>
            <div className="messageFrom">
                <img src={props.avatar} alt="avatar" className="avatar" />
                <div className="messageInfo">
                    <span className="from">{props.from}</span>
                    <span className="lastActiveTime">{props.lastActive === 1 ? "1 minute ago" : `${props.lastActive} minutes ago`}</span>
                </div>
            </div>
        </>
    )
}

export default MessageFrom;