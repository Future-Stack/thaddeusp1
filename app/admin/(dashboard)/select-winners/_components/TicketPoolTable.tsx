"use client";

import React, { useState } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useEventAdminUsers } from '@/hooks/useEvents';
import { useDebounce } from '@/hooks/useDebounce';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface TicketPoolTableProps {
    eventId: string;
}

const TicketPoolTable: React.FC<TicketPoolTableProps> = ({ eventId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: usersData, isLoading, isError } = useEventAdminUsers(eventId, {
        page,
        limit,
        searchTerm: debouncedSearchTerm,
    });

    const users = usersData?.data?.data || [];
    const meta = usersData?.data?.meta;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1); 
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    return (
        <AnimationWrapper animationType="fadeUp" delay={0.5}>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-xl font-bold text-[#111827]">Ticket Pool</h2>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 sm:min-w-75">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                     
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {isError ? (
                        <div className="text-center py-12 text-red-500 bg-red-50 rounded-2xl border border-red-100">
                            Failed to load ticket pool data.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="text-left py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="text-center py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tickets</th>
                                    <th className="text-right py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="py-4 px-4"><Skeleton className="h-5 w-32" /></td>
                                            <td className="py-4 px-4"><Skeleton className="h-5 w-40" /></td>
                                            <td className="py-4 px-4 flex justify-center"><Skeleton className="h-6 w-6 rounded-full" /></td>
                                            <td className="py-4 px-4 text-right flex justify-end"><Skeleton className="h-5 w-24" /></td>
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-gray-400">
                                            No tickets found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-4 text-sm font-bold text-[#111827]">{user.name}</td>
                                            <td className="py-4 px-4 text-sm text-gray-500">{user.email}</td>
                                            <td className="py-4 px-4 text-center">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold">
                                                    {user.ticketAmount}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right text-sm text-gray-400 font-medium">
                                                {format(new Date(user.purchasedDate), 'MMM dd, yyyy')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {!isLoading && !isError && meta && meta.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button 
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="p-2 text-gray-400 hover:text-[#111827] transition-colors disabled:opacity-30"
                        >
                            <span className="flex items-center gap-1 text-xs font-bold">
                                <ChevronLeftIcon /> Previous
                            </span>
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(meta.totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                if (
                                    pageNum === 1 || 
                                    pageNum === meta.totalPages || 
                                    (pageNum >= page - 1 && pageNum <= page + 1)
                                ) {
                                    return (
                                        <button 
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                                page === pageNum 
                                                ? 'bg-[#D1E9FF] text-[#1E40AF]' 
                                                : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (pageNum === page - 2 || pageNum === page + 2) {
                                    return <span key={pageNum} className="px-1 text-gray-300">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        <button 
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === meta.totalPages}
                            className="p-2 text-gray-400 hover:text-[#111827] transition-colors disabled:opacity-30"
                        >
                            <span className="flex items-center gap-1 text-xs font-bold">
                                 Next <ChevronRightIcon />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </AnimationWrapper>
    );
};

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ExportIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
);

const ChevronLeftIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export default TicketPoolTable;
