import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { fetchStudents, fetchBooks, issueBook } from '../../lib/librarian';
import { useAuth } from '../../context/AuthContext';

const getToday = () => new Date().toISOString().split('T')[0];
const getDefaultDue = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
};

const selectCls = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm focus-glow disabled:opacity-50';
const inputCls  = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm focus-glow';
const labelCls  = 'block text-sm font-medium text-text/80 dark:text-slate-300';

const IssueBook = () => {
    const { session } = useAuth();
    const [students, setStudents]   = useState([]);
    const [books, setBooks]         = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError]         = useState('');
    const [success, setSuccess]     = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        studentId: '',
        bookId: '',
        issueDate: getToday(),
        dueDate: getDefaultDue(),
    });

    useEffect(() => {
        const load = async () => {
            const [studentsRes, booksRes] = await Promise.all([fetchStudents(), fetchBooks()]);
            if (studentsRes.error) setError(studentsRes.error.message);
            if (booksRes.error)    setError(booksRes.error.message);
            setStudents(studentsRes.data || []);
            // Only show books that have available copies
            setBooks((booksRes.data || []).filter((b) => b.available_copies > 0));
            setLoadingData(false);
        };
        load();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        const { error } = await issueBook({
            book_id:    formData.bookId,
            student_id: formData.studentId,
            issued_by:  session.user.id,
            due_date:   new Date(formData.dueDate).toISOString(),
        });

        if (error) {
            setError(error.message);
        } else {
            const student = students.find((s) => s.id === formData.studentId);
            const book    = books.find((b) => b.id === formData.bookId);
            setSuccess(`"${book?.title}" issued to ${student?.full_name} successfully!`);
            setFormData({ studentId: '', bookId: '', issueDate: getToday(), dueDate: getDefaultDue() });
            // Refresh available books list
            const { data } = await fetchBooks();
            setBooks((data || []).filter((b) => b.available_copies > 0));
        }

        setIsSubmitting(false);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-text dark:text-slate-100 mb-6">Issue a Book</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-transparent dark:border-gray-700 max-w-lg">
                {success && (
                    <div className="p-3 mb-5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-sm animate-fade-in">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="p-3 mb-5 rounded-lg bg-error/10 border border-error/20 text-error text-sm animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Student */}
                    <div className="space-y-1.5">
                        <label htmlFor="studentId" className={labelCls}>Select Student</label>
                        <select
                            id="studentId" name="studentId" required
                            value={formData.studentId} onChange={handleChange}
                            className={selectCls} disabled={loadingData}
                        >
                            <option value="">{loadingData ? 'Loading...' : '— Choose a student —'}</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>
                            ))}
                        </select>
                    </div>

                    {/* Book */}
                    <div className="space-y-1.5">
                        <label htmlFor="bookId" className={labelCls}>Select Book</label>
                        <select
                            id="bookId" name="bookId" required
                            value={formData.bookId} onChange={handleChange}
                            className={selectCls} disabled={loadingData}
                        >
                            <option value="">{loadingData ? 'Loading...' : '— Choose a book —'}</option>
                            {books.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.title} — {b.author} ({b.available_copies} left)
                                </option>
                            ))}
                        </select>
                        {!loadingData && books.length === 0 && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">No books currently available.</p>
                        )}
                    </div>

                    {/* Issue Date */}
                    <div className="space-y-1.5">
                        <label htmlFor="issueDate" className={labelCls}>Issue Date</label>
                        <input id="issueDate" name="issueDate" type="date" required value={formData.issueDate} onChange={handleChange} className={inputCls} />
                    </div>

                    {/* Due Date */}
                    <div className="space-y-1.5">
                        <label htmlFor="dueDate" className={labelCls}>Due Date</label>
                        <input id="dueDate" name="dueDate" type="date" required value={formData.dueDate} min={formData.issueDate} onChange={handleChange} className={inputCls} />
                    </div>

                    <Button type="submit" isLoading={isSubmitting} disabled={loadingData}>
                        Issue Book
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default IssueBook;
