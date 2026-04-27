import React from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

const users = [
    { name: 'Sarah Mitchell', email: 'sarah.m@email.com', region: 'New York', tickets: 3, date: 'Apr 15, 2026' },
    { name: 'John Davis', email: 'john.d@email.com', region: 'New York', tickets: 5, date: 'Apr 16, 2026' },
    { name: 'Maria Garcia', email: 'maria.g@email.com', region: 'New York', tickets: 2, date: 'Apr 14, 2026' },
    { name: 'James Wilson', email: 'james.w@email.com', region: 'New York', tickets: 1, date: 'Apr 17, 2026' },
    { name: 'Lisa Anderson', email: 'lisa.a@email.com', region: 'New York', tickets: 4, date: 'Apr 15, 2026' },
];

const UserList = () => {    
    return (
        <AnimationWrapper animationType="fadeUp" delay={0.4}>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-[#111827]">user list</h2>
                    
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                className="w-full pl-12 pr-4 py-3 bg-[#F9FAFB] border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#F3F4F6] text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Name</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Email</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Region</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Tickets</th>
                                <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-bold text-[#111827] text-sm">{user.name}</td>
                                    <td className="py-5 text-gray-500 text-sm">{user.email}</td>
                                    <td className="py-5 text-gray-500 text-sm">{user.region}</td>
                                    <td className="py-5">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                                            {user.tickets}
                                        </span>
                                    </td>
                                    <td className="py-5 text-gray-500 text-sm">{user.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}

<div>
  {/* Desktop Table - hidden on mobile */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-left border-b border-gray-50">
          <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Name</th>
          <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Email</th>
          <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Region</th>
          <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Tickets</th>
          <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Purchase Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {users.map((user, idx) => (
          <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
            <td className="py-5 font-bold text-[#111827] text-sm">{user.name}</td>
            <td className="py-5 text-gray-500 text-sm">{user.email}</td>
            <td className="py-5 text-gray-500 text-sm">{user.region}</td>
            <td className="py-5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                {user.tickets}
              </span>
            </td>
            <td className="py-5 text-gray-500 text-sm">{user.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards - shown only on mobile */}
  <div className="sm:hidden divide-y divide-gray-100">
    {users.map((user, idx) => (
      <div key={idx} className="py-4 flex flex-col gap-2 hover:bg-gray-50/50 transition-colors px-1">
        
        {/* Top row: Name + Tickets badge */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#111827] text-sm">{user.name}</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
            {user.tickets}
          </span>
        </div>

        {/* Email */}
        <span className="text-gray-500 text-sm truncate">{user.email}</span>

        {/* Bottom row: Region + Date */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{user.region}</span>
          <span className="text-gray-400 text-xs">{user.date}</span>
        </div>

      </div>
    ))}
  </div>
</div>




                <div className="flex justify-center items-center gap-2 mt-12">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
                        <ChevronLeft size={18} />
                        Previous
                    </button>
                    
                    <div className="flex items-center gap-1 mx-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium bg-[#E0E7FF] text-primary">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">3</button>
                        <span className="px-2 text-gray-400">...</span>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default UserList;
