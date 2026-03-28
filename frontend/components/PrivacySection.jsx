window.PrivacySection = () => {

    const ShieldIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--c-accent-light)', marginBottom: '1.5rem'}}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    );

    return (
        <section className="section" style={{background: 'linear-gradient(180deg, var(--c-bg) 0%, rgba(139, 92, 246, 0.05) 100%)'}}>
            <div className="container">
                <div className="glass-panel" style={{
                    padding: '4rem 2rem', 
                    textAlign: 'center',
                    border: '1px solid var(--c-border-highlight)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--c-accent-light), transparent)'
                    }}></div>

                    <div className="flex justify-center">
                        <ShieldIcon />
                    </div>
                    
                    <h2 className="text-4xl" style={{marginBottom: '1rem'}}>Privacy First. Always.</h2>
                    <p className="color-secondary text-lg max-w-2xl mx-auto" style={{marginBottom: '3rem'}}>
                        We designed NearbyPresence to protect your identity and location. You have total control over what you share and who you connect with.
                    </p>

                    <div className="grid-3 text-left">
                        <div style={{padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)'}}>
                            <h4 className="font-bold text-lg" style={{marginBottom: '0.5rem', color: 'var(--c-success)'}}>No Exact Location</h4>
                            <p className="color-secondary text-sm">We never share your exact coordinates. We only show coarse proximity (e.g., "~200m away").</p>
                        </div>
                        <div style={{padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)'}}>
                            <h4 className="font-bold text-lg" style={{marginBottom: '0.5rem', color: 'var(--c-success)'}}>Temporary Data</h4>
                            <p className="color-secondary text-sm">Your presence data is ephemeral. It expires in 30–60 minutes and is wiped from our servers.</p>
                        </div>
                        <div style={{padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)'}}>
                            <h4 className="font-bold text-lg" style={{marginBottom: '0.5rem', color: 'var(--c-success)'}}>Mutual Consent</h4>
                            <p className="color-secondary text-sm">Identity is anonymous by default. Real identities are only swapped upon mutual agreement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
