window.ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateProfile, deleteAccount, error, loading } = window.useAuth();
    const [selectedInterests, setSelectedInterests] = React.useState([]);
    const [name, setName] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);

    const availableTopics = [
        "Startups", "AI", "Design", "Web3", "Marketing", "SaaS", 
        "Engineering", "Product", "Sales", "Investing", "Gaming",
        "E-commerce", "Music", "Fitness", "Crypto", "Content"
    ];

    React.useEffect(() => {
        if (user) {
            setSelectedInterests(user.interests || []);
            setName(user.name || '');
        }
    }, [user, isOpen]);

    if (!isOpen || !user) return null;

    const toggleInterest = (topic) => {
        setSelectedInterests(prev => 
            prev.includes(topic) 
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const handleUpdate = async () => {
        const res = await updateProfile({ interests: selectedInterests, name });
        if (res.success) {
            alert("Profile updated successfully!");
            onClose();
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
            setIsDeleting(true);
            const res = await deleteAccount();
            if (res.success) {
                alert("Account deleted.");
                onClose();
            }
            setIsDeleting(false);
        }
    };

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    return (
        <div className="modal-backdrop open">
            <div className="modal-content" style={{maxWidth: '500px'}}>
                <div className="flex justify-between items-center" style={{marginBottom: '1.5rem'}}>
                    <h2 style={{fontSize: '1.5rem'}}>Your Profile</h2>
                    <button className="btn-outline" style={{padding: '0.5rem', borderRadius: '50%', border: 'none'}} onClick={onClose}>
                        <XIcon />
                    </button>
                </div>
                
                {error && <div style={{padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--c-danger)', color: 'var(--c-danger)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem'}}>
                    {error}
                </div>}

                <div className="input-group" style={{marginBottom: '1.5rem'}}>
                    <label htmlFor="profileName">Display Name</label>
                    <input 
                        id="profileName" type="text" className="input-field" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <p className="color-secondary text-sm font-bold" style={{marginBottom: '0.5rem'}}>
                    Your Interests
                </p>
                <div className="flex flex-wrap gap-2" style={{marginBottom: '2rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '5px'}}>
                    {availableTopics.map(topic => {
                        const isSelected = selectedInterests.includes(topic);
                        return (
                            <button 
                                key={topic}
                                type="button"
                                onClick={() => toggleInterest(topic)}
                                className="tag"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.5rem 1rem',
                                    background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'var(--c-surface)',
                                    color: isSelected ? 'white' : 'var(--c-text-primary)',
                                    border: isSelected ? '1px solid var(--c-accent-light)' : '1px solid var(--c-border)',
                                    transition: 'all 0.2s'
                                }}>
                                {topic} {isSelected && '✓'}
                            </button>
                        );
                    })}
                </div>

                <button type="button" className="btn btn-primary w-full" onClick={handleUpdate} disabled={loading} style={{marginBottom: '2rem'}}>
                    {loading ? 'Saving...' : 'Save Profile'}
                </button>

                <div style={{borderTop: '1px solid var(--c-danger)', paddingTop: '1.5rem'}}>
                    <h4 className="font-bold text-sm" style={{color: 'var(--c-danger)', marginBottom: '0.5rem'}}>Danger Zone</h4>
                    <p className="color-secondary text-xs" style={{marginBottom: '1rem'}}>
                        Permanently delete your account and all associated data.
                    </p>
                    <button 
                        className="btn w-full" 
                        style={{background: 'rgba(239, 68, 68, 0.1)', color: 'var(--c-danger)', border: '1px solid var(--c-danger)'}}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};
