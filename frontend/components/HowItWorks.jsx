window.HowItWorks = () => {
    const steps = [
        {
            title: "Share Interests",
            desc: "Go online and anonymously share what you're passionate about (startups, AI, music, etc).",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            )
        },
        {
            title: "Discover People",
            desc: "See who was recently active around you with similar tags, without exact locations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            )
        },
        {
            title: "Send Interest",
            desc: "Request a connection if their profile looks interesting from up to a mile away.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            )
        },
        {
            title: "Connect & Chat",
            desc: "If they accept, securely chat in real-time to decide if you want to meet up offline.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            )
        }
    ];

    return (
        <section id="how-it-works" className="section" style={{background: 'rgba(0,0,0,0.2)'}}>
            <div className="container">
                <div className="text-center" style={{marginBottom: '4rem'}}>
                    <h2 className="text-4xl" style={{marginBottom: '1rem'}}>How It Works</h2>
                    <p className="color-secondary text-lg max-w-2xl mx-auto">
                        A low-pressure interaction system built for the real world.
                    </p>
                </div>

                <div className="grid-4 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block" style={{
                        position: 'absolute', 
                        top: '24px', 
                        left: '10%', 
                        right: '10%', 
                        height: '2px', 
                        background: 'var(--c-border)',
                        zIndex: 0
                    }}></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center z-10" style={{position: 'relative'}}>
                            <div style={{
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                background: 'var(--c-bg)', 
                                border: '2px solid var(--c-accent)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'var(--c-accent-light)',
                                marginBottom: '1.5rem',
                                boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                            }}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold" style={{marginBottom: '0.75rem'}}>{step.title}</h3>
                            <p className="color-secondary text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
