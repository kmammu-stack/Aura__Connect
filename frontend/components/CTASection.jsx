window.CTASection = () => {
    const { user, requireAuth, setIsAuthModalOpen, setAuthMode } = window.useAuth();
    const [isBroadcasting, setIsBroadcasting] = React.useState(false);

    const handleAction = () => {
        requireAuth(() => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
            }
            setIsBroadcasting(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude: lat, longitude: lng } = position.coords;
                    const res = await fetch(`${window.ENV_API_URL || 'http://localhost:3000'}/go-online`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ userId: user?.id || null, name: user?.name, interests: user?.interests, lat, lng })
                    });
                    if (!res.ok) throw new Error('Failed to broadcast presence');
                    alert('Your presence is now online! Others can see your tags.');
                } catch (err) {
                    alert(err.message);
                } finally {
                    setIsBroadcasting(false);
                }
            }, (error) => {
                alert("Error getting location: " + error.message);
                setIsBroadcasting(false);
            });
        });
    };

    return (
        <section className="section" style={{
            position: 'relative',
            background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.1) 100%)',
            borderTop: '1px solid var(--c-border-highlight)',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                bottom: '-200px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '800px',
                height: '400px',
                background: 'var(--c-accent)',
                filter: 'blur(120px)',
                opacity: 0.2,
                zIndex: 0,
                borderRadius: '50%'
            }}></div>

            <div className="container relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl" style={{marginBottom: '1.5rem', fontWeight: 800}}>
                    Start discovering people<br/>around you today
                </h2>
                <p className="color-secondary text-lg max-w-xl mx-auto" style={{marginBottom: '3rem'}}>
                    Join the community of innovators, builders, and thinkers connecting in the real world.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button className="btn btn-primary text-lg" style={{padding: '1rem 3rem'}} onClick={handleAction} disabled={isBroadcasting}>
                        {!user ? 'Go Online' : isBroadcasting ? 'Broadcasting...' : 'Broadcast My Presence'}
                    </button>
                    {!user && (
                        <button className="btn btn-secondary text-lg" style={{padding: '1rem 3rem'}} onClick={() => {
                            setAuthMode('register_step1');
                            setIsAuthModalOpen(true);
                        }}>
                            Register Account
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};
