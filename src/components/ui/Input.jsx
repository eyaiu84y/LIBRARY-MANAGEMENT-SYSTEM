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
                    className="block text-sm font-medium text-text/80 dark:text-slate-300"
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
                        "w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-glow transition-all duration-200",
                        error && "border-error focus:ring-error/20 focus:border-error",
                        rightElement && "pr-12",
                        className
                    )}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
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
