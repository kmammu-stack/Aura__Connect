const { useState, useEffect } = React;

window.App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isLoaded]);

    return (
        <window.AuthProvider>
            <AppContent />
        </window.AuthProvider>
    );
};

const AppContent = () => {
    const { currentView } = window.useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        window.profileEmitter = {
            open: () => setIsProfileOpen(true),
            close: () => setIsProfileOpen(false)
        };
    }, []);

    return (
        <div className="app-container">
            <window.Navbar />
            
            <main>
                {currentView === 'home' ? (
                    <>
                        <window.HeroSection />
                        <window.HowItWorks />
                        <window.WhyThisPlatform />
                        <window.PrivacySection />
                        <window.FeaturePreview />
                        <window.CTASection />
                    </>
                ) : (
                    <window.Connections />
                )}
            </main>

            <window.Footer />
            
            {/* Modals outside of main flow */}
            <window.AuthModal />
            <window.ChatModal />
            <window.ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
    );
};

// Mount the App directly since Babel processes this after DOM is parsed
const rootElem = document.getElementById('root');
if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
    root.render(React.createElement(window.App));
}
