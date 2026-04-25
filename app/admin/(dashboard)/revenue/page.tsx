import { Download, ChevronDown } from 'lucide-react';
import RevenueStats from './_components/RevenueStats';
import RevenueTable from './_components/RevenueTable';
import AnimationWrapper from '@/components/AnimationWrapper';

const RevenuePage = () => {
    return (
        <div className="  w-full  mx-auto">
            <AnimationWrapper animationType="fadeDown" delay={0.1}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">Revenue Tracker</h1>
                        <p className="text-gray-500 mt-1 font-medium">Financial overview by region and week</p>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative min-w-40">
                            <select className="appearance-none w-full bg-white border border-gray-100 rounded-full px-6 py-3 pr-12 text-sm font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-sm cursor-pointer transition-all">
                                <option>last week</option>
                                <option>last month</option>
                                <option>last year</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                        
                        <button className="flex items-center gap-2 px-8 py-3 bg-[#059669] text-white rounded-full text-sm font-bold hover:bg-[#047857] shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap">
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>
            </AnimationWrapper>

            <RevenueStats />
            <RevenueTable />
        </div>
    );
};

export default RevenuePage;
