"use client";

import { useState } from 'react';
import { MapPin, Phone, DollarSign, Edit } from 'lucide-react';
import EditVendorModal from './EditVendorModal';

interface VendorCardProps {
    name: string;
    city: string;
    address: string;
    phone: string;
    voucherValue: string;
}

const VendorCard: React.FC<VendorCardProps> = ({ name, city, address, phone, voucherValue }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const vendor = { name, city, address, phone, voucherValue };

    return (
        <>
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:shadow-[0_15px_50px_rgba(0,0,0,0.04)] transition-all duration-300">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-[#111827]">{name}</h3>
                        <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {city}
                        </span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin size={16} className="text-gray-400" />
                            <span>{address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Phone size={16} className="text-gray-400" />
                            <span>{phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <DollarSign size={16} className="text-gray-400" />
                            <span className="text-[#111827]">Voucher Value: <span className="text-primary font-bold">{voucherValue}</span></span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                    <Edit size={16} />
                    Edit
                </button>
            </div>

            <EditVendorModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                vendor={vendor}
            />
        </>
    );
};

export default VendorCard;

