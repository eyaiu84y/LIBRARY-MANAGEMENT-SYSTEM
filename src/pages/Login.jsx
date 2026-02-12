import React from 'react';
import Card from '../components/ui/Card';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <Card>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text mb-2">
                        Library Management System
                    </h1>
                    <p className="text-lg text-gray-500">
                        Login to your account
                    </p>
                </div>
                <LoginForm />
            </Card>
        </div>
    );
};

export default Login;
