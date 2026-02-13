import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    BookMarked,
    Search,
    LogOut,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { label: 'View Books', icon: BookOpen, path: '/student/books' },
    { label: 'My Issued Books', icon: BookMarked, path: '/student/issued' },
    { label: 'Search Books', icon: Search, path: '/student/search' },
];

const StudentSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Student logged out');
        navigate('/login');
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'
                }`}
            aria-label="Student sidebar navigation"
        >
            {/* Brand */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
                <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" />
                {!collapsed && (
                    <span className="text-lg font-bold text-text whitespace-nowrap">
                        Library Student
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto" aria-label="Student navigation">
                <ul className="space-y-1 px-3">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-text'
                                    }`
                                }
                                aria-label={item.label}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-100 p-3 space-y-1">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 group"
                    aria-label="Logout"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    {!collapsed && <span>Logout</span>}
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center w-full py-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-text transition-all duration-200"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;
