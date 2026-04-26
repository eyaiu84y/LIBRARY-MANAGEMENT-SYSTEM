import { supabase } from '../supabase';

/* ─── BOOKS ──────────────────────────────────────────────────────── */

export const fetchBooks = async () => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title', { ascending: true });
    return { data, error };
};

export const addBook = async ({ title, author, category, isbn, total_copies }) => {
    const copies = parseInt(total_copies) || 0;
    const { data, error } = await supabase
        .from('books')
        .insert([{ title, author, category, isbn: isbn || null, total_copies: copies, available_copies: copies }])
        .select()
        .single();
    return { data, error };
};

export const updateBook = async (id, fields) => {
    const { data, error } = await supabase
        .from('books')
        .update(fields)
        .eq('id', id)
        .select()
        .single();
    return { data, error };
};

export const deleteBook = async (id) => {
    const { error } = await supabase.from('books').delete().eq('id', id);
    return { error };
};

/* ─── STUDENTS (profiles with role=student) ─────────────────────── */

export const fetchStudents = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'student')
        .order('full_name', { ascending: true });
    return { data, error };
};

/* ─── TRANSACTIONS ───────────────────────────────────────────────── */

export const fetchTransactions = async () => {
    const { data, error } = await supabase
        .from('transactions')
        .select(`
            id,
            issued_at,
            due_date,
            returned_at,
            status,
            books ( id, title ),
            student:profiles!transactions_student_id_fkey ( id, full_name )
        `)
        .order('issued_at', { ascending: false });
    return { data, error };
};

export const issueBook = async ({ book_id, student_id, issued_by, due_date }) => {
    // 1. Insert transaction
    const { data: txn, error: txnError } = await supabase
        .from('transactions')
        .insert([{ book_id, student_id, issued_by, due_date, status: 'issued' }])
        .select()
        .single();
    if (txnError) return { error: txnError };

    // 2. Decrement available_copies
    const { error: bookError } = await supabase.rpc('decrement_available_copies', { book_id });
    if (bookError) return { error: bookError };

    return { data: txn, error: null };
};

export const returnBook = async (transactionId, bookId) => {
    // 1. Mark transaction returned
    const { error: txnError } = await supabase
        .from('transactions')
        .update({ status: 'returned', returned_at: new Date().toISOString() })
        .eq('id', transactionId);
    if (txnError) return { error: txnError };

    // 2. Increment available_copies
    const { error: bookError } = await supabase.rpc('increment_available_copies', { book_id: bookId });
    return { error: bookError };
};

/* ─── DASHBOARD STATS ────────────────────────────────────────────── */

export const fetchLibrarianStats = async () => {
    const [booksRes, issuedRes, overdueRes] = await Promise.all([
        supabase.from('books').select('id', { count: 'exact', head: true }),
        supabase.from('transactions').select('id', { count: 'exact', head: true }).eq('status', 'issued'),
        supabase.from('transactions').select('id', { count: 'exact', head: true }).eq('status', 'overdue'),
    ]);
    return {
        totalBooks:   booksRes.count   ?? 0,
        totalIssued:  issuedRes.count  ?? 0,
        overdueBooks: overdueRes.count ?? 0,
        error: booksRes.error || issuedRes.error || overdueRes.error,
    };
};
