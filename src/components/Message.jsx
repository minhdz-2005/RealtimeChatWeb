import './styles/Message.css';

const Message = (props) => {
    const { status, message, pos } = props;

    const isSend = status === 'send';

    return (
        <>
            <span
                className={
                    `message-bubble 
                     ${isSend ? 'send' : 'receive'} 
                     ${pos}`
                }
            >
                {message}
            </span>
        </>
    );
};

export default Message;
