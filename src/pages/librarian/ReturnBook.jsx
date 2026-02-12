import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import Table from '../../components/ui/Table';

const mockIssuedBooks = [
    { id: 1, student: 'John Carter', book: 'Clean Code', issueDate: '2026-01-15', dueDate: '2026-01-29', status: 'Issued' },
    { id: 2, student: 'Sarah Kim', book: 'Design Patterns', issueDate: '2026-01-20', dueDate: '2026-02-03', status: 'Overdue' },
    { id: 3, student: 'Mike Brown', book: 'The Pragmatic Programmer', issueDate: '2026-02-01', dueDate: '2026-02-15', status: 'Issued' },
    { id: 4, student: 'Emily Chen', book: 'Artificial Intelligence', issueDate: '2026-01-05', dueDate: '2026-01-19', status: 'Overdue' },
    { id: 5, student: 'James Wilson', book: 'Intro to Algorithms', issueDate: '2026-02-05', dueDate: '2026-02-19', status: 'Issued' },
];

const ReturnBook = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [returningId, setReturningId] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockIssuedBooks);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleMarkReturned = (row) => {
        setReturningId(row.id);
        setTimeout(() => {
            setData((prev) =>
                prev.map((item) =>
                    item.id === row.id ? { ...item, status: 'Returned' } : item
                )
            );
            setReturningId(null);
            console.log('Marked as returned:', row);
        }, 2000);
    };

    const columns = [
        { key: 'student', label: 'Student' },
        { key: 'book', label: 'Book' },
        { key: 'issueDate', label: 'Issue Date' },
        { key: 'dueDate', label: 'Due Date' },
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
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => {
                if (row.status === 'Returned') {
                    return <span className="text-xs text-gray-400">—</span>;
                }
                return (
                    <button
                        onClick={() => handleMarkReturned(row)}
                        disabled={returningId === row.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 ${row.status === 'Overdue'
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                            }`}
                        aria-label={`Mark ${row.book} as returned`}
                    >
                        {returningId === row.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        Mark Returned
                    </button>
                );
            },
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text">Return Book</h2>
                <span className="text-sm text-gray-400">{data.filter((d) => d.status !== 'Returned').length} pending</span>
            </div>
            <Table columns={columns} data={data} isLoading={isLoading} />
        </div>
    );
};

export default ReturnBook;
