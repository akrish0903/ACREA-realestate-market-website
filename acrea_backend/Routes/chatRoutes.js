const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../utils/jwt_helper');
const Chat = require('../models/ChatModel');
const UserAuth = require('../models/UserAuthModel');
const UserProperties = require('../models/UserPropertiesModel');
const socketService = require('../services/socket');

// Initiate or continue chat
router.post('/chats/initiate', verifyAccessToken, async (req, res) => {
    try {
        const { receiverId, propertyId, message } = req.body;
        const senderId = req.payload.aud;

        // Check if chat already exists
        let chat = await Chat.findOne({
            $or: [
                { senderId, receiverId, propertyId },
                { senderId: receiverId, receiverId: senderId, propertyId }
            ]
        });

        if (!chat) {
            // Create new chat with initial message
            chat = new Chat({
                senderId,
                receiverId,
                propertyId,
                messages: [{
                    senderId,
                    message,
                    createdAt: new Date()
                }],
                lastMessage: message,
                status: 'active'
            });
            await chat.save();
        }

        res.json({
            success: true,
            chatId: chat._id,
            message: 'Chat initiated successfully'
        });
    } catch (error) {
        console.error('Chat initiation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to initiate chat'
        });
    }
});

// Get all conversations for a user
router.get('/chats/conversations', verifyAccessToken, async (req, res) => {
    try {
        const userId = req.payload.aud;
        
        // Add error checking for userId
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const chats = await Chat.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        })
        .populate('propertyId', 'usrListingName userListingImage')
        .populate('senderId', 'usrFullName')
        .populate('receiverId', 'usrFullName')
        .sort({ updatedAt: -1 });

        // Handle case where propertyId might be null
        const conversations = chats.map(chat => {
            if (!chat.propertyId) {
                return null;
            }
            
            return {
                _id: chat._id,
                propertyName: chat.propertyId.usrListingName,
                propertyImage: chat.propertyId.userListingImage?.[0],
                lastMessage: chat.lastMessage,
                otherPartyName: chat.senderId._id.toString() === userId ? 
                    chat.receiverId?.usrFullName : 
                    chat.senderId?.usrFullName,
                updatedAt: chat.updatedAt
            };
        }).filter(Boolean); // Remove null entries

        res.json({
            success: true,
            conversations
        });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversations',
            error: error.message
        });
    }
});

// Get messages for a specific chat
router.get('/chats/:chatId', verifyAccessToken, async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.payload.aud;

        const chat = await Chat.findById(chatId)
            .populate('propertyId', 'usrListingName userListingImage')
            .populate('senderId', 'usrFullName')
            .populate('receiverId', 'usrFullName');

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Verify user is part of this chat
        if (chat.senderId._id.toString() !== userId && 
            chat.receiverId._id.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access to chat'
            });
        }

        // Determine if current user is sender or receiver to set correct name
        const isAgent = chat.receiverId._id.toString() === userId;
        const otherPartyName = isAgent ? chat.senderId.usrFullName : chat.receiverId.usrFullName;

        // Format the response
        const formattedChat = {
            _id: chat._id,
            propertyName: chat.propertyId.usrListingName,
            propertyImage: chat.propertyId.userListingImage[0],
            otherPartyName: otherPartyName,
            messages: chat.messages.map(msg => ({
                _id: msg._id,
                senderId: msg.senderId.toString(),
                message: msg.message,
                createdAt: msg.createdAt
            }))
        };

        res.json({
            success: true,
            chat: formattedChat
        });
    } catch (error) {
        console.error('Get chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch chat'
        });
    }
});

// Send a new message
router.post('/chats/message', verifyAccessToken, async (req, res) => {
    try {
        const { chatId, message } = req.body;
        const senderId = req.payload.aud;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        // Update last message
        chat.lastMessage = message;
        chat.message = message;
        await chat.save();

        const messageData = {
            senderId: senderId.toString(),
            message,
            createdAt: new Date()
        };

        // Add message to chat
        chat.messages.push(messageData);
        chat.lastMessage = message;
        await chat.save();

        // Emit the message to all users in the chat room
        socketService.getIO().to(chatId).emit('new message', messageData);

        res.json({
            success: true,
            message: messageData
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
});

module.exports = router; 