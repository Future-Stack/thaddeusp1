"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Modal from "@/components/Modal";

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddVendorModal: React.FC<AddVendorModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    address: "",
    phone: "",
    voucherValue: "25",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log("Submitting vendor data:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-0">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Add New Vendor</h2>
          <p className="text-[#6B7280] text-sm">Add a pizza vendor for a specific region</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Region */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Region *</label>
            <div className="relative">
              <select
                className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] appearance-none focus:ring-2 focus:ring-gray-200 transition-all outline-none"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                required
              >
                <option value="" disabled>Select a region</option>
                <option value="NYC">New York</option>
                <option value="LA">Los Angeles</option>
                <option value="HOU">Houston</option>
                <option value="CHI">Chicago</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" size={18} />
            </div>
          </div>

          {/* Vendor Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Vendor Name *</label>
            <input
              type="text"
              placeholder="e.g., Joe's Pizza NYC"
              className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Address *</label>
            <input
              type="text"
              placeholder="123 Main St, City, State ZIP"
              className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Phone Number *</label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Voucher Value */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Voucher Value ($)</label>
            <input
              type="text"
              placeholder="25"
              className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              value={formData.voucherValue}
              onChange={(e) => setFormData({ ...formData, voucherValue: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-[#111827] hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#020617] text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-lg"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddVendorModal;
