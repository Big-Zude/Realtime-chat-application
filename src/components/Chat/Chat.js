/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { baseURL }  from "../../config/axiosConfig";
import './Chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const ENDPOINT = baseURL;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        const socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room } );
        console.log("zude",socket)
    },[ENDPOINT,location.search]);
    return (
        <><h1>Chat</h1><h2>{name}</h2><h2>{room}</h2></>
    )
}
export default Chat;