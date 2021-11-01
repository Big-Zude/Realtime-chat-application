import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import './Message.css';

function Message({socket, name, room}) {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    
    const sendMessage =() => {
        if(message !== ''){
            const messageData = {
                message: message,
                name: name,
                room: room,
                createdAt: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setMessage('')
        }
    }
    useEffect(() => {
        socket.on('received_message', (data) => {
            setMessageList((list)=>[...list, data])
            //console.log(data.message)
            setMessage(data.message)
        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                Realtime Chatty
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageX,index) => <div className="message" id={name===messageX.name?'you':'other'}>
                    <div key={index}>
                        <div className="message-content">
                            <p>{messageX.message}</p>
                        </div>
                        <div className="message-meta">
                            <p className="author">{messageX.name}</p>
                            <p className="time">{messageX.createdAt}</p>
                        </div>
                    </div>
                </div>
                )}
                </ScrollToBottom>
            </div>
            <div>
                <input type="text" placeholder="typing..." onChange={(e) => setMessage(e.target.value)} onKeyPress={(event)=>{event.key==='Enter' && sendMessage()}}/>
                <button type="submit" onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Message
