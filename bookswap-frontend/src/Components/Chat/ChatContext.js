import React, { useState, useEffect, useContext } from 'react';
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
    const { authUser } = useAuth();

    useEffect(() => {
        const storedConnectionId = localStorage.getItem('senderConnectionId');
        if (storedConnectionId) {
            const userId = authUser.id;
            const initializeConnection = async () => {
                await createConnection(userId);
            };

            initializeConnection();
        }
    }, []);

    const createConnection = async (userId) => {
        try {
            const newConn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            //Handle message sending-receiving
            newConn.on("ReceivePrivateMessage", (userImage, msg) => {
                console.log("Private msg: ", userImage, msg);
                setMessages((messages) => [...messages, { userImage, msg }]);
            });

            //Get Receiver connection Id from db
            newConn.on("GetConnectionId", (user, connectionId) => {
                console.log("GetClientConnId: ", user, connectionId);
                localStorage.setItem("receiverConnectionId", connectionId);
            });

            //Start connection
            await newConn.start();

            //Get own connection Id and Update it in db
            const connId = await newConn.invoke("GetOwnConnectionId");
            console.log("own connectionid: ", connId);
            await updateConnID(userId, connId);
            localStorage.setItem('senderConnectionId', connId);
            setConnection(newConn);
        } catch (error) {
            console.error(error);
        }
    };


    const openChatConnection = async (userId) => {
        try {
            if (!conn) {
                await createConnection(userId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateConnID = async (userId, connectionId) => {
        try {
            const responseData = await updateUserConnection(userId, connectionId);
            console.log("Updated user(conn id): ", responseData);

        } catch (error) {
            console.error(error);
        }
    };

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

    const sendToUser = async (data) => {
        try {
            if (conn) {
                await conn.invoke("GetClientConnectionId", data.receiverId)
                const receiverConnId = localStorage.getItem("receiverConnectionId");
                await conn.invoke("SendToUser", data, receiverConnId);
                setMessages((messages) => [...messages, { userImage: data.userImage, msg: data.msg }]);
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
        setMessages
    }

    return (
        <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
    )
}

export { ChatProvider, useChat };
