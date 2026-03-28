window.Connections = () => {
    const [profiles, setProfiles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { user, requireAuth } = window.useAuth() || {};

    const fetchConnections = React.useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        try {
            const API_URL = window.ENV_API_URL || 'http://localhost:3000';
            const res = await fetch(`${API_URL}/connections?userId=${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!res.ok) throw new Error('Failed to fetch connections');
            const data = await res.json();
            
            const decorated = (data.data || []).map(p => ({
                ...p,
                id: p.userId || p.id,
                initialStatus: 'approved',
                color: p.color || '#4caf50' 
            }));
            setProfiles(decorated);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    React.useEffect(() => {
        requireAuth(fetchConnections);
    }, [fetchConnections, requireAuth]);

    return (
        <section className="section" style={{minHeight: '80vh', paddingTop: '8rem'}}>
            <div className="container">
                <div className="text-center" style={{marginBottom: '4rem'}}>
                    <h2 className="text-4xl text-gradient" style={{marginBottom: '1rem'}}>Your Connections</h2>
                    <p className="color-secondary text-lg max-w-2xl mx-auto">
                        People you have connected with on Aura Connect.
                    </p>
                </div>

                <div className="relative z-10 min-h-[300px]">
                    {loading ? (
                        <div className="text-center color-secondary py-12">Loading connections...</div>
                    ) : error ? (
                        <div className="flex flex-col items-center py-12" style={{gap: '1rem'}}>
                            <div style={{color: 'var(--c-danger)', fontSize: '0.95rem'}}>{error}</div>
                            <button className="btn btn-secondary" onClick={() => { setError(null); setLoading(true); fetchConnections(); }}>Try Again</button>
                        </div>
                    ) : profiles.length === 0 ? (
                        <div className="text-center color-secondary py-12">No connections yet. Go to Home to connect with nearby people!</div>
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
