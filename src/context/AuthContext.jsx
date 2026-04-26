import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { getProfile } from '../auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [session, setSession]   = useState(null);
    const [profile, setProfile]   = useState(null);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        // onAuthStateChange fires for the initial session too (INITIAL_SESSION event),
        // so we don't need a separate getSession() call — that was causing the double fetch.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);

                if (session?.user) {
                    // Fetch profile and wait for it before clearing the loading state.
                    // This prevents ProtectedRoute from seeing profile=null and bouncing to /login.
                    const { data } = await getProfile(session.user.id);
                    setProfile(data ?? null);
                } else {
                    setProfile(null);
                }

                // Only mark loading done after we have everything we need.
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, profile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
