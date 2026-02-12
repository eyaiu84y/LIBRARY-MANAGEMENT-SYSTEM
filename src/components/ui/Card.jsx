import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                "w-full max-w-[420px] mx-auto bg-white rounded-2xl p-8 shadow-soft animate-fade-in",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
