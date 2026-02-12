import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Table from '../../components/ui/Table';

const mockBooks = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software', quantity: 5, status: 'Available' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software', quantity: 3, status: 'Available' },
    { id: 3, title: 'Design Patterns', author: 'Gang of Four', category: 'Software', quantity: 0, status: 'Out of Stock' },
    { id: 4, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', quantity: 7, status: 'Available' },
    { id: 5, title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'AI / ML', quantity: 2, status: 'Available' },
    { id: 6, title: 'Database Systems', author: 'Ramez Elmasri', category: 'Computer Science', quantity: 0, status: 'Out of Stock' },
];

const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Qty' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => (
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
            >
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
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    aria-label={`Edit ${row.title}`}
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onAction?.('delete', row)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    aria-label={`Delete ${row.title}`}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        ),
    },
];

const ViewBooks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockBooks);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (action, row) => {
        if (action === 'edit') {
            console.log('Edit book:', row);
            alert(`Editing "${row.title}"`);
        }
        if (action === 'delete') {
            console.log('Delete book:', row);
            setData((prev) => prev.filter((item) => item.id !== row.id));
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text">View Books</h2>
                <span className="text-sm text-gray-400">{data.length} total</span>
            </div>
            <Table columns={columns} data={data} isLoading={isLoading} onAction={handleAction} />
        </div>
    );
};

export default ViewBooks;
