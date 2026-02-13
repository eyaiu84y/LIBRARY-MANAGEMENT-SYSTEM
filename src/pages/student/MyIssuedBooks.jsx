import React, { useState, useEffect } from 'react';
import Table from '../../components/ui/Table';

const mockIssuedBooks = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', issueDate: '2026-01-10', dueDate: '2026-01-25', status: 'Returned' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', issueDate: '2026-01-28', dueDate: '2026-02-11', status: 'Overdue' },
    { id: 3, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', issueDate: '2026-02-01', dueDate: '2026-02-15', status: 'Issued' },
    { id: 4, title: 'Artificial Intelligence', author: 'Stuart Russell', issueDate: '2026-02-05', dueDate: '2026-02-19', status: 'Issued' },
    { id: 5, title: 'Design Patterns', author: 'Gang of Four', issueDate: '2026-01-15', dueDate: '2026-01-30', status: 'Returned' },
];

const statusStyles = {
    Returned: 'bg-emerald-100 text-emerald-700',
    Issued: 'bg-blue-100 text-blue-700',
    Overdue: 'bg-red-100 text-red-700',
};

const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'issueDate', label: 'Issue Date' },
    { key: 'dueDate', label: 'Due Date' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row.status] || ''}`}>
                {row.status}
            </span>
        ),
    },
];

const MyIssuedBooks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockIssuedBooks);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const overdueCount = data.filter((b) => b.status === 'Overdue').length;
    const issuedCount = data.filter((b) => b.status === 'Issued').length;

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-text">My Issued Books</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {issuedCount} currently issued · {overdueCount} overdue
                    </p>
                </div>
            </div>

            {/* Custom table with overdue row highlighting */}
            {isLoading ? (
                <Table columns={columns} data={[]} isLoading={true} />
            ) : data.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">No issued books found.</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-soft">
                    <table className="w-full text-sm text-left" role="table" aria-label="My issued books">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, idx) => (
                                <tr
                                    key={row.id || idx}
                                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150 ${row.status === 'Overdue'
                                        ? 'bg-red-50/40 border-l-4 border-l-red-400'
                                        : ''
                                        }`}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-5 py-3.5 text-text whitespace-nowrap">
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyIssuedBooks;
