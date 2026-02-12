import React, { useState, useEffect } from 'react';
import { BookOpen, BookMarked, AlertTriangle } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';

const mockStats = [
    { id: 1, label: 'Total Books', value: 1248, icon: BookOpen, color: 'primary' },
    { id: 2, label: 'Total Issued', value: 87, icon: BookMarked, color: 'secondary' },
    { id: 3, label: 'Overdue Books', value: 12, icon: AlertTriangle, color: 'rose' },
];

const LibrarianDashboard = () => {
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStats(mockStats);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-text mb-6">Overview</h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                                <div className="space-y-2">
                                    <div className="h-3 w-20 bg-gray-200 rounded" />
                                    <div className="h-6 w-12 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stats.map((s) => (
                        <StatsCard key={s.id} icon={s.icon} label={s.label} value={s.value} color={s.color} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LibrarianDashboard;
