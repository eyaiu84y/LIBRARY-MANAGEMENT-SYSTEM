import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import Table from '../../components/ui/Table';
import { fetchTransactions, returnBook } from '../../lib/librarian';
import { supabase } from '../../supabase';

const statusStyles = {
    issued:   'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    returned: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    overdue:  'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
};

const fmt = (iso) => iso ? new Date(iso).toLocaleDateString() : '—';

const ReturnBook = () => {
    const [data, setData]           = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [returningId, setReturningId] = useState(null);
    const [error, setError]         = useState('');

    const load = async () => {
        const { data: txns, error } = await fetchTransactions();
        if (error) { setError(error.message); setIsLoading(false); return; }
        // Only show non-returned transactions on this page
        setData((txns || []).filter((t) => t.status !== 'returned'));
        setIsLoading(false);
    };

    useEffect(() => {
        load();

        const channel = supabase
            .channel('return-book-txns')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, load)
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const handleMarkReturned = async (row) => {
        setReturningId(row.id);
        setError('');
        const { error } = await returnBook(row.id, row.books.id);
        if (error) setError(error.message);
        // Realtime will update the list automatically
        setReturningId(null);
    };

    const columns = [
        { key: 'student',   label: 'Student',    render: (row) => row.student?.full_name || '—' },
        { key: 'book',      label: 'Book',        render: (row) => row.books?.title || '—' },
        { key: 'issued_at', label: 'Issue Date',  render: (row) => fmt(row.issued_at) },
        { key: 'due_date',  label: 'Due Date',    render: (row) => fmt(row.due_date) },
        {
            key: 'status', label: 'Status',
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[row.status] || ''}`}>
                    {row.status}
                </span>
            ),
        },
        {
            key: 'actions', label: 'Actions',
            render: (row) => (
                <button
                    onClick={() => handleMarkReturned(row)}
                    disabled={returningId === row.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 ${
                        row.status === 'overdue'
                            ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60'
                            : 'bg-secondary/10 dark:bg-secondary/20 text-secondary hover:bg-secondary/20 dark:hover:bg-secondary/30'
                    }`}
                    aria-label={`Mark ${row.books?.title} as returned`}
                >
                    {returningId === row.id
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <CheckCircle className="w-3.5 h-3.5" />
                    }
                    Mark Returned
                </button>
            ),
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text dark:text-slate-100">Return Book</h2>
                <span className="text-sm text-gray-400 dark:text-gray-500">{data.length} pending</span>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                    {error}
                </div>
            )}

            <Table
                columns={columns}
                data={data}
                isLoading={isLoading}
                emptyMessage="No pending returns."
            />
        </div>
    );
};

export default ReturnBook;
