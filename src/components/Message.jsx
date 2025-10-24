import './styles/Message.css';

const Message = (props) => {

    return (
        <>
            <span className='message'>{props.message}</span>
        </>
    );
}

export default Message;