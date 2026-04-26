import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const mockStudents = [
    { id: 1, name: 'John Carter' },
    { id: 2, name: 'Sarah Kim' },
    { id: 3, name: 'Mike Brown' },
    { id: 4, name: 'Emily Chen' },
    { id: 5, name: 'James Wilson' },
];

const mockBooks = [
    { id: 1, title: 'Clean Code' },
    { id: 2, title: 'The Pragmatic Programmer' },
    { id: 3, title: 'Introduction to Algorithms' },
    { id: 4, title: 'Artificial Intelligence' },
    { id: 5, title: 'Database Systems' },
];

const getToday = () => new Date().toISOString().split('T')[0];
const getDefaultDue = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
};

const selectCls = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm focus-glow';
const inputCls  = 'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-slate-200 text-sm focus-glow';
const labelCls  = 'block text-sm font-medium text-text/80 dark:text-slate-300';

const IssueBook = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        bookId: '',
        issueDate: getToday(),
        dueDate: getDefaultDue(),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setSuccess(true);
            setIsSubmitting(false);
            setFormData({ studentId: '', bookId: '', issueDate: getToday(), dueDate: getDefaultDue() });
        }, 2000);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-text dark:text-slate-100 mb-6">Issue a Book</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-transparent dark:border-gray-700 max-w-lg">
                {success && (
                    <div className="p-3 mb-5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-sm animate-fade-in">
                        Book issued successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label htmlFor="studentId" className={labelCls}>Select Student</label>
                        <select id="studentId" name="studentId" required value={formData.studentId} onChange={handleChange} className={selectCls} aria-label="Select student">
                            <option value="">— Choose a student —</option>
                            {mockStudents.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="bookId" className={labelCls}>Select Book</label>
                        <select id="bookId" name="bookId" required value={formData.bookId} onChange={handleChange} className={selectCls} aria-label="Select book">
                            <option value="">— Choose a book —</option>
                            {mockBooks.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="issueDate" className={labelCls}>Issue Date</label>
                        <input id="issueDate" name="issueDate" type="date" required value={formData.issueDate} onChange={handleChange} className={inputCls} />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="dueDate" className={labelCls}>Due Date</label>
                        <input id="dueDate" name="dueDate" type="date" required value={formData.dueDate} onChange={handleChange} className={inputCls} />
                    </div>

                    <Button type="submit" isLoading={isSubmitting}>Issue Book</Button>
                </form>
            </div>
        </div>
    );
};

export default IssueBook;
