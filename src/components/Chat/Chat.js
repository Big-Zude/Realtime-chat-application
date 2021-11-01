/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { baseURL }  from "../../config/axiosConfig";
import './Chat.css'
import Message from "../Message/Message";

let socket=io.connect('https://chat-zude.herokuapp.com/');

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const ENDPOINT = baseURL;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        //socket = io(ENDPOINT);
        socket.on('connect', () => console.log('connected to server'))

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room } );
        console.log("zude",socket)
    },[ENDPOINT,location.search]);
    return (
        <Message socket={socket} name={name} room={room}/>
    )
}
export default Chat;