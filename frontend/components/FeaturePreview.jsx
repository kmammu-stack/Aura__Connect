window.FeaturePreview = () => {
    const [profiles, setProfiles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { user } = window.useAuth() || {}; // Handle if used outside auth context safely, though it shouldn't be

    const fetchProfiles = React.useCallback(async () => {
            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser");
                setLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude: lat, longitude: lng } = position.coords;
                    const res = await fetch(`${window.ENV_API_URL || 'http://localhost:3000'}/nearby?lat=${lat}&lng=${lng}&radius=500`);
                    if (!res.ok) throw new Error('Failed to fetch nearby users');
                    const responseJson = await res.json();
                    
                    const usersArray = responseJson.data || [];
                    const decorated = usersArray
                        .filter(p => !user || p.userId !== user.id && p.id !== user.id) // check both userId and id depending on format
                        .map((p, i) => ({
                            ...p,
                            id: p.userId || p.id,
                            distance: p.distanceMeters ? p.distanceMeters + 'm' : Math.floor(Math.random() * 800) + 'm',
                            lastActive: p.lastActive || 'Just now',
                            color: p.color || ['#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'][i % 4],
                            initialStatus: 'none'
                        }));
                    setProfiles(decorated);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }, (err) => {
            setError("Location access denied.");
            setLoading(false);
        });
}, [user]);

React.useEffect(() => {
    fetchProfiles();
}, [fetchProfiles]);

    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{marginBottom: '4rem'}}>
                    <h2 className="text-4xl text-gradient" style={{marginBottom: '1rem'}}>Discover Opportunities Waiting Near You</h2>
                    <p className="color-secondary text-lg max-w-2xl mx-auto">
                        See how easy it is to securely connect. Click "Connect" to send a networking request. 
                        Discover builders, engineers, and creators around you.
                    </p>
                </div>

                <div className="relative z-10 min-h-[300px]">
                    {loading ? (
    <div className="text-center color-secondary py-12">Finding people near you...</div>
) : error ? (
    <div className="flex flex-col items-center py-12" style={{gap: '1rem'}}>
        <div style={{color: 'var(--c-danger)', fontSize: '0.95rem'}}>{error}</div>
        <button 
            className="btn btn-secondary"
            style={{padding: '0.5rem 1.5rem'}}
            onClick={() => {
                setError(null);
                setLoading(true);
                fetchProfiles();
            }}
        >
            Try Again
        </button>
    </div>
) : profiles.length === 0 ? (
                        <div className="text-center color-secondary py-12">No users found nearby. Try broadcasting your presence!</div>
                    ) : (
                        <div className="grid-3">
                            {profiles.map(profile => (
                                <div key={profile.id}>
                                    <window.PreviewCard profile={profile} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
