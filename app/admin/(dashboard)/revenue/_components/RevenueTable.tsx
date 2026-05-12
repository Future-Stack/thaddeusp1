"use client"
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useRevenueEvents } from '@/hooks/useRevenue';
import { Skeleton } from '@/components/ui/skeleton';

const RevenueTable = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: response, isLoading, isError } = useRevenueEvents(page, limit);

    const revenueData = useMemo(() => {
        return response?.data?.data || [];
    }, [response]);

    const meta = response?.data?.meta;

    const totals = useMemo(() => {
        return revenueData.reduce((acc, curr) => ({
            ticketsSold: acc.ticketsSold + curr.ticketsSold,
            poolTotal: acc.poolTotal + curr.poolTotal,
            voucherCost: acc.voucherCost + curr.voucherCost,
            donateAmount: acc.donateAmount + (curr.poolTotal - curr.voucherCost),
        }), { ticketsSold: 0, poolTotal: 0, voucherCost: 0, donateAmount: 0 });
    }, [revenueData]);

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (meta && page < meta.totalPages) setPage(p => p + 1);
    };

    if (isError) {
        return (
            <div className="bg-white rounded-[2.5rem] p-8 text-center border border-red-100">
                <p className="text-red-500 font-medium">Failed to load revenue data. Please try again later.</p>
            </div>
        );
    }

    return (
        <AnimationWrapper animationType="fadeUp" delay={0.5}>
            <div className="bg-white rounded-[2.5rem] p-4 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-6 sm:mb-8">Revenue by Event</h2>

                {/* ── Desktop table (sm and up) ── */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Event Name</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Tickets Sold</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Pool Total</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Voucher Cost</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Donate Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx}>
                                        <td className="py-5"><Skeleton className="h-4 w-32" /></td>
                                        <td className="py-5"><Skeleton className="h-4 w-16" /></td>
                                        <td className="py-5"><Skeleton className="h-4 w-20" /></td>
                                        <td className="py-5"><Skeleton className="h-4 w-20" /></td>
                                        <td className="py-5"><Skeleton className="h-4 w-20" /></td>
                                    </tr>
                                ))
                            ) : revenueData.length > 0 ? (
                                revenueData.map((row) => (
                                    <tr key={row.eventId} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5 font-bold text-[#111827] text-sm">{row.eventName}</td>
                                        <td className="py-5 text-gray-500 text-sm font-medium">{row.ticketsSold}</td>
                                        <td className="py-5 text-[#059669] text-sm font-bold">${row.poolTotal.toLocaleString()}</td>
                                        <td className="py-5 text-[#EF4444] text-sm font-bold">${row.voucherCost.toLocaleString()}</td>
                                        <td className="py-5 text-[#111827] text-sm font-bold">${(row.poolTotal - row.voucherCost).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-gray-400 font-medium">No revenue data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Mobile cards (below sm) ── */}
                <div className="sm:hidden space-y-3">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <div className="grid grid-cols-2 gap-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-12 ml-auto" />
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-12 ml-auto" />
                                </div>
                            </div>
                        ))
                    ) : revenueData.length > 0 ? (
                        <>
                            {revenueData.map((row) => (
                                <div key={row.eventId} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                                    <p className="font-bold text-[#111827] text-sm mb-3">{row.eventName}</p>
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tickets Sold</span>
                                        <span className="text-sm font-medium text-gray-500 text-right">{row.ticketsSold}</span>

                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pool Total</span>
                                        <span className="text-sm font-bold text-[#059669] text-right">${row.poolTotal.toLocaleString()}</span>

                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Voucher Cost</span>
                                        <span className="text-sm font-bold text-[#EF4444] text-right">${row.voucherCost.toLocaleString()}</span>

                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Donate Amount</span>
                                        <span className="text-sm font-bold text-[#111827] text-right">${(row.poolTotal - row.voucherCost).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Totals card */}
                            <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-4">
                                <p className="font-bold text-[#111827] text-sm uppercase tracking-wider mb-3">Total</p>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tickets Sold</span>
                                    <span className="text-sm font-extrabold text-[#111827] text-right">{totals.ticketsSold}</span>

                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pool Total</span>
                                    <span className="text-sm font-extrabold text-[#059669] text-right">${totals.poolTotal.toLocaleString()}</span>

                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Voucher Cost</span>
                                    <span className="text-sm font-extrabold text-[#EF4444] text-right">${totals.voucherCost.toLocaleString()}</span>

                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Donate Amount</span>
                                    <span className="text-sm font-extrabold text-[#111827] text-right">${totals.donateAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-10 text-center text-gray-400 font-medium">No revenue data available</div>
                    )}
                </div>

                {/* ── Pagination ── */}
                {meta && meta.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12">
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="p-2 text-gray-400 hover:text-[#4F46E5] disabled:opacity-30 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                            <ChevronLeft size={18} />
                            <span className="hidden xs:inline">Previous</span>
                        </button>

                        <div className="flex items-center gap-1 mx-1 sm:mx-2">
                            {Array.from({ length: Math.min(meta.totalPages, 5) }).map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === pageNum
                                                ? 'bg-[#E0E7FF] text-[#4F46E5]'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            {meta.totalPages > 5 && <span className="px-1 sm:px-2 text-gray-400">...</span>}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={page === meta.totalPages}
                            className="p-2 text-gray-400 hover:text-[#4F46E5] disabled:opacity-30 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                            <span className="hidden xs:inline">Next</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </AnimationWrapper>
    );
};

export default RevenueTable;