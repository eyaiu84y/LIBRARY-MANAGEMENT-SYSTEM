import { useState, useEffect, useCallback } from 'react';
import Table from '../../components/ui/Table';
import { fetchTransactions } from '../../lib/librarian';
import { supabase } from '../../supabase';

const statusStyles = {
    issued:   'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    returned: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    overdue:  'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
};

const fmt = (iso) => iso ? new Date(iso).toLocaleDateString() : '—';

const columns = [
    { key: 'student',     label: 'Student',     render: (row) => row.student?.full_name || '—' },
    { key: 'book',        label: 'Book',         render: (row) => row.books?.title || '—' },
    { key: 'issued_at',   label: 'Issue Date',   render: (row) => fmt(row.issued_at) },
    { key: 'due_date',    label: 'Due Date',     render: (row) => fmt(row.due_date) },
    { key: 'returned_at', label: 'Return Date',  render: (row) => fmt(row.returned_at) },
    {
        key: 'status', label: 'Status',
        render: (row) => (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[row.status] || ''}`}>
                {row.status}
            </span>
        ),
    },
];

const LibrarianTransactions = () => {
    const [data, setData]       = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]     = useState('');
    const [filter, setFilter]   = useState('all');

    const load = useCallback(async () => {
        const { data: txns, error: err } = await fetchTransactions();
        if (err) setError(err.message);
        else setData(txns || []);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        (async () => { await load(); })();

        const channel = supabase
            .channel('librarian-transactions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, load)
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [load]);

    const filtered = filter === 'all' ? data : data.filter((t) => t.status === filter);

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-text dark:text-slate-100">Transactions</h2>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{filtered.length} records</p>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 text-sm">
                    {['all', 'issued', 'returned', 'overdue'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md font-medium capitalize transition-all duration-200 ${
                                filter === f
                                    ? 'bg-white dark:bg-gray-600 text-text dark:text-slate-100 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-text dark:hover:text-slate-200'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                    {error}
                </div>
            )}

            <Table columns={columns} data={filtered} isLoading={isLoading} emptyMessage="No transactions found." />
        </div>
    );
};

export default LibrarianTransactions;
