import React from 'react';

const StatsCard = ({ icon, label, value, color = 'primary' }) => {
    const colorMap = {
        primary: 'bg-primary/10 text-primary dark:bg-primary/20',
        secondary: 'bg-emerald-100 text-secondary dark:bg-emerald-900/40',
        amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40',
        rose: 'bg-rose-100 text-rose-500 dark:bg-rose-900/40',
    };

    const IconComponent = icon;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-200 group cursor-default border border-transparent dark:border-gray-700">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color] || colorMap.primary} transition-transform duration-200 group-hover:scale-110`}
                >
                    <IconComponent className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
                    <p className="text-2xl font-bold text-text dark:text-slate-100">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
