import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import TogglePassword from '../ui/TogglePassword';
import useFormValidation from '../../hooks/useFormValidation';
import { signUp } from '../../auth';
import { GraduationCap, BookOpen } from 'lucide-react';

const roles = [
    {
        key: 'student',
        label: 'Student',
        icon: GraduationCap,
        description: 'Browse & borrow books',
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-900/30',
        border: 'border-amber-500',
        ring: 'ring-amber-200 dark:ring-amber-700',
    },
    {
        key: 'librarian',
        label: 'Librarian',
        icon: BookOpen,
        description: 'Manage books & issues',
        color: 'text-secondary',
        bg: 'bg-secondary/10 dark:bg-secondary/20',
        border: 'border-secondary',
        ring: 'ring-secondary/20',
    },
];

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student');

    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(
        { fullName: '', email: '', password: '', confirmPassword: '' },
        {
            fullName: {
                required: true,
                minLength: 2,
                message: 'Full name must be at least 2 characters',
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
            },
            password: {
                required: true,
                minLength: 8,
                message: 'Password must be at least 8 characters',
            },
            confirmPassword: {
                required: true,
                custom: (value, formValues) => value === formValues.password,
                message: 'Passwords do not match',
            },
        }
    );

    const onSubmit = async (formData) => {
        setSubmitError('');

        const { error } = await signUp({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            role: selectedRole,
        });

        if (error) {
            setSubmitError(error.message);
            return;
        }

        setSuccess(true);
    };

    if (success) {
        return (
            <div className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-text dark:text-slate-100">Check your email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    We sent a confirmation link to{' '}
                    <span className="font-medium text-text dark:text-slate-200">{values.email}</span>.
                    Click it to activate your account, then sign in.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
                >
                    Go to Sign In
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}
            className="space-y-5"
        >
            {submitError && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm animate-fade-in">
                    {submitError}
                </div>
            )}

            {/* Role selector */}
            <div>
                <label className="block text-sm font-medium text-text/80 dark:text-slate-300 mb-2">
                    I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => {
                        const isSelected = selectedRole === role.key;
                        const RoleIcon = role.icon;
                        return (
                            <button
                                key={role.key}
                                type="button"
                                onClick={() => setSelectedRole(role.key)}
                                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200
                                    ${isSelected
                                        ? `${role.bg} ${role.border} ring-2 ${role.ring}`
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                                aria-pressed={isSelected}
                                aria-label={`Sign up as ${role.label}`}
                            >
                                <RoleIcon className={`w-6 h-6 ${isSelected ? role.color : 'text-gray-400 dark:text-gray-500'}`} />
                                <span className={isSelected ? role.color : ''}>{role.label}</span>
                                <span className={`text-xs font-normal ${isSelected ? 'opacity-80' : 'text-gray-400 dark:text-gray-500'}`}>
                                    {role.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Input
                id="fullName"
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                value={values.fullName}
                onChange={handleChange}
                error={errors.fullName}
            />

            <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Min 8 characters"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                rightElement={
                    <TogglePassword
                        show={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="Re-enter password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                rightElement={
                    <TogglePassword
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                }
            />

            <Button type="submit" isLoading={isSubmitting}>
                Create {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Account
            </Button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
