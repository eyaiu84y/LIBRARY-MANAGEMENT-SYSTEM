import React from 'react';
import { Loader2 } from 'lucide-react';

const Table = ({ columns, data, isLoading, onAction, emptyMessage = 'No data found.' }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 text-sm">{emptyMessage}</div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-soft">
            <table className="w-full text-sm text-left" role="table">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                scope="col"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={row.id || idx}
                            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150"
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-5 py-3.5 text-text whitespace-nowrap">
                                    {col.render ? col.render(row, onAction) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
