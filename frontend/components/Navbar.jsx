const { useState, useEffect } = React;

window.Navbar = () => {
    const { user, login, logout, setIsAuthModalOpen, setAuthMode, setCurrentView } = window.useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenProfile = () => {
        if (window.profileEmitter) window.profileEmitter.open();
    };

    // Create inline icon using SVG since we might not have lucide component
    const MapPinIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--c-accent-light)'}}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
    );

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '1rem 0',
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(15, 17, 21, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
        }}>
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-2" style={{fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)'}}>
                    <MapPinIcon />
                    <span>Aura<span className="text-gradient-accent">Connect</span></span>
                </div>
                
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex gap-4 mr-4 hidden md:flex">
                            <button className="btn btn-outline" style={{border: 'none', padding: '0.5rem 1rem'}} onClick={() => setCurrentView('home')}>
                                Home
                            </button>
                            <button className="btn btn-outline" style={{border: 'none', padding: '0.5rem 1rem'}} onClick={() => setCurrentView('connections')}>
                                Connections
                            </button>
                        </div>
                    )}
                    {!user ? (
                        <>
                            <button className="btn btn-outline" onClick={() => {
                                setAuthMode('login');
                                setIsAuthModalOpen(true);
                            }}>
                                Login
                            </button>
                            <button className="btn btn-primary" onClick={() => {
                                setAuthMode('register_step1');
                                setIsAuthModalOpen(true);
                            }}>
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button 
                                className="btn btn-primary hidden md:flex items-center gap-2" 
                                style={{padding: '0.5rem 1rem'}} 
                                onClick={() => {
                                    if (!navigator.geolocation) {
                                        alert("Geolocation is not supported by your browser");
                                        return;
                                    }
                                    navigator.geolocation.getCurrentPosition(async (position) => {
                                        try {
                                            const { latitude: lat, longitude: lng } = position.coords;
                                            const res = await fetch(`${window.ENV_API_URL || 'http://localhost:3000'}/go-online`, {
                                                method: 'POST',
                                                headers: { 
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${user.token}`
                                                },
                                                body: JSON.stringify({ userId: user?.id, name: user?.name, interests: user?.interests, lat, lng })
                                            });
                                            if (!res.ok) throw new Error('Failed to broadcast presence');
                                            alert('Your presence is now online! Others can see your tags.');
                                        } catch (err) {
                                            alert(err.message);
                                        }
                                    }, (error) => {
                                        alert("Error getting location: " + error.message);
                                    });
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                                Broadcast Presence
                            </button>
                            <span className="color-secondary text-sm hidden md:block">
                                Welcome, <span style={{color: 'var(--c-text-primary)'}}>{user.name}</span>
                            </span>
                            <button className="btn btn-outline" style={{padding: '0.5rem 1rem'}} onClick={handleOpenProfile}>
                                Profile
                            </button>
                            <button className="btn btn-secondary" style={{padding: '0.5rem 1rem'}} onClick={logout}>
                                <UserIcon /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
