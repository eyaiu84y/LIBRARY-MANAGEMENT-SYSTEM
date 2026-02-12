import React, { useState, useEffect } from 'react';
import Table from '../../components/ui/Table';

const mockTransactions = [
    { id: 1, student: 'John Carter', book: 'Clean Code', issueDate: '2026-01-15', returnDate: '2026-01-28', status: 'Returned' },
    { id: 2, student: 'Sarah Kim', book: 'Design Patterns', issueDate: '2026-01-20', returnDate: '—', status: 'Issued' },
    { id: 3, student: 'Mike Brown', book: 'The Pragmatic Programmer', issueDate: '2026-02-01', returnDate: '—', status: 'Issued' },
    { id: 4, student: 'Emily Chen', book: 'Artificial Intelligence', issueDate: '2026-01-05', returnDate: '—', status: 'Overdue' },
    { id: 5, student: 'James Wilson', book: 'Intro to Algorithms', issueDate: '2026-02-05', returnDate: '2026-02-12', status: 'Returned' },
    { id: 6, student: 'Nadia Patel', book: 'Database Systems', issueDate: '2026-02-08', returnDate: '—', status: 'Issued' },
];

const columns = [
    { key: 'student', label: 'Student' },
    { key: 'book', label: 'Book' },
    { key: 'issueDate', label: 'Issue Date' },
    { key: 'returnDate', label: 'Return Date' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => {
            const styles = {
                Issued: 'bg-blue-100 text-blue-700',
                Returned: 'bg-emerald-100 text-emerald-700',
                Overdue: 'bg-red-100 text-red-600',
            };
            return (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[row.status] || ''}`}>
                    {row.status}
                </span>
            );
        },
    },
];

const LibrarianTransactions = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockTransactions);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text">Transactions</h2>
                <span className="text-sm text-gray-400">{data.length} total</span>
            </div>
            <Table columns={columns} data={data} isLoading={isLoading} />
        </div>
    );
};

export default LibrarianTransactions;
