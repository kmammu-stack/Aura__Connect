window.WhyThisPlatform = () => {
    const benefits = [
        {
            title: "Find teammates for startups",
            desc: "Discover local innovators who complement your skillset."
        },
        {
            title: "Designed for real-world",
            desc: "Our goal is to get you offline, grabbing coffee and networking."
        },
        {
            title: "Works well for introverts",
            desc: "Break the ice virtually before deciding to meet face-to-face."
        },
        {
            title: "No feeds, no distractions",
            desc: "Forget doomscrolling. No followers, likes, or endless content feeds."
        }
    ];

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--c-success)'}}>
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );

    return (
        <section className="section">
            <div className="container">
                <div className="grid-2 items-center">
                    <div>
                        <h2 className="text-4xl text-gradient" style={{marginBottom: '1.5rem'}}>
                            Meaningful connections, without the noise.
                        </h2>
                        <p className="color-secondary text-lg" style={{marginBottom: '2rem', lineHeight: 1.6}}>
                            Traditional social media isolates us. Real-world networking events can be forced and awkward. We provide a magical middle-ground.
                        </p>
                        
                        <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                            {benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.1)', 
                                        padding: '0.5rem', 
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    }}>
                                        <CheckIcon />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg" style={{marginBottom: '0.25rem'}}>{b.title}</h4>
                                        <p className="color-secondary text-sm">{b.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="flex justify-center" style={{padding: '2rem'}}>
                        {/* Decorative Graphic */}
                        <div className="glass-panel" style={{
                            width: '100%', 
                            maxWidth: '400px', 
                            height: '500px', 
                            position: 'relative',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute', 
                                width: '300px', 
                                height: '300px', 
                                background: 'var(--c-accent-light)', 
                                filter: 'blur(100px)', 
                                borderRadius: '50%', 
                                opacity: 0.2,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}></div>
                            
                            <div className="flex flex-col gap-4" style={{padding: '2rem', position: 'absolute', inset: 0, justifyContent: 'center'}}>
                                <div className="glass-panel" style={{padding: '1rem', background: 'rgba(255,255,255,0.08)'}}>
                                    <div className="flex gap-3 items-center">
                                        <div style={{width: 40, height: 40, borderRadius: '50%', background: '#ff7b72'}}></div>
                                        <div>
                                            <div style={{height: 10, width: 100, background: 'rgba(255,255,255,0.5)', borderRadius: 5, marginBottom: 5}}></div>
                                            <div style={{height: 8, width: 60, background: 'rgba(255,255,255,0.2)', borderRadius: 4}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-panel" style={{padding: '1rem', background: 'rgba(255,255,255,0.08)', transform: 'translateY(10px) translateX(20px)'}}>
                                    <div className="flex gap-3 items-center">
                                        <div style={{width: 40, height: 40, borderRadius: '50%', background: '#79c0ff'}}></div>
                                        <div>
                                            <div style={{height: 10, width: 120, background: 'rgba(255,255,255,0.5)', borderRadius: 5, marginBottom: 5}}></div>
                                            <div style={{height: 8, width: 80, background: 'rgba(255,255,255,0.2)', borderRadius: 4}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-panel" style={{padding: '1rem', background: 'rgba(255,255,255,0.15)', transform: 'translateY(20px)', border: '1px solid var(--c-accent-light)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'}}>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gradient-accent text-sm">Mutual Interest!</span>
                                        <span className="tag text-xs bg-accent">Chat Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
