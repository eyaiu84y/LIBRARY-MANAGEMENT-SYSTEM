import React from 'react';
import Card from '../components/ui/Card';
import SignupForm from '../components/forms/SignupForm';

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <Card>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-text mb-2">
                        Create Student Account
                    </h1>
                    <p className="text-gray-500">
                        Join our library community
                    </p>
                </div>
                <SignupForm />
            </Card>
        </div>
    );
};

export default Signup;
