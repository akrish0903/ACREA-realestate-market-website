import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useApi from '../../utils/useApi';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/Chats.module.css';
import { Config } from '../../config/Config';
import { io } from 'socket.io-client';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';

function Chats() {
    const location = useLocation();
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    const dispatch = useDispatch();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatError, setChatError] = useState(null);
    const socketRef = useRef();

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(import.meta.env.VITE_BASE_API_URL || 'http://localhost:4500');

        // Clean up on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!socketRef.current) return;

        // Listen for new messages
        socketRef.current.on('new message', (messageData) => {
            setMessages(prevMessages => [...prevMessages, messageData]);
        });

        return () => {
            socketRef.current.off('new message');
        };
    }, []);

    useEffect(() => {
        fetchConversations();
        if (location.state?.chatId) {
            loadChat(location.state.chatId);
        }
    }, []);

    useEffect(() => {
        console.log('Current messages:', messages);
    }, [messages]);

    useEffect(() => {
        console.log('Current chat:', currentChat);
    }, [currentChat]);

    useEffect(() => {
        if (messages.length > 0) {
            console.log('Messages data:', messages);
            console.log('First message senderId:', messages[0].senderId);
            console.log('User ID:', userAuthData._id);
        }
    }, [messages]);

    useEffect(() => {
        // Try to get ID from localStorage if not in Redux
        if (!userAuthData._id) {
            const storedId = localStorage.getItem("_id");
            console.log("storedId",storedId);
            if (storedId) {
                dispatch(AuthUserDetailsSliceAction.setUsrID(storedId));
            }
        }
    }, []);

    const fetchConversations = async () => {
        try {
            setLoading(true);
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/chats/conversations',
                method: 'GET'
            });
            
            if (response.success) {
                setConversations(response.conversations || []);
            } else {
                setError('Failed to fetch conversations');
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
            setError('Failed to load conversations');
        } finally {
            setLoading(false);
        }
    };

    const loadChat = async (chatId) => {
        try {
            setChatLoading(true);
            setChatError(null);

            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: `/api/chats/${chatId}`,
                method: 'GET'
            });
            
            if (response.success) {
                // Get the current user's ID from Redux or localStorage
                const currentUserId = userAuthData._id || localStorage.getItem("_id");
                
                setCurrentChat({
                    ...response.chat,
                    currentUserId
                });
                setMessages(response.chat.messages || []);
                // Join new chat room
                socketRef.current.emit('join chat', chatId);
            } else {
                setChatError('Failed to load chat');
            }
        } catch (error) {
            console.error('Error loading chat:', error);
            setChatError('Failed to load chat messages');
        } finally {
            setChatLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: '/api/chats/message',
                method: 'POST',
                data: {
                    chatId: currentChat._id,
                    message: newMessage
                }
            });
            
            setMessages([...messages, response.message]);
            setNewMessage('');
            fetchConversations(); // Refresh conversation list
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={`screen ${Styles.chatsContainer}`}>
            <Header />
            <div className={Styles.chatContent}>
                {/* Conversations List */}
                <div className={Styles.conversationsList}>
                    {loading ? (
                        <div className={Styles.loadingState}>Loading conversations...</div>
                    ) : error ? (
                        <div className={Styles.errorState}>{error}</div>
                    ) : conversations.length === 0 ? (
                        <div className={Styles.emptyState}>No conversations yet</div>
                    ) : (
                        conversations.map(conv => (
                            <div 
                                key={conv._id} 
                                className={`${Styles.conversationItem} ${currentChat?._id === conv._id ? Styles.active : ''}`}
                                onClick={() => loadChat(conv._id)}
                            >
                                <img 
                                    src={conv.propertyImage || Config.imagesPaths.property404Image} 
                                    alt="Property" 
                                    className={Styles.propertyThumb}
                                />
                                <div className={Styles.conversationInfo}>
                                    <h4>{conv.propertyName}</h4>
                                    <p>{conv.lastMessage}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Chat Area */}
                <div className={Styles.chatArea}>
                    {currentChat ? (
                        <>
                            <div className={Styles.chatHeader}>
                                <img 
                                    src={currentChat.propertyImage || Config.imagesPaths.property404Image}
                                    alt="Property"
                                />
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <h3>{currentChat.propertyName}</h3>
                                    <p>{currentChat.otherPartyName}</p>
                                </div>
                            </div>

                            <div className={Styles.messagesList}>
                                {chatLoading ? (
                                    <div className={Styles.loadingState}>Loading messages...</div>
                                ) : chatError ? (
                                    <div className={Styles.errorState}>{chatError}</div>
                                ) : messages.length === 0 ? (
                                    <div className={Styles.emptyState}>No messages yet</div>
                                ) : (
                                    messages.map((msg, idx) => {
                                        if (!msg || !msg.senderId) {
                                            console.error('Invalid message:', msg);
                                            return null;
                                        }

                                        const msgSenderId = String(msg.senderId);
                                        const currentUserId = String(userAuthData._id || localStorage.getItem("_id"));
                                        console.log('Message sender ID:', msgSenderId);
                                        console.log('Current user ID:', currentUserId);
                                        const isSentByMe = msgSenderId === currentUserId;
                                        console.log('Is sent by me:', isSentByMe);

                                        return (
                                            <div 
                                                key={msg._id || idx}
                                                className={`${Styles.message} ${isSentByMe ? Styles.sent : Styles.received}`}
                                            >
                                                <p>{msg.message}</p>
                                                <span className={Styles.timestamp}>
                                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className={Styles.messageInput}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </>
                    ) : (
                        <div className={Styles.noChatSelected}>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chats;