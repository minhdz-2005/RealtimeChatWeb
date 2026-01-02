import './styles/Message.css';

const Message = (props) => {
    const { isSendByUser, message, pos, status, showStatus } = props;

    const isSend = isSendByUser === 'send';


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
            {isSend && showStatus && (
                <span 
                    className='status'
                >
                    {status}
                </span>
            )}
        </>
    );
};

export default Message;
