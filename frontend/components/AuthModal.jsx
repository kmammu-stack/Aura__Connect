window.AuthModal = () => {
    const { isAuthModalOpen, setIsAuthModalOpen, login, register, error, loading, authMode, setAuthMode } = window.useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [selectedInterests, setSelectedInterests] = React.useState([]);
    const [customTopic, setCustomTopic] = React.useState('');
    const [mode, setMode] = React.useState('work');
    const [jobTitle, setJobTitle] = React.useState('');
    const [bio, setBio] = React.useState('');

    const availableTopics = [
        "Startups", "AI", "Design", "Web3", "Marketing", "SaaS", 
        "Engineering", "Product", "Sales", "Investing", "Gaming",
        "E-commerce", "Music", "Fitness", "Crypto", "Content"
    ];
    
    const displayTopics = Array.from(new Set([...availableTopics, ...selectedInterests]));

    if (!isAuthModalOpen) return null;

    const handleNextStep = (e) => {
        e.preventDefault();
        if (authMode === 'register_step1') {
            setAuthMode('register_step2');
        } else if (authMode === 'login') {
            login({ email, password });
        }
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        if (selectedInterests.length === 0) {
            alert("Please select at least one interest!");
            return;
        }
        register({ name, email, password, interests: selectedInterests, mode, jobTitle, bio });
    };

    const toggleInterest = (topic) => {
        setSelectedInterests(prev => 
            prev.includes(topic) 
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    return (
        <div className="modal-backdrop open">
            <div className="modal-content">
                <div className="flex justify-between items-center" style={{marginBottom: '1.5rem'}}>
                    <h2 style={{fontSize: '1.5rem'}}>
                        {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <button className="btn-outline" style={{padding: '0.5rem', borderRadius: '50%', border: 'none'}} onClick={() => setIsAuthModalOpen(false)}>
                        <XIcon />
                    </button>
                </div>
                
                {error && <div style={{padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--c-danger)', color: 'var(--c-danger)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem'}}>
                    {error}
                </div>}

                {authMode === 'register_step2' ? (
                    <div style={{maxHeight: '400px', overflowY: 'auto', paddingRight: '5px'}}>
                        <div className="input-group" style={{marginBottom: '1rem'}}>
                            <label htmlFor="jobTitle">Job Title / Role</label>
                            <input id="jobTitle" type="text" className="input-field" placeholder="e.g. Frontend Engineer, Founder..." value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                        </div>
                        <div className="input-group" style={{marginBottom: '1rem'}}>
                            <label htmlFor="bio">About yourself & expectations</label>
                            <textarea id="bio" className="input-field" placeholder="I'm building an AI startup and looking for a technical cofounder..." value={bio} onChange={(e) => setBio(e.target.value)} rows="3" required />
                        </div>
                        
                        <p className="color-secondary text-sm font-bold" style={{marginBottom: '0.5rem', marginTop: '1rem'}}>
                            Your Primary Mode
                        </p>
                        <div className="flex gap-2" style={{marginBottom: '1.5rem'}}>
                            {['work', 'social', 'chill'].map(m => (
                                <button key={m} type="button" className="btn flex-1" 
                                    style={{
                                        background: mode === m ? 'rgba(139, 92, 246, 0.2)' : 'var(--c-surface)',
                                        border: mode === m ? '1px solid var(--c-accent-light)' : '1px solid var(--c-border)',
                                        textTransform: 'capitalize'
                                    }}
                                    onClick={() => setMode(m)}>
                                    {m}
                                </button>
                            ))}
                        </div>
                        <p className="color-secondary text-sm" style={{marginBottom: '1rem'}}>
                            Select topics you are interested in or add your own custom hashtags:
                        </p>
                        <div className="flex gap-2" style={{marginBottom: '1rem'}}>
                            <input 
                                type="text" 
                                className="input-field" 
                                placeholder="e.g. #MachineLearning" 
                                value={customTopic} 
                                onChange={(e) => setCustomTopic(e.target.value)} 
                                onKeyDown={(e) => { 
                                    if (e.key === 'Enter') { 
                                        e.preventDefault(); 
                                        const trimmed = customTopic.trim();
                                        if (trimmed && !selectedInterests.includes(trimmed)) { 
                                            toggleInterest(trimmed); 
                                            setCustomTopic(''); 
                                        } 
                                    } 
                                }} 
                                style={{marginBottom: 0, flex: 1}}
                            />
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => { 
                                    const trimmed = customTopic.trim();
                                    if (trimmed && !selectedInterests.includes(trimmed)) { 
                                        toggleInterest(trimmed); 
                                        setCustomTopic(''); 
                                    } 
                                }}
                                style={{padding: '0.5rem 1rem'}}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2" style={{marginBottom: '1.5rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '5px'}}>
                            {displayTopics.map(topic => {
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
                        <div className="flex gap-2">
                            <button type="button" className="btn btn-secondary flex-1" onClick={() => setAuthMode('register_step1')}>Back</button>
                            <button type="button" className="btn btn-primary flex-1" onClick={handleFinalSubmit} disabled={loading}>
                                {loading ? 'Creating...' : 'Complete Registration'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="color-secondary text-sm" style={{marginBottom: '1.5rem'}}>
                            {authMode === 'login' 
                                ? 'Sign in to connect with people around you.' 
                                : 'Join to discover nearby like-minded people.'}
                        </p>

                        <form onSubmit={handleNextStep}>
                            {authMode === 'register_step1' && (
                                <div className="input-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input 
                                        id="name" type="text" className="input-field" 
                                        placeholder="Your name" value={name} 
                                        onChange={(e) => setName(e.target.value)} required 
                                    />
                                </div>
                            )}
                            
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email" type="email" className="input-field" 
                                    placeholder="you@example.com" value={email} 
                                    onChange={(e) => setEmail(e.target.value)} required 
                                />
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    id="password" type="password" className="input-field" 
                                    placeholder="••••••••" value={password} 
                                    onChange={(e) => setPassword(e.target.value)} required 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full" style={{marginTop: '1rem'}} disabled={loading}>
                                {authMode === 'login' ? (loading ? 'Signing In...' : 'Sign In') : 'Next: Select Interests'}
                            </button>
                        </form>

                        <p className="color-secondary text-sm text-center" style={{marginTop: '1.5rem'}}>
                            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button 
                                type="button"
                                onClick={() => setAuthMode(authMode === 'login' ? 'register_step1' : 'login')}
                                style={{color: 'var(--c-accent-light)', fontWeight: 600, textDecoration: 'underline'}}
                            >
                                {authMode === 'login' ? 'Register' : 'Sign in'}
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
