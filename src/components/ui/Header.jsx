import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

const Header = ({ title, userName = 'Admin User', userEmail = 'admin@library.com' }) => {
    return (
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text">{title || 'Admin Dashboard'}</h1>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-2 gap-2 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm text-text placeholder:text-gray-400 w-40"
                        aria-label="Search"
                    />
                </div>

                {/* Notification */}
                <button
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Avatar */}
                <div className="flex items-center gap-2">
                    <UserCircle className="w-8 h-8 text-gray-400" />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-text leading-tight">{userName}</p>
                        <p className="text-xs text-gray-400">{userEmail}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
