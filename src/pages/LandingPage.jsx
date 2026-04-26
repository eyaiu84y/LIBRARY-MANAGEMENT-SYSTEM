import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Library,
    BookOpen,
    Users,
    GraduationCap,
    ArrowRight,
    Search,
    ArrowLeftRight,
    ShieldCheck,
    BookPlus,
    BookCheck,
    ChevronDown,
    Star,
    Sun,
    Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─── Animated counter ─────────────────────────────────────────── */
const Counter = ({ target, duration = 1800 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
};

/* ─── Role card ─────────────────────────────────────────────────── */
const RoleCard = ({ icon: Icon, title, description, color, features, path, navigate }) => {
    const colorMap = {
        primary: {
            bg: 'bg-primary/10 dark:bg-primary/20',
            text: 'text-primary',
            border: 'border-primary/20 dark:border-primary/30',
            btn: 'bg-primary hover:bg-primary/90',
            dot: 'bg-primary',
        },
        secondary: {
            bg: 'bg-secondary/10 dark:bg-secondary/20',
            text: 'text-secondary',
            border: 'border-secondary/20 dark:border-secondary/30',
            btn: 'bg-secondary hover:bg-secondary/90',
            dot: 'bg-secondary',
        },
        amber: {
            bg: 'bg-amber-100 dark:bg-amber-900/30',
            text: 'text-amber-600 dark:text-amber-400',
            border: 'border-amber-200 dark:border-amber-700/40',
            btn: 'bg-amber-500 hover:bg-amber-600',
            dot: 'bg-amber-500',
        },
    };
    const c = colorMap[color];

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-soft border ${c.border} flex flex-col gap-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${c.bg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`w-7 h-7 ${c.text}`} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-text dark:text-slate-100 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
            <ul className="space-y-2 flex-1">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                        {f}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => navigate(path)}
                className={`mt-2 w-full py-2.5 px-4 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${c.btn}`}
            >
                Go to {title} <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
};

/* ─── Feature item ──────────────────────────────────────────────── */
const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex gap-4 items-start group">
        <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-text dark:text-slate-100 mb-0.5">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

/* ─── Stat item ─────────────────────────────────────────────────── */
const StatItem = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-extrabold text-white">
            <Counter target={value} />
        </p>
        <p className="text-sm text-indigo-200 mt-1 font-medium">{label}</p>
    </div>
);

/* ─── Main Landing Page ─────────────────────────────────────────── */
const LandingPage = () => {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const roles = [
        {
            icon: ShieldCheck,
            title: 'Admin',
            description: 'Full control over the library system. Manage librarians, students, books, and monitor all transactions.',
            color: 'primary',
            path: '/admin/dashboard',
            features: [
                'Manage librarians & students',
                'View all books in the system',
                'Monitor all transactions',
                'System-wide statistics',
            ],
        },
        {
            icon: Library,
            title: 'Librarian',
            description: 'Day-to-day library operations. Handle book inventory, issue and return books, and track overdue items.',
            color: 'secondary',
            path: '/librarian/dashboard',
            features: [
                'Manage book inventory',
                'Issue books to students',
                'Process book returns',
                'Track overdue books',
            ],
        },
        {
            icon: GraduationCap,
            title: 'Student',
            description: 'Explore the library catalog, track your issued books, and stay on top of due dates.',
            color: 'amber',
            path: '/student/dashboard',
            features: [
                'Browse the full catalog',
                'View issued books',
                'Search by title or author',
                'Track due dates',
            ],
        },
    ];

    const features = [
        { icon: BookOpen, title: 'Comprehensive Catalog', description: 'Browse over 1,200 books across all genres and subjects.' },
        { icon: BookPlus, title: 'Easy Book Issuing', description: 'Librarians can issue books to students in just a few clicks.' },
        { icon: BookCheck, title: 'Smooth Returns', description: 'Streamlined return process with automatic due-date tracking.' },
        { icon: Search, title: 'Powerful Search', description: 'Find any book instantly by title, author, or category.' },
        { icon: ArrowLeftRight, title: 'Transaction History', description: 'Full audit trail of every issue and return in the system.' },
        { icon: Users, title: 'Multi-Role Access', description: 'Separate dashboards tailored for admins, librarians, and students.' },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-gray-950 font-sans antialiased text-text dark:text-slate-100 transition-colors duration-300">

            {/* ── Navbar ── */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Library className="w-7 h-7 text-primary" />
                        <span className="text-lg font-bold text-text dark:text-slate-100">LibraryMS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDark
                                ? <Sun className="w-5 h-5 text-amber-400" />
                                : <Moon className="w-5 h-5" />
                            }
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-text dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden px-6 pt-20 pb-24">
                {/* Background blobs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-primary/20 dark:border-primary/30">
                        <Star className="w-3.5 h-3.5 fill-primary" />
                        Smart Library Management System
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-extrabold text-text dark:text-slate-100 leading-tight mb-6">
                        Your Library,{' '}
                        <span className="text-primary">Organized</span>{' '}
                        &amp;{' '}
                        <span className="text-secondary">Accessible</span>
                    </h1>

                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A modern platform connecting admins, librarians, and students — making book management effortless from catalog to return.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-soft"
                        >
                            Get Started Free <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-gray-800 text-text dark:text-slate-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Scroll hint */}
                    <div className="mt-16 flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 animate-bounce">
                        <span className="text-xs font-medium">Explore</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </section>

            {/* ── Stats Banner ── */}
            <section className="bg-primary px-6 py-14">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <StatItem value={1248} label="Books in Catalog" />
                    <StatItem value={534} label="Registered Students" />
                    <StatItem value={87} label="Books Issued" />
                    <StatItem value={12} label="Librarians" />
                </div>
            </section>

            {/* ── Role Portals ── */}
            <section className="px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-text dark:text-slate-100 mb-3">Choose Your Portal</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Each role has a dedicated dashboard built around what matters most to you.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {roles.map((role) => (
                            <RoleCard key={role.title} {...role} navigate={navigate} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="bg-white dark:bg-gray-900 px-6 py-20 border-y border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-text dark:text-slate-100 mb-3">Everything You Need</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Built with the full library workflow in mind — from adding a book to tracking its return.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f) => (
                            <FeatureItem key={f.title} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-text dark:text-slate-100 mb-3">How It Works</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Three simple steps to get your library running smoothly.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gray-200 dark:bg-gray-700 z-0" />

                        {[
                            { step: '01', title: 'Admin Sets Up', desc: 'Admin registers librarians and students, and populates the book catalog.' },
                            { step: '02', title: 'Librarian Operates', desc: 'Librarians issue books to students and process returns with ease.' },
                            { step: '03', title: 'Students Explore', desc: 'Students browse the catalog, search books, and track their issued items.' },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="relative z-10 flex flex-col items-center text-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 border-2 border-primary/20 dark:border-primary/30 flex items-center justify-center">
                                    <span className="text-xl font-extrabold text-primary">{step}</span>
                                </div>
                                <h4 className="font-bold text-text dark:text-slate-100">{title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 py-20 bg-gradient-to-br from-primary to-indigo-700">
                <div className="max-w-2xl mx-auto text-center">
                    <Library className="w-12 h-12 text-white/80 mx-auto mb-5" />
                    <h2 className="text-3xl font-extrabold text-white mb-4">
                        Ready to modernize your library?
                    </h2>
                    <p className="text-indigo-200 mb-8 leading-relaxed">
                        Join hundreds of institutions already using LibraryMS to streamline their operations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Create an Account <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 px-6 py-8 transition-colors duration-300">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Library className="w-5 h-5 text-primary" />
                        <span className="font-bold text-text dark:text-slate-100">LibraryMS</span>
                    </div>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        © {new Date().getFullYear()} LibraryMS. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                        <button onClick={() => navigate('/login')} className="hover:text-primary transition-colors">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="hover:text-primary transition-colors">Sign Up</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
