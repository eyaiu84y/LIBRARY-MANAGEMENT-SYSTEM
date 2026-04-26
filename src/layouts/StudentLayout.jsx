import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/ui/StudentSidebar';
import Header from '../components/ui/Header';

const StudentLayout = () => {
    return (
        <div className="flex min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
            <StudentSidebar />
            <div className="flex-1 ml-64 transition-all duration-300 flex flex-col">
                <Header
                    title="Student Dashboard"
                    userName="Student User"
                    userEmail="student@library.com"
                />
                <main className="flex-1 p-6 max-w-[1200px] w-full mx-auto animate-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;
