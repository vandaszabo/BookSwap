import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import ChatRoom from './ChatRoom';
import { Box } from '@mui/material';
import WaitingRoom from './WaitingRoom';

export default function JoinChat() {

    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const { authUser } = useAuth();

    const joinChatRoom = async (chatRoom) => {
        try {
            const userName = authUser.userName;
            const userImage = authUser.profileImage;

            //initiate connection
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            //set up handler
            conn.on("JoinSpecificChatRoom", (userName, msg) => {
                console.log("user, msg: ", userName, msg);

                setMessages((messages) => [...messages, { userName, msg }]);
            });

            conn.on("ReceiveSpecificMessage", (userImage, msg) => {
                console.log("Spec msg: ", userImage, msg);

                setMessages((messages) => [...messages, { userImage, msg }]);
            });

            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { userName, userImage, chatRoom });
            setConnection(conn);

        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = async(message) => {
        try {
            await conn.invoke("SendMessage", message);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Box sx={{mt: 4}}>
            {!conn 
            ? <WaitingRoom joinChatRoom={joinChatRoom}/>
            : <ChatRoom messages={messages} sendMessage={sendMessage}/>
            }
        </Box>
    )
};