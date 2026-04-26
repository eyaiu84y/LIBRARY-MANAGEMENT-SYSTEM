import { useState, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { fetchBooks, addBook, updateBook, deleteBook } from '../../lib/librarian';
import { supabase } from '../../supabase';

const inputCls = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-glow';
const EMPTY_BOOK = { title: '', author: '', category: '', isbn: '', total_copies: '' };

const ManageBooks = () => {
    const [data, setData]               = useState([]);
    const [isLoading, setIsLoading]     = useState(true);
    const [error, setError]             = useState('');
    const [showForm, setShowForm]       = useState(false);
    const [isAdding, setIsAdding]       = useState(false);
    const [newBook, setNewBook]         = useState(EMPTY_BOOK);
    const [editingId, setEditingId]     = useState(null);
    const [editValues, setEditValues]   = useState({});
    const [isSaving, setIsSaving]       = useState(false);

    const load = useCallback(async () => {
        setIsLoading(true);
        const { data: books, error: err } = await fetchBooks();
        if (err) setError(err.message);
        else setData(books || []);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        (async () => { await load(); })();

        const channel = supabase
            .channel('manage-books')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'books' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setData((prev) => [...prev, payload.new].sort((a, b) => a.title.localeCompare(b.title)));
                } else if (payload.eventType === 'UPDATE') {
                    setData((prev) => prev.map((b) => b.id === payload.new.id ? payload.new : b));
                } else if (payload.eventType === 'DELETE') {
                    setData((prev) => prev.filter((b) => b.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [load]);

    const handleAddBook = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        setError('');
        const { error: err } = await addBook(newBook);
        if (err) setError(err.message);
        else { setNewBook(EMPTY_BOOK); setShowForm(false); }
        setIsAdding(false);
    };

    const startEdit = (row) => {
        setEditingId(row.id);
        setEditValues({ title: row.title, author: row.author, category: row.category, isbn: row.isbn || '', total_copies: row.total_copies });
    };

    const saveEdit = async (row) => {
        setIsSaving(true);
        const copies = parseInt(editValues.total_copies) || 0;
        const diff   = copies - row.total_copies;
        const { error: err } = await updateBook(row.id, {
            title: editValues.title,
            author: editValues.author,
            category: editValues.category,
            isbn: editValues.isbn || null,
            total_copies: copies,
            available_copies: Math.max(0, row.available_copies + diff),
        });
        if (err) setError(err.message);
        else setEditingId(null);
        setIsSaving(false);
    };

    const handleDelete = async (row) => {
        if (!window.confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
        const { error: err } = await deleteBook(row.id);
        if (err) setError(err.message);
    };

    const columns = [
        {
            key: 'title', label: 'Title',
            render: (row) => editingId === row.id
                ? <input className={inputCls + ' py-1.5'} value={editValues.title} onChange={(e) => setEditValues({ ...editValues, title: e.target.value })} />
                : <span className="font-medium text-text dark:text-slate-200">{row.title}</span>,
        },
        {
            key: 'author', label: 'Author',
            render: (row) => editingId === row.id
                ? <input className={inputCls + ' py-1.5'} value={editValues.author} onChange={(e) => setEditValues({ ...editValues, author: e.target.value })} />
                : row.author,
        },
        {
            key: 'category', label: 'Category',
            render: (row) => editingId === row.id
                ? <input className={inputCls + ' py-1.5'} value={editValues.category} onChange={(e) => setEditValues({ ...editValues, category: e.target.value })} />
                : row.category,
        },
        {
            key: 'available_copies', label: 'Available',
            render: (row) => (
                <span className={row.available_copies === 0 ? 'text-red-500 font-medium' : 'text-text dark:text-slate-200'}>
                    {row.available_copies} / {row.total_copies}
                </span>
            ),
        },
        {
            key: 'status', label: 'Status',
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.available_copies > 0
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                }`}>
                    {row.available_copies > 0 ? 'Available' : 'Out of Stock'}
                </span>
            ),
        },
        {
            key: 'actions', label: 'Actions',
            render: (row) => editingId === row.id ? (
                <div className="flex items-center gap-2">
                    <button onClick={() => saveEdit(row)} disabled={isSaving} className="p-1.5 rounded-lg text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all" aria-label="Save">
                        {isSaving ? <span className="text-xs">...</span> : <Check className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all" aria-label="Cancel">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all" aria-label={`Edit ${row.title}`}>
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(row)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all" aria-label={`Delete ${row.title}`}>
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
                    onClick={() => { setShowForm(!showForm); setError(''); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? 'Cancel' : 'Add Book'}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm animate-fade-in">
                    {error}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleAddBook} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-transparent dark:border-gray-700 mb-6 animate-fade-in">
                    <h3 className="text-sm font-semibold text-text dark:text-slate-100 mb-4">Add New Book</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Title *" required value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className={inputCls} />
                        <input type="text" placeholder="Author *" required value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className={inputCls} />
                        <input type="text" placeholder="Category *" required value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} className={inputCls} />
                        <input type="text" placeholder="ISBN (optional)" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} className={inputCls} />
                        <input type="number" placeholder="Total Copies *" required min="1" value={newBook.total_copies} onChange={(e) => setNewBook({ ...newBook, total_copies: e.target.value })} className={inputCls} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" isLoading={isAdding} className="w-auto px-6">Add Book</Button>
                    </div>
                </form>
            )}

            <Table columns={columns} data={data} isLoading={isLoading} emptyMessage="No books yet. Add your first book above." />
        </div>
    );
};

export default ManageBooks;
