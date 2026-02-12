import React from 'react';

import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef(({
    label,
    error,
    className,
    id,
    type = "text",
    rightElement,
    ...props
}, ref) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-text/80"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    className={twMerge(
                        "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-text placeholder:text-gray-400 focus-glow transition-all duration-200",
                        error && "border-error focus:ring-error/20 focus:border-error",
                        rightElement && "pr-12",
                        className
                    )}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-error mt-1 animate-fade-in" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
