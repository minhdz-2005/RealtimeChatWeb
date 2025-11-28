import './styles/Message.css';

const Message = (props) => {
    const { status, message, compact } = props;

    const isSend = status === 'send';

    return (
        <>
            <span
                className={
                    `message-bubble 
                     ${isSend ? 'message-bubble--send' : 'message-bubble--receive'} 
                     ${compact ? 'message-bubble--compact' : ''}`
                }
            >
                {message}
            </span>
        </>
    );
};

export default Message;
