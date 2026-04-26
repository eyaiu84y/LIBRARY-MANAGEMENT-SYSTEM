import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import TogglePassword from '../ui/TogglePassword';
import useFormValidation from '../../hooks/useFormValidation';
import { signIn } from '../../auth';
import { Shield, BookOpen, GraduationCap } from 'lucide-react';

const roles = [
    { key: 'admin',     label: 'Admin',     icon: Shield,       color: 'text-primary',    bgColor: 'bg-primary/10 border-primary ring-primary/20' },
    { key: 'librarian', label: 'Librarian', icon: BookOpen,     color: 'text-secondary',  bgColor: 'bg-secondary/10 border-secondary ring-secondary/20' },
    { key: 'student',   label: 'Student',   icon: GraduationCap, color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-500 ring-amber-200' },
];

const roleRoutes = {
    admin: '/admin/dashboard',
    librarian: '/librarian/dashboard',
    student: '/student/dashboard',
};

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [selectedRole, setSelectedRole] = useState('admin');

    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormValidation(
        { email: '', password: '' },
        {
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
            },
            password: {
                required: true,
                minLength: 6,
                message: 'Password must be at least 6 characters',
            },
        }
    );

    const onSubmit = async (formData) => {
        setSubmitError('');

        const { data, error } = await signIn({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setSubmitError(error.message);
            return;
        }

        // Read role from the profile (set by the DB trigger on signup)
        // The AuthContext will have loaded the profile — but we can also
        // read it from user_metadata as a fast path right after login.
        const role = data.user?.user_metadata?.role || 'student';
        navigate(roleRoutes[role] || '/login');
    };

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}
            className="space-y-6"
        >
            {submitError && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm animate-fade-in">
                    {submitError}
                </div>
            )}

            {/* Role indicator — visual only, actual role comes from the DB */}
            <div>
                <label className="block text-sm font-medium text-text dark:text-slate-300 mb-2">
                    Login as
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => {
                        const isSelected = selectedRole === role.key;
                        const RoleIcon = role.icon;
                        return (
                            <button
                                key={role.key}
                                type="button"
                                onClick={() => setSelectedRole(role.key)}
                                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 cursor-pointer
                                    ${isSelected
                                        ? `${role.bgColor} ring-2`
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300'
                                    }`}
                                aria-label={`Login as ${role.label}`}
                                aria-pressed={isSelected}
                            >
                                <RoleIcon className={`w-5 h-5 ${isSelected ? role.color : 'text-gray-400'}`} />
                                <span className={isSelected ? role.color : ''}>{role.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
            />

            <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                rightElement={
                    <TogglePassword
                        show={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Button type="submit" isLoading={isSubmitting}>
                Sign In
            </Button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                >
                    Sign up
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
