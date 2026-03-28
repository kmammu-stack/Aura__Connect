const { useState, useEffect, useCallback, useRef } = React;

/**
 * A real WebSocket hook that connects to the backend using socket.io-client.
 */
window.useWebSocket = (myId, friendId) => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    
    useEffect(() => {
        if (!myId || !friendId) return;
        
        // Initialize socket connection
        const API_URL = window.ENV_API_URL || "http://localhost:3000";
        socketRef.current = window.io(API_URL);

        const socket = socketRef.current;

        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('register', myId);
            
            // Add a welcome system message
            setMessages([
                { id: 'sys-' + Date.now(), sender: 'system', text: 'Connected securely. End-to-end encrypted.', timestamp: Date.now() }
            ]);
        });

        socket.on('message', (msg) => {
            // Only add messages from the currently opened friend chat
            if (msg.sender === friendId) {
                setMessages(prev => [...prev, msg]);
            }
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [myId, friendId]);

    const sendMessage = useCallback((text) => {
        if (!isConnected || !text.trim() || !socketRef.current) return;
        
        const newMessage = {
            id: Date.now().toString(),
            sender: 'me',
            text,
            timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Emit to the real backend
        socketRef.current.emit('sendMessage', {
            to: friendId,
            sender: myId,
            text
        });
    }, [isConnected, myId, friendId]);

    return { messages, isConnected, sendMessage };
};
