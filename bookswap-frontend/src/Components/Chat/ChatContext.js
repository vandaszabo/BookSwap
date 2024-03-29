import React, { useState, useEffect, useContext, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { updateUserConnection } from '../../Utils/UserFunctions';
import { useAuth } from '../Authentication/AuthContext';

const ChatContext = React.createContext();

function useChat() {
    return useContext(ChatContext);
};

function ChatProvider(props) {
    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const { authUser } = useAuth();
    
    const createConnection = useCallback(async (userId) => {
        try {
            const newConn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            //Handle message sending-receiving
            newConn.on("ReceivePrivateMessage", (senderImage, senderName, senderId, msg) => {
                console.log("Received message:", msg);
                setMessages((messages) => [...messages, { senderImage, senderName, senderId, msg }]);
            });

            //Get Receiver connection Id from db and store it in localStorage
            newConn.on("GetConnectionId", (user, connectionId) => {
                localStorage.setItem("receiverConnectionId", connectionId);
            });

            //Start connection
            await newConn.start();

            //Get own connection Id and Update it in db
            const connId = await newConn.invoke("GetOwnConnectionId");
            await updateConnID(userId, connId);
            localStorage.setItem('senderConnectionId', connId);
            setConnection(newConn);
        } catch (error) {
            console.error(error);
        }
    }, []);

    //Re-Create connection after page refresh
    useEffect(() => {
        const storedConnectionId = localStorage.getItem('senderConnectionId');
        if (authUser && authUser.id && storedConnectionId) {
            const initializeConnection = async () => {
                await createConnection(authUser.id);
            };

            initializeConnection();
        }
    }, [authUser, createConnection]);


    //Open Connection
    const openChatConnection = async (userId) => {
        try {
            if (!conn) {
                await createConnection(userId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Update User's ConnectionId in database
    const updateConnID = async (userId, connectionId) => {
        try {
            await updateUserConnection(userId, connectionId);

        } catch (error) {
            console.error(error);
        }
    };

    //Close Connection
    const closeChatConnection = async (userId) => {
        try {
            if (conn) {
                await conn.stop();
                setConnection(null);
                await updateConnID(userId, null);
                setMessages([]);
                localStorage.removeItem('senderConnectionId');
                localStorage.removeItem('receiverConnectionId');
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Send Message to a specific User
    const sendToUser = async (requestData) => {
        try {
            if (conn) {
                //Get receiver's connectionId by its userId
                await conn.invoke("GetClientConnectionId", requestData.receiverId)
                const receiverConnId = localStorage.getItem("receiverConnectionId");
                
                //Send the message with the retrieved connectionId
                await conn.invoke("SendToUser", requestData, receiverConnId);

                //Update messages array in ChatContext
                setMessages((messages) => 
                [...messages, 
                {
                    senderId: requestData.userId, 
                    senderName: requestData.userName,
                    senderImage: requestData.userImage,
                    receiverId: requestData.receiverId,
                    receiverName: requestData.receiverName,
                    msg: requestData.msg 
                }]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const value = {
        conn,
        setConnection,
        openChatConnection,
        closeChatConnection,
        sendToUser,
        messages,
        setMessages,
        receiverId,
        setReceiverId,
        receiverName,
        setReceiverName
    }

    return (
        <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
    )
}

export { ChatProvider, useChat };
