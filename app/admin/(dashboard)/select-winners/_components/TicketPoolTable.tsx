"use client";

import React from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';

const TicketPoolTable = () => {
    const tickets = [
        { name: 'Sarah Mitchell', email: 'sarah.m@email.com', tickets: 3, date: 'Apr 15, 2026' },
        { name: 'John Davis', email: 'john.d@email.com', tickets: 5, date: 'Apr 16, 2026' },
        { name: 'Maria Garcia', email: 'maria.g@email.com', tickets: 2, date: 'Apr 14, 2026' },
        { name: 'James Wilson', email: 'james.w@email.com', tickets: 1, date: 'Apr 17, 2026' },
        { name: 'Lisa Anderson', email: 'lisa.a@email.com', tickets: 4, date: 'Apr 15, 2026' },
    ];

    return (
        <AnimationWrapper animationType="fadeUp" delay={0.5}>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-xl font-bold text-[#111827]">Ticket Pool</h2>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 sm:min-w-[300px]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            <ExportIcon />
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
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
                            {tickets.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 text-sm font-bold text-[#111827]">{item.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{item.email}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold">
                                            {item.tickets}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right text-sm text-gray-400 font-medium">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#111827] transition-colors">
                        <span className="flex items-center gap-1 text-xs font-bold">
                            <ChevronLeftIcon /> Previous
                        </span>
                    </button>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100">1</button>
                        <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#D1E9FF] text-[#1E40AF]">2</button>
                        <button className="w-8 h-8 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100">3</button>
                        <span className="px-2 text-gray-300">...</span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-[#111827] transition-colors">
                        <span className="flex items-center gap-1 text-xs font-bold">
                             Next <ChevronRightIcon />
                        </span>
                    </button>
                </div>
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
