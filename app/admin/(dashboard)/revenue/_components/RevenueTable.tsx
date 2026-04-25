import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

const revenueData = [
    { region: 'New York', ticketsSold: 312, poolTotal: 312, voucherCost: 25, donateAmount: 287 },
    { region: 'Los Angeles', ticketsSold: 198, poolTotal: 198, voucherCost: 25, donateAmount: 173 },
    { region: 'Chicago', ticketsSold: 156, poolTotal: 156, voucherCost: 25, donateAmount: 131 },
    { region: 'Houston', ticketsSold: 89, poolTotal: 89, voucherCost: 25, donateAmount: 64 },
    { region: 'Phoenix', ticketsSold: 45, poolTotal: 45, voucherCost: 25, donateAmount: 20 },
    { region: 'Philadelphia', ticketsSold: 32, poolTotal: 32, voucherCost: 25, donateAmount: 7 },
];

const totals = {
    ticketsSold: 832,
    poolTotal: 832,
    voucherCost: 150,
    donateAmount: 682
};

const RevenueTable = () => {
    return (
        <AnimationWrapper animationType="fadeUp" delay={0.5}>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100">
                <h2 className="text-2xl font-bold text-[#111827] mb-8">Revenue by Region</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Region</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Tickets Sold</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Pool Total</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Voucher Cost</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Donate Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {revenueData.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-bold text-[#111827] text-sm">{row.region}</td>
                                    <td className="py-5 text-gray-500 text-sm font-medium">{row.ticketsSold}</td>
                                    <td className="py-5 text-[#059669] text-sm font-bold">${row.poolTotal}</td>
                                    <td className="py-5 text-[#EF4444] text-sm font-bold">${row.voucherCost}</td>
                                    <td className="py-5 text-[#111827] text-sm font-bold">${row.donateAmount}</td>
                                </tr>
                            ))}
                            <tr className="bg-[#F9FAFB] border-t border-gray-100">
                                <td className="py-5 px-4 font-bold text-[#111827] text-sm uppercase tracking-wider">Total</td>
                                <td className="py-5 px-4 font-extrabold text-[#111827] text-sm">{totals.ticketsSold}</td>
                                <td className="py-5 px-4 font-extrabold text-[#059669] text-sm">${totals.poolTotal}</td>
                                <td className="py-5 px-4 font-extrabold text-[#EF4444] text-sm">${totals.voucherCost}</td>
                                <td className="py-5 px-4 font-extrabold text-[#111827] text-sm">${totals.donateAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center gap-2 mt-12">
                    <button className="p-2 text-gray-400 hover:text-[#4F46E5] transition-colors flex items-center gap-1 text-sm font-medium">
                        <ChevronLeft size={18} />
                        Previous
                    </button>
                    
                    <div className="flex items-center gap-1 mx-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium bg-[#E0E7FF] text-[#4F46E5]">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">3</button>
                        <span className="px-2 text-gray-400">...</span>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-[#4F46E5] transition-colors flex items-center gap-1 text-sm font-medium">
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default RevenueTable;
