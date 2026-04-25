"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import VendorCard from './VendorCard';
import AnimationWrapper from '@/components/AnimationWrapper';
import AddVendorModal from './AddVendorModal';

const vendorsData = [
    {
        id: 1,
        name: "Joe's Pizza NYC",
        city: "New York",
        address: "7 Carmine St, New York, NY 10014",
        phone: "(212) 366-1182",
        voucherValue: "$25"
    },
    {
        id: 2,
        name: "Pizzana",
        city: "Los Angeles",
        address: "7 Carmine St, New York, NY 10014",
        phone: "(212) 366-1182",
        voucherValue: "$25"
    },
    {
        id: 3,
        name: "Pizzana",
        city: "Los Angeles",
        address: "7 Carmine St, New York, NY 10014",
        phone: "(212) 366-1182",
        voucherValue: "$25"
    },
    {
        id: 4,
        name: "Russo's New York Pizzeria",
        city: "Houston",
        address: "7 Carmine St, New York, NY 10014",
        phone: "(212) 366-1182",
        voucherValue: "$25"
    }
];

const VendorList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-[#111827]">Vendor Manager</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-xl text-sm font-bold hover:bg-[#059669] transition-all shadow-lg shadow-emerald-100"
                >
                    <Plus size={20} />
                    Add New Vendor
                </button>
            </div>

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-sm transition-all"
                    />
                </div>
                <div className="relative">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        New York
                        <ChevronDown size={18} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* List Section */}
            <div className="flex flex-col gap-4">
                {vendorsData.map((vendor, idx) => (
                    <AnimationWrapper key={vendor.id} animationType="fadeUp" delay={idx * 0.1}>
                        <VendorCard {...vendor} />
                    </AnimationWrapper>
                ))}
            </div>

            {/* Add Vendor Modal */}
            <AddVendorModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    );
};

export default VendorList;
