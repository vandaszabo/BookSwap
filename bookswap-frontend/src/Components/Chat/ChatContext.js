import React, { useState, useEffect, useContext, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { updateUserConnection } from '../../Utils/UserFunctions';
import { useAuth } from '../Authentication/AuthContext';
import { sendMessageToDb } from '../../Utils/MessageFunctions';

const ChatContext = React.createContext();

function useChat() {
    return useContext(ChatContext);
};

function ChatProvider(props) {
    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [receivers, setReceivers] = useState([]);
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
                setReceivers((prevReceivers) => {
                    const isExistingReceiver = prevReceivers.some((receiver) => receiver.userId === senderId);
                    if (!isExistingReceiver) {
                        return [...prevReceivers, { userId: senderId, userName: senderName }];
                    }
                    return prevReceivers;
                });

                setMessages((messages) =>
                    [...messages,
                    {
                        isDelivered: true,
                        senderId,
                        senderName,
                        senderImage,
                        receiverId: authUser.id,
                        receiverName: authUser.userName,
                        msg
                    }]);

            });

            //Get Receiver connection Id from db
            newConn.on("GetConnectionId", (user, connectionId) => {
                console.log("Receiver conn id: ", connectionId);
                localStorage.setItem("receiverConnId", connectionId);
            });

            //Start connection
            await newConn.start();

            //Get own connection Id and Update it in db
            const connId = await newConn.invoke("GetOwnConnectionId");
            localStorage.setItem("ownConnId", connId);

            await updateConnID(userId, connId);
            setConnection(newConn);
        } catch (error) {
            console.error(error);
        }
    }, [authUser]);

    //Re-Create connection after page refresh
    useEffect(() => {
        if (authUser && authUser.id && !conn) {
            const initializeConnection = async () => {
                await createConnection(authUser.id);
            };

            initializeConnection();
        }
    }, [authUser, createConnection, conn]);


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
                localStorage.removeItem("receiverConnId");
                localStorage.removeItem("ownConnId");
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Send Message to a specific User
    const sendToUser = async (requestData) => {
        try {
            if (conn) {
                // Get own connection ID
                const ownConnId = localStorage.getItem("ownConnId");

                await conn.invoke("GetClientConnectionId", ownConnId, requestData.receiverId);

                //Get receiver's connectionId by its userId
                const receiverConnId = localStorage.getItem("receiverConnId");

                console.log("Client conn id:", receiverConnId);

                if (receiverConnId === "null") {
                    console.log("Offline client connection id:", receiverConnId);
                    //Store the message in Database
                    const savedMsg = await sendMessageToDb(requestData.userId, requestData.receiverId, JSON.stringify(requestData.msg));
                    console.log("Saved msg: ", savedMsg);

                    //Update messages array in ChatContext
                    setMessages((messages) =>
                        [...messages,
                        {
                            isDelivered: false,
                            senderId: requestData.userId,
                            senderName: requestData.userName,
                            senderImage: requestData.userImage,
                            receiverId: requestData.receiverId,
                            receiverName: requestData.receiverName,
                            msg: requestData.msg
                        }]);

                } else {
                    //Send the message with the retrieved connectionId
                    await conn.invoke("SendToUser", requestData, receiverConnId);
                    console.log("Online client conn id: ", receiverConnId);

                    //Update messages array in ChatContext
                    setMessages((messages) =>
                        [...messages,
                        {
                            isDelivered: true,
                            senderId: requestData.userId,
                            senderName: requestData.userName,
                            senderImage: requestData.userImage,
                            receiverId: requestData.receiverId,
                            receiverName: requestData.receiverName,
                            msg: requestData.msg
                        }]);
                }
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
        receivers,
        setReceivers
    }

    return (
        <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
    )
}

export { ChatProvider, useChat };
