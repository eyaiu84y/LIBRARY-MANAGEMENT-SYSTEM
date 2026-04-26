import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Wraps a route group and enforces:
 *  - User must be logged in
 *  - User's role must match the required role (if provided)
 *
 * Usage in App.jsx:
 *   <Route element={<ProtectedRoute requiredRole="admin" />}>
 *     <Route path="/admin" element={<AdminLayout />}>...</Route>
 *   </Route>
 */
const ProtectedRoute = ({ requiredRole }) => {
    const { session, profile, loading } = useAuth();

    // Still loading session — show a centered spinner
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    // Not logged in → send to login
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role → send to their own dashboard
    if (requiredRole && profile?.role !== requiredRole) {
        const roleRoutes = {
            admin: '/admin/dashboard',
            librarian: '/librarian/dashboard',
            student: '/student/dashboard',
        };
        return <Navigate to={roleRoutes[profile?.role] || '/login'} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
