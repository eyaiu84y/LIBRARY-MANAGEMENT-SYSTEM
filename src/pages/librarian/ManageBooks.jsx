import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Loader2, X } from 'lucide-react';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const mockBooks = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software', quantity: 5, status: 'Available' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software', quantity: 3, status: 'Available' },
    { id: 3, title: 'Design Patterns', author: 'Gang of Four', category: 'Software', quantity: 0, status: 'Out of Stock' },
    { id: 4, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'CS', quantity: 7, status: 'Available' },
    { id: 5, title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'AI / ML', quantity: 2, status: 'Available' },
];

const inputCls = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-glow';

const ManageBooks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '', category: '', quantity: '' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockBooks);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleAddBook = (e) => {
        e.preventDefault();
        setIsAdding(true);
        setTimeout(() => {
            const book = {
                id: Date.now(),
                ...newBook,
                quantity: parseInt(newBook.quantity) || 0,
                status: parseInt(newBook.quantity) > 0 ? 'Available' : 'Out of Stock',
            };
            setData((prev) => [...prev, book]);
            setNewBook({ title: '', author: '', category: '', quantity: '' });
            setShowForm(false);
            setIsAdding(false);
        }, 2000);
    };

    const handleAction = (action, row) => {
        if (action === 'edit') alert(`Editing "${row.title}"`);
        if (action === 'delete') setData((prev) => prev.filter((item) => item.id !== row.id));
    };

    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'category', label: 'Category' },
        { key: 'quantity', label: 'Qty' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
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
                    <button onClick={() => onAction?.('edit', row)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200" aria-label={`Edit ${row.title}`}>
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onAction?.('delete', row)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200" aria-label={`Delete ${row.title}`}>
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text dark:text-slate-100">Manage Books</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? 'Cancel' : 'Add Book'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleAddBook} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-transparent dark:border-gray-700 mb-6 animate-fade-in">
                    <h3 className="text-sm font-semibold text-text dark:text-slate-100 mb-4">Add New Book</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Title" required value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className={inputCls} aria-label="Book title" />
                        <input type="text" placeholder="Author" required value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className={inputCls} aria-label="Book author" />
                        <input type="text" placeholder="Category" required value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} className={inputCls} aria-label="Book category" />
                        <input type="number" placeholder="Quantity" required min="0" value={newBook.quantity} onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })} className={inputCls} aria-label="Book quantity" />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" isLoading={isAdding} className="w-auto px-6">Add Book</Button>
                    </div>
                </form>
            )}

            <Table columns={columns} data={data} isLoading={isLoading} onAction={handleAction} />
        </div>
    );
};

export default ManageBooks;
