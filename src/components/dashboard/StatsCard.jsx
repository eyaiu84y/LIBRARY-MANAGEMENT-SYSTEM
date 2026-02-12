import React from 'react';

const StatsCard = ({ icon, label, value, color = 'primary' }) => {
    const colorMap = {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-emerald-100 text-secondary',
        amber: 'bg-amber-100 text-amber-600',
        rose: 'bg-rose-100 text-rose-500',
    };

    const IconComponent = icon;

    return (
        <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-200 group cursor-default">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color] || colorMap.primary} transition-transform duration-200 group-hover:scale-110`}
                >
                    <IconComponent className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <p className="text-2xl font-bold text-text">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
