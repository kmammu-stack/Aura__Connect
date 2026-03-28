const { useState } = React;

window.PreviewCard = ({ profile }) => {
    const { user, requireAuth } = window.useAuth();
    const [status, setStatus] = useState(profile.initialStatus || 'none'); // 'none', 'pending', 'approved'

    const handleAction = () => {
        requireAuth(async () => {
            if (status === 'none') {
                setStatus('pending');
                try {
                    const API_URL = window.ENV_API_URL || 'http://localhost:3000';
                    const res = await fetch(`${API_URL}/connect`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: user.id, targetId: profile.id })
                    });
                    if (res.ok) {
                        setStatus('approved');
                    } else {
                        setStatus('none');
                    }
                } catch(e) {
                    setStatus('none');
                }
            } else if (status === 'approved') {
                // Open chat
                window.chatEmitter.openChat(profile);
            }
        });
    };

    const StatusBadge = () => {
        if (status === 'pending') {
            return <div className="tag" style={{background: 'var(--c-warning)', color: '#000', border: 'none'}}>Request Sent</div>;
        }
        if (status === 'approved') {
            return <div className="tag" style={{background: 'var(--c-success)', color: '#000', border: 'none'}}>Mutually Approved</div>;
        }
        return <div className="tag">Active {profile.lastActive}</div>;
    };

    const getButtonText = () => {
        if (status === 'none') return 'Connect';
        if (status === 'pending') return 'Waiting...';
        if (status === 'approved') return 'Chat Now';
    };

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            transition: 'transform var(--transition-bounce), box-shadow var(--transition-fast)',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '50%', 
                        background: profile.color || 'var(--c-surface-active)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', fontWeight: 600
                    }}>
                        {profile.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg" style={{lineHeight: 1.2}}>
                            {profile.name}
                        </h4>
                        <span className="color-secondary text-sm">
                            ~{profile.distance} away
                        </span>
                    </div>
                </div>
                <StatusBadge />
            </div>

            <div>
                <span className="color-secondary text-sm font-bold block" style={{marginBottom: '0.5rem'}}>Shared Interests:</span>
                <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, idx) => (
                        <span key={idx} className="tag tag-accent">{interest}</span>
                    ))}
                </div>
            </div>

            <button 
                className={`btn w-full ${status === 'approved' ? 'btn-primary' : (status === 'pending' ? 'btn-secondary' : 'btn-outline')}`} 
                onClick={handleAction}
                disabled={status === 'pending'}
                style={{
                    marginTop: '0.5rem',
                    border: status === 'none' ? '1px solid var(--c-accent-light)' : undefined,
                    color: status === 'none' ? 'var(--c-text-primary)' : undefined
                }}
            >
                {status === 'approved' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
                {getButtonText()}
            </button>
        </div>
    );
};
