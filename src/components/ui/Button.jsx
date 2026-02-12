import React from 'react';
import { Loader2 } from 'lucide-react';

import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-white text-text border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
        danger: "bg-error text-white hover:bg-error/90 focus:ring-error",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
