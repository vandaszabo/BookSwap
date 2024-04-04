import { useEffect, useState } from 'react';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';
import { getUnDelivered } from '../../Utils/MessageFunctions';
import { fetchUserById } from '../../Utils/UserFunctions';
import { setDeliveryStatusInDb } from '../../Utils/MessageFunctions';

const UnDelivered = () => {
    const { authUser } = useAuth();
    const { setReceivers, setMessages } = useChat();
    const [dbMessages, setDbMessages] = useState([]);
    const [senderIds, setSenderIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const messages = await getUnDelivered(authUser.id);
                setDbMessages(messages);
                const uniqueSenderIds = Array.from(new Set(messages.map(msg => msg.senderId)));
                setSenderIds(uniqueSenderIds);
                const messageIds = messages.map(message => message.messageId);
                if(messageIds.length > 0){
                    console.log(messageIds);
                    await setDeliveryStatusInDb(messageIds);
                }

            } catch (error) {
                console.error("Error fetching undelivered messages:", error);
            }
        };

        fetchData();
    }, [authUser, setDbMessages, setSenderIds]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await Promise.all(senderIds.map(id => fetchUserById(id)));
                const senders = users.map(user => ({
                    userId: user.id,
                    userName: user.userName,
                    userImage: user.profileImage
                }));

                setReceivers(prevReceivers => {
                    const existingIds = prevReceivers.map(user => user.userId);
                    const newReceivers = senders.filter(user => !existingIds.includes(user.userId));
                    return [...prevReceivers, ...newReceivers];
                });

                const mergedMessages = dbMessages.map(message => {
                    const sender = senders.find(user => user.userId === message.senderId);

                    return {
                        isDelivered: true,
                        messageId: message.messageId,
                        senderId: message.senderId,
                        senderName: sender.userName,
                        senderImage: sender.userImage,
                        receiverId: message.receiverId,
                        receiverName: authUser.userName,
                        msg: message.messageText
                    };
                });

                setMessages(messages => {
                    const existingMessageIds = messages.map(message => message.messageId);
                    const filteredMergedMessages = mergedMessages.filter(message => !existingMessageIds.includes(message.messageId));
                    return [...messages, ...filteredMergedMessages];
                });

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (senderIds.length > 0) {
            fetchUsers();
        }
    }, [senderIds, setReceivers, setMessages, dbMessages, authUser]);

    return null;
}

export default UnDelivered;
