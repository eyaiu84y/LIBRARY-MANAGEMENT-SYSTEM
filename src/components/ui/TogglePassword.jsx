import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const TogglePassword = ({ show, onToggle, className }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
            aria-label={show ? "Hide password" : "Show password"}
        >
            {show ? (
                <EyeOff className="w-5 h-5" />
            ) : (
                <Eye className="w-5 h-5" />
            )}
        </button>
    );
};

export default TogglePassword;
