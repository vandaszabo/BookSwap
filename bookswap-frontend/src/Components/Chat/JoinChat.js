import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import { Box, Alert, Button } from '@mui/material';
import WaitingRoom from './WaitingRoom';
import PrivateChat from './PrivateChat';

export default function JoinChat() {

    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [connectionId, setConnectionId] = useState(null);
    const { authUser } = useAuth();

    const joinPrivateChat = async () => {
        try {
            //initiate connection
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("ReceivePrivateMessage", (userImage, msg) =>{
                console.log("Private msg: ", userImage, msg);

                setMessages((messages) => [...messages, { userImage, msg }]);
            });

            await conn.start();
            const connId = await conn.invoke("GetConnectionId");

            setConnectionId(connId);
            setConnection(conn);

        } catch (error) {
            console.error(error);
        }
    };

    const sendToUser = async(receiverConnId, msg)=>{
        const userImage = authUser.profileImage;
        try {
            await conn.invoke("SendToUser", userImage, receiverConnId, msg);
            setMessages((messages) => [...messages, { userImage, msg }]);
        } catch (error) {
            console.error(error);
        }
    };

    const exitChat = async () => {
        try {
            if (conn) {
                await conn.stop();
                setConnection(null);
                setConnectionId(null);
                setMessages([]);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Box sx={{mt: 4}}>
            {connectionId && <Alert severity="success">Your connection ID: {connectionId}</Alert>}
            {!conn 
            ? 
            <WaitingRoom joinPrivateChat={joinPrivateChat} /> :
            <>
                <PrivateChat messages={messages} sendToUser={sendToUser} />
                <Button onClick={exitChat} variant="contained" color="secondary">Exit Chat</Button>
            </>
            }
        </Box>
    )
};