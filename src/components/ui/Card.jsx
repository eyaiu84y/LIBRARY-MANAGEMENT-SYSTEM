import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                "w-full max-w-[420px] mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft animate-fade-in border border-transparent dark:border-gray-700",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
