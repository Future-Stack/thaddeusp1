"use client";

import React, { useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useUpdateVendor } from "@/hooks/useVendors";
import { useRegions } from "@/hooks/useRegions";
import { Vendor } from "@/services/vendor.service";

const vendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  voucherValue: z.number().min(0, "Voucher value must be at least 0"),
  regionId: z.string().min(1, "Region is required"),
});

type VendorFormValues = z.infer<typeof vendorSchema>;

interface EditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({ isOpen, onClose, vendor }) => {
  const { data: regions, isLoading: isRegionsLoading } = useRegions();
  const { mutate: updateVendor, isPending } = useUpdateVendor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
  });

  // Update form data when vendor prop changes
  useEffect(() => {
    if (vendor) {
      reset({
        regionId: vendor.regionId,
        name: vendor.name,
        address: vendor.address,
        phone: vendor.phone,
        voucherValue: vendor.voucherValue ? Number(vendor.voucherValue.replace("$", "").trim()) : 0,
      });
    }
  }, [vendor, reset]);

  const onSubmit = (data: VendorFormValues) => {
    if (!vendor) return;

    updateVendor(
      { id: vendor.id, data },
      {
        onSuccess: () => {
          toast.success("Vendor updated successfully");
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Failed to update vendor");
        },
      }
    );
  };

  if (!vendor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-0">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Edit Vendor</h2>
          <p className="text-[#6B7280] text-sm">Update pizza vendor information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Region */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Region *</label>
            <div className="relative">
              <select
                {...register("regionId")}
                className={`w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] appearance-none focus:ring-2 focus:ring-gray-200 transition-all outline-none ${errors.regionId ? "ring-2 ring-red-500" : ""
                  }`}
                disabled={isRegionsLoading}
              >
                <option value="" disabled>
                  {isRegionsLoading ? "Loading regions..." : "Select a region"}
                </option>
                {regions?.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
                size={18}
              />
            </div>
            {errors.regionId && (
              <p className="text-xs text-red-500 font-medium">{errors.regionId.message}</p>
            )}
          </div>

          {/* Vendor Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Vendor Name *</label>
            <input
              type="text"
              placeholder="e.g., Joe's Pizza NYC"
              {...register("name")}
              className={`w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none ${errors.name ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Address *</label>
            <input
              type="text"
              placeholder="123 Main St, City, State ZIP"
              {...register("address")}
              className={`w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none ${errors.address ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 font-medium">{errors.address.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Phone Number *</label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              {...register("phone")}
              className={`w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none ${errors.phone ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>
            )}
          </div>

          {/* Voucher Value */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">Voucher Value ($)</label>
            <input
              type="number"
              placeholder="25"
              {...register("voucherValue", { valueAsNumber: true })}
              className={`w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-gray-200 transition-all outline-none ${errors.voucherValue ? "ring-2 ring-red-500" : ""
                }`}
            />
            {errors.voucherValue && (
              <p className="text-xs text-red-500 font-medium">{errors.voucherValue.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-[#111827] hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#020617] text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Updating...</span>
                </>
              ) : (
                "Update Vendor"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditVendorModal;
