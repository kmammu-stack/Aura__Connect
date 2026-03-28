window.Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--c-border)',
            padding: '4rem 0 2rem 0',
            background: 'var(--c-bg)'
        }}>
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{marginBottom: '3rem'}}>
                    <div className="flex items-center gap-2" style={{fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--c-accent-light)'}}>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Nearby<span className="text-gradient-accent">Presence</span></span>
                    </div>

                    <div className="flex gap-6 color-secondary text-sm">
                        <a href="#" className="hover:color-primary">About Us</a>
                        <a href="#" className="hover:color-primary">Privacy Policy</a>
                        <a href="#" className="hover:color-primary">Terms of Service</a>
                        <a href="#" className="hover:color-primary">Contact</a>
                    </div>
                </div>

                <div className="text-center color-tertiary text-sm" style={{color: 'var(--c-text-tertiary)'}}>
                    &copy; {new Date().getFullYear()} Nearby Presence. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
