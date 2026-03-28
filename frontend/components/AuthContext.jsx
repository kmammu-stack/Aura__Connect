const { createContext, useState, useContext, useEffect } = React;

window.AuthContext = createContext();

window.AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // NEW
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = window.ENV_API_URL || 'http://localhost:3000';

    const [currentView, setCurrentView] = useState('home');

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('nearby_user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (!parsed.token) {
                // Legacy session without token spotted. Force clear to fix broadcast presence error!
                localStorage.removeItem('nearby_user');
                return;
            }
            setUser(parsed);
            setCurrentView('connections');
        }
    }, []);

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to register');
            
            setUser(data);
            localStorage.setItem('nearby_user', JSON.stringify(data));
            setIsAuthModalOpen(false);
            setCurrentView('connections');
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to login');
            
            setUser(data);
            localStorage.setItem('nearby_user', JSON.stringify(data));
            setIsAuthModalOpen(false);
            setCurrentView('connections');
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updatedData) => {
        if (!user) return { success: false, error: 'Not logged in' };
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ id: user.id, ...updatedData })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to update profile');
            
            setUser(data);
            localStorage.setItem('nearby_user', JSON.stringify(data));
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        if (!user) return { success: false, error: 'Not logged in' };
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/profile/${user.id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete account');
            }
            logout();
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nearby_user');
        setCurrentView('home');
    };

    const requireAuth = (callback) => {
        if (!user) {
            setIsAuthModalOpen(true);
        } else {
            callback();
        }
    };

    return (
        <window.AuthContext.Provider value={{
            user,
            register,
            login,
            logout,
            updateProfile,
            deleteAccount,
            isAuthModalOpen,
            setIsAuthModalOpen,
            authMode,
            setAuthMode,
            requireAuth,
            error,
            loading,
            currentView,
            setCurrentView
        }}>
            {children}
        </window.AuthContext.Provider>
    );
};

window.useAuth = () => useContext(window.AuthContext);
