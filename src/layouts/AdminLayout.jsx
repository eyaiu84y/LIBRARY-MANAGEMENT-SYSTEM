import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import Header from '../components/ui/Header';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            {/* Main content — offset by sidebar width. On collapse sidebar is w-20, otherwise w-64 */}
            <div className="flex-1 ml-64 transition-all duration-300 flex flex-col">
                <Header />
                <main className="flex-1 p-6 max-w-[1200px] w-full mx-auto animate-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
