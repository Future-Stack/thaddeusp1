"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, MapPin, Phone, DollarSign, Edit } from 'lucide-react';
import VendorCard from './VendorCard';
import AnimationWrapper from '@/components/AnimationWrapper';
import AddVendorModal from './AddVendorModal';
import EditVendorModal from './EditVendorModal';
import DeleteVendorModal from './DeleteVendorModal';
import { useVendors, useDeleteVendor } from '@/hooks/useVendors';
import { useRegions } from '@/hooks/useRegions';
import { Skeleton } from '@/components/ui/skeleton';
import { Vendor } from '@/services/vendor.service';
import { toast } from 'sonner';

const VendorSkeleton = () => (
    <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-4 w-full sm:w-2/3">
            <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-48 rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-64 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-40 rounded" />
                </div>
            </div>
        </div>
        <Skeleton className="h-10 w-24 rounded-lg" />
    </div>
);

const VendorList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegionId, setSelectedRegionId] = useState<string | 'all'>('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
    const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

    const { data: vendors, isLoading: isVendorsLoading, error: vendorsError } = useVendors();
    const { data: regions, isLoading: isRegionsLoading } = useRegions();
    const { mutate: deleteVendor, isPending: isDeleting } = useDeleteVendor();

    const handleDeleteConfirm = () => {
        if (!vendorToDelete) return;
        deleteVendor(vendorToDelete.id, {
            onSuccess: () => {
                toast.success("Vendor deleted successfully");
                setVendorToDelete(null);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to delete vendor");
            }
        });
    };

    const filteredVendors = useMemo(() => {
        if (!vendors) return [];
        return vendors.filter(vendor => {
            const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.phone.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesRegion = selectedRegionId === 'all' || vendor.regionId === selectedRegionId;
            
            return matchesSearch && matchesRegion;
        });
    }, [vendors, searchQuery, selectedRegionId]);

    const selectedRegionName = useMemo(() => {
        if (selectedRegionId === 'all') return 'All Regions';
        return regions?.find(r => r.id === selectedRegionId)?.name || 'All Regions';
    }, [selectedRegionId, regions]);

    if (vendorsError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Failed to load vendors</h3>
                <p className="text-gray-500 mt-2">There was an error fetching the vendor list. Please try again later.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

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
                        placeholder="Search by name, address or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-sm transition-all"
                    />
                </div>
                
                <div className="relative">
                    <button 
                        onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                        className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {selectedRegionName}
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isRegionDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isRegionDropdownOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsRegionDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
                                <button
                                    onClick={() => {
                                        setSelectedRegionId('all');
                                        setIsRegionDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedRegionId === 'all' ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    All Regions
                                </button>
                                {regions?.map(region => (
                                    <button
                                        key={region.id}
                                        onClick={() => {
                                            setSelectedRegionId(region.id);
                                            setIsRegionDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedRegionId === region.id ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {region.name}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* List Section */}
            <div className="flex flex-col gap-4">
                {isVendorsLoading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                        <VendorSkeleton key={idx} />
                    ))
                ) : filteredVendors.length > 0 ? (
                    filteredVendors.map((vendor, idx) => (
                        <AnimationWrapper key={vendor.id} animationType="fadeUp" delay={idx * 0.05}>
                            <VendorCard 
                                id={vendor.id}
                                name={vendor.name}
                                city={vendor.region?.name || 'Unknown'}
                                address={vendor.address}
                                phone={vendor.phone}
                                voucherValue={vendor.voucherValue || 'N/A'}
                                regionId={vendor.regionId}
                                onEdit={() => setEditingVendor(vendor)}
                                onDelete={() => setVendorToDelete(vendor)}
                            />
                        </AnimationWrapper>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No vendors found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                )}
            </div>

            {/* Add Vendor Modal */}
            <AddVendorModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <EditVendorModal
                isOpen={!!editingVendor}
                onClose={() => setEditingVendor(null)}
                vendor={editingVendor}
            />

            {/* Delete Confirmation Modal */}
            <DeleteVendorModal
                isOpen={!!vendorToDelete}
                onClose={() => setVendorToDelete(null)}
                onConfirm={handleDeleteConfirm}
                vendorName={vendorToDelete?.name || ""}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default VendorList;
