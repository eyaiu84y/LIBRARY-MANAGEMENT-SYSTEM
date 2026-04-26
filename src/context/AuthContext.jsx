/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { getProfile } from '../auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                setSession(newSession);

                if (newSession?.user) {
                    const { data } = await getProfile(newSession.user.id);
                    setProfile(data ?? null);
                } else {
                    setProfile(null);
                }

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
