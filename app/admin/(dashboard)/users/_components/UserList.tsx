"use client"
import React, { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Loader2, Edit2 } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { useGetUsers } from '@/hooks/useUser';
import { useDebounce } from '@/hooks/useDebounce';
import UpdateUserStatusModal from './UpdateUserStatusModal';

const UserList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const limit = 10;

  const { data: usersData, isLoading, isError, error } = useGetUsers(page, limit, debouncedSearch);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const users = usersData?.data?.data || [];
  const meta = usersData?.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 };
  return (
    <AnimationWrapper animationType="fadeUp" delay={0.4}>
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">User list</h2>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F9FAFB] border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            {/* <button className="flex items-center gap-2 px-6 py-3 bg-[#F3F4F6] text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
              <Download size={18} />
              Export CSV
            </button> */}
          </div>
        </div>



        <div>
          {/* Desktop Table - hidden on mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Full Name</th>
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Email</th>
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Ticket Count</th>
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Role</th>
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">Status</th>
                  <th className="pb-4 pt-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  [...Array(5)].map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="py-5"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                      <td className="py-5"><div className="h-4 bg-gray-100 rounded w-40"></div></td>
                      <td className="py-5"><div className="h-8 w-8 bg-gray-100 rounded-full"></div></td>
                      <td className="py-5"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                      <td className="py-5"><div className="h-6 bg-gray-100 rounded-full w-20"></div></td>
                      <td className="py-5 text-right"><div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto"></div></td>
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-red-500">
                      Error loading users: {(error as any)?.message || 'Something went wrong'}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user: any) => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 font-bold text-[#111827] text-sm">{user.fullName}</td>
                      <td className="py-5 text-gray-500 text-sm">{user.email}</td>
                      <td className="py-5">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                          {user.ticketCount}
                        </span>
                      </td>
                      <td className="py-5">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-5">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${user.status === 'active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-5 text-right">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUpdateModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-indigo-50 rounded-lg transition-all"
                          title="Update Status"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - shown only on mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, idx) => (
                <div key={idx} className="py-4 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : isError ? (
              <div className="py-10 text-center text-red-500">
                Error loading users
              </div>
            ) : users.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No users found
              </div>
            ) : (
              users.map((user: any) => (
                <div key={user.id} className="py-4 flex flex-col gap-2 hover:bg-gray-50/50 transition-colors px-1">
                  {/* Top row: Name + Tickets badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827] text-sm">{user.fullName}</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
                      {user.ticketCount}
                    </span>
                  </div>

                  {/* Email */}
                  <span className="text-gray-500 text-sm truncate">{user.email}</span>

                  {/* Bottom row: Role + Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{user.role}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${user.status === 'active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                      {user.status}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUpdateModalOpen(true);
                    }}
                    className="mt-2 w-full py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                  >
                    <Edit2 size={14} />
                    Update Status
                  </button>
                </div>
              ))
            )}
          </div>
        </div>




        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="flex items-center gap-1 mx-2">
            {[...Array(meta.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              // Simple pagination logic: show current, first, last, and neighbors
              if (
                pageNum === 1 ||
                pageNum === meta.totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === pageNum
                      ? 'bg-[#E0E7FF] text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === page - 2 && pageNum > 1) ||
                (pageNum === page + 2 && pageNum < meta.totalPages)
              ) {
                return <span key={pageNum} className="px-2 text-gray-400">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages || isLoading}
            className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <UpdateUserStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </AnimationWrapper>
  );
};

export default UserList;
