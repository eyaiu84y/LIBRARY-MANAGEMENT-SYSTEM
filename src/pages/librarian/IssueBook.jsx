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
            const student = mockStudents.find((s) => s.id === parseInt(formData.studentId));
            const book = mockBooks.find((b) => b.id === parseInt(formData.bookId));
            console.log('Book Issued:', { student: student?.name, book: book?.title, issueDate: formData.issueDate, dueDate: formData.dueDate });
            setSuccess(true);
            setIsSubmitting(false);
            setFormData({ studentId: '', bookId: '', issueDate: getToday(), dueDate: getDefaultDue() });
        }, 2000);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-text mb-6">Issue a Book</h2>

            <div className="bg-white rounded-xl p-6 shadow-soft max-w-lg">
                {success && (
                    <div className="p-3 mb-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-in">
                        Book issued successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Select Student */}
                    <div className="space-y-1.5">
                        <label htmlFor="studentId" className="block text-sm font-medium text-text/80">Select Student</label>
                        <select
                            id="studentId"
                            name="studentId"
                            required
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-text text-sm focus-glow"
                            aria-label="Select student"
                        >
                            <option value="">— Choose a student —</option>
                            {mockStudents.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Book */}
                    <div className="space-y-1.5">
                        <label htmlFor="bookId" className="block text-sm font-medium text-text/80">Select Book</label>
                        <select
                            id="bookId"
                            name="bookId"
                            required
                            value={formData.bookId}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-text text-sm focus-glow"
                            aria-label="Select book"
                        >
                            <option value="">— Choose a book —</option>
                            {mockBooks.map((b) => (
                                <option key={b.id} value={b.id}>{b.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* Issue Date */}
                    <div className="space-y-1.5">
                        <label htmlFor="issueDate" className="block text-sm font-medium text-text/80">Issue Date</label>
                        <input
                            id="issueDate"
                            name="issueDate"
                            type="date"
                            required
                            value={formData.issueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-text text-sm focus-glow"
                        />
                    </div>

                    {/* Due Date */}
                    <div className="space-y-1.5">
                        <label htmlFor="dueDate" className="block text-sm font-medium text-text/80">Due Date</label>
                        <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            required
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-text text-sm focus-glow"
                        />
                    </div>

                    <Button type="submit" isLoading={isSubmitting}>Issue Book</Button>
                </form>
            </div>
        </div>
    );
};

export default IssueBook;
