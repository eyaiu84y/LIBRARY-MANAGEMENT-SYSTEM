import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import TogglePassword from '../ui/TogglePassword';
import useFormValidation from '../../hooks/useFormValidation';

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit
    } = useFormValidation({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Student' // Hardcoded role
    }, {
        fullName: {
            required: true,
            minLength: 2,
            message: 'Full name must be at least 2 characters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        password: {
            required: true,
            minLength: 8,
            message: 'Password must be at least 8 characters'
        },
        confirmPassword: {
            required: true,
            custom: (value, formValues) => value === formValues.password,
            message: 'Passwords do not match'
        }
    });

    const onSubmit = async (formData) => {
        setSubmitError('');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Signup successful:', formData);
        // Show success toast or alert
        alert("Account Created! Please Login.");
        navigate('/login');
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }} className="space-y-6">
            {submitError && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm animate-fade-in">
                    {submitError}
                </div>
            )}

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
                type={showPassword ? "text" : "password"}
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
                type={showConfirmPassword ? "text" : "password"}
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
                CREATE ACCOUNT
            </Button>

            <div className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
