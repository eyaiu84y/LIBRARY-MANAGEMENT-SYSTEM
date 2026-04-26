import React from 'react';
import { Outlet } from 'react-router-dom';
import LibrarianSidebar from '../components/ui/LibrarianSidebar';
import Header from '../components/ui/Header';

const LibrarianLayout = () => {
    return (
        <div className="flex min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
            <LibrarianSidebar />
            <div className="flex-1 ml-64 transition-all duration-300 flex flex-col">
                <Header title="Librarian Dashboard" />
                <main className="flex-1 p-6 max-w-[1200px] w-full mx-auto animate-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default LibrarianLayout;
