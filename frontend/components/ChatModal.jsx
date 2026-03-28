const { useState, useEffect, useRef } = React;

// Simple event emitter attached to window to open chat from anywhere
window.chatEmitter = {
    listeners: [],
    subscribe(fn) { this.listeners.push(fn); },
    openChat(friend) { this.listeners.forEach(fn => fn(friend)); }
};

window.ChatModal = () => {
    const { user } = window.useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [friend, setFriend] = useState(null);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    
    // We only connect when the friend object is set (which means modal is open)
    const { messages, isConnected, sendMessage } = window.useWebSocket(user?.id, friend ? friend.id : null);

    useEffect(() => {
        const handleOpen = (friendData) => {
            setFriend(friendData);
            setIsOpen(true);
        };
        window.chatEmitter.subscribe(handleOpen);
    }, []);

    useEffect(() => {
        // Scroll to bottom on new message
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!isOpen) return null;

    const handleSend = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (inputText.trim()) {
        sendMessage(inputText);
        setInputText('');
    }
};

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    const SendIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
    );

    return (
        <div className="modal-backdrop open">
            <div className="modal-content" style={{padding: '0', display: 'flex', flexDirection: 'column', height: '500px'}}>
                {/* Header */}
                <div style={{padding: '1rem 1.5rem', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--c-surface)'}}>
                    <div className="flex items-center gap-3">
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-surface-active)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
                            {friend?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                            <h3 style={{fontSize: '1.1rem', margin: 0}}>{friend?.name || 'Friend'}</h3>
                            <span className="text-sm" style={{color: isConnected ? 'var(--c-success)' : 'var(--c-warning)'}}>
                                {isConnected ? 'Online' : 'Connecting...'}
                            </span>
                        </div>
                    </div>
                    <button className="btn-outline" style={{padding: '0.5rem', borderRadius: '50%', border: 'none'}} onClick={() => setIsOpen(false)}>
                        <XIcon />
                    </button>
                </div>

                {/* Messages Area */}
                <div style={{flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
                    {!isConnected && (
                        <div className="text-center color-secondary" style={{margin: 'auto'}}>
                            Establishing secure WebSocket connection...
                        </div>
                    )}
                    
                    {messages.map((msg) => {
                        if (msg.sender === 'system') {
                            return (
                                <div key={msg.id} className="text-center text-sm color-secondary" style={{margin: '1rem 0'}}>
                                    <span style={{background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.8rem', borderRadius: '1rem'}}>
                                        {msg.text}
                                    </span>
                                </div>
                            );
                        }
                        
                        const isMe = msg.sender === 'me';
                        return (
                            <div key={msg.id} className={`chat-message ${isMe ? 'sent' : 'received'}`}>
                                {msg.text}
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{padding: '1rem', borderTop: '1px solid var(--c-border)', background: 'var(--c-surface)'}}>
                    <div className="flex gap-2">
    <input 
        type="text" 
        className="input-field" 
        style={{flex: 1, marginBottom: 0}} 
        placeholder="Type a message..." 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
        disabled={!isConnected}
    />
    <button className="btn btn-primary" style={{padding: '0.5rem 1rem'}} 
        onClick={handleSend}
        disabled={!isConnected || !inputText.trim()}>
        <SendIcon />
    </button>
</div>
                </div>
            </div>
        </div>
    );
};
