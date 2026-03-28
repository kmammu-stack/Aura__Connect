window.HeroSection = () => {
    const { requireAuth } = window.useAuth();

    const handleGetStarted = () => {
        requireAuth(() => {
            alert('Welcome! You can now start discovering people.');
            // In a real app, this might scroll down or navigate to a dashboard
        });
    };

    const ArrowRightIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    );

    return (
        <section className="section" style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '8rem',
            overflow: 'hidden'
        }}>
            {/* Background glow effects */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--c-accent-glow) 0%, transparent 70%)',
                opacity: 0.5,
                zIndex: -1,
                filter: 'blur(60px)'
            }}></div>

            <div className="container flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10">
                <div className="animate-fade-up">
                    <span className="tag tag-accent mb-4" style={{marginBottom: '1rem'}}>
                        New: Real-time Encrypted Chatting
                    </span>
                    <h1 className="text-4xl md:text-6xl text-gradient" style={{marginBottom: '1.5rem', fontWeight: 800}}>
                        Connect with Like-Minded<br/>People Around You
                    </h1>
                </div>

                <p className="text-lg md:text-xl color-secondary animate-fade-up delay-1" style={{maxWidth: '800px', marginBottom: '3rem', lineHeight: 1.6}}>
                    Find people nearby who share your interests in startups, projects, and ideas — without pressure or awkward conversations.
                </p>

                <div className="flex gap-4 animate-fade-up delay-2">
                    <button className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}} onClick={handleGetStarted}>
                        Get Started <ArrowRightIcon />
                    </button>
                    <button className="btn btn-secondary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}} onClick={() => {
                        document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Learn More
                    </button>
                </div>
                
                <div className="animate-fade-up delay-3" style={{marginTop: '4rem'}}>
                    <div className="glass-panel" style={{padding: '0.75rem 1.5rem', display: 'inline-flex', gap: '2rem', alignItems: 'center'}}>
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-xl">2,400+</span>
                            <span className="color-secondary text-sm">Active nearby</span>
                        </div>
                        <div style={{width: '1px', height: '40px', background: 'var(--c-border)'}}></div>
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-xl text-gradient-accent">100%</span>
                            <span className="color-secondary text-sm">Private & Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
