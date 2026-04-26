import React, { useState, useEffect } from 'react';
import Table from '../../components/ui/Table';

const mockBooks = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software', availability: 'Available' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software', availability: 'Available' },
    { id: 3, title: 'Design Patterns', author: 'Gang of Four', category: 'Software', availability: 'Unavailable' },
    { id: 4, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', availability: 'Available' },
    { id: 5, title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'AI / ML', availability: 'Available' },
    { id: 6, title: 'Database Systems', author: 'Ramez Elmasri', category: 'Computer Science', availability: 'Unavailable' },
    { id: 7, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', availability: 'Available' },
    { id: 8, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', availability: 'Available' },
];

const categories = ['All', ...new Set(mockBooks.map((b) => b.category))];

const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    {
        key: 'availability',
        label: 'Availability',
        render: (row) => (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                row.availability === 'Available'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
            }`}>
                {row.availability}
            </span>
        ),
    },
];

const ViewBooks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockBooks);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const filteredData = selectedCategory === 'All'
        ? data
        : data.filter((book) => book.category === selectedCategory);

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-text dark:text-slate-100">View Books</h2>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{filteredData.length} books found</p>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="category-filter" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category:
                    </label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-text dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        aria-label="Filter by category"
                    >
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>
            <Table columns={columns} data={filteredData} isLoading={isLoading} emptyMessage="No books found." />
        </div>
    );
};

export default ViewBooks;
