const { Server } = require('socket.io');
let io;

module.exports = {
    init: (httpServer) => {
        io = new Server(httpServer, {
            cors: {
                origin: process.env.CORS_URL,
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            // Join a chat room
            socket.on('join chat', (chatId) => {
                socket.join(chatId);
                console.log(`User joined chat: ${chatId}`);
            });

            // Leave a chat room
            socket.on('leave chat', (chatId) => {
                socket.leave(chatId);
                console.log(`User left chat: ${chatId}`);
            });

            // Handle disconnect
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
}; 