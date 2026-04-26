import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Table from '../../components/ui/Table';

const mockStudents = [
    { id: 1, name: 'John Carter', email: 'john@student.edu', role: 'Student', status: 'Active' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@student.edu', role: 'Student', status: 'Active' },
    { id: 3, name: 'Mike Brown', email: 'mike@student.edu', role: 'Student', status: 'Suspended' },
    { id: 4, name: 'Emily Chen', email: 'emily@student.edu', role: 'Student', status: 'Active' },
    { id: 5, name: 'James Wilson', email: 'james@student.edu', role: 'Student', status: 'Active' },
    { id: 6, name: 'Nadia Patel', email: 'nadia@student.edu', role: 'Student', status: 'Active' },
];

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                row.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
            }`}>
                {row.status}
            </span>
        ),
    },
    {
        key: 'actions',
        label: 'Actions',
        render: (row, onAction) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onAction?.('edit', row)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
                    aria-label={`Edit ${row.name}`}
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onAction?.('delete', row)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200"
                    aria-label={`Delete ${row.name}`}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        ),
    },
];

const ManageStudents = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockStudents);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (action, row) => {
        if (action === 'edit') alert(`Editing ${row.name}`);
        if (action === 'delete') setData((prev) => prev.filter((item) => item.id !== row.id));
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text dark:text-slate-100">Manage Students</h2>
                <span className="text-sm text-gray-400 dark:text-gray-500">{data.length} total</span>
            </div>
            <Table columns={columns} data={data} isLoading={isLoading} onAction={handleAction} />
        </div>
    );
};

export default ManageStudents;
