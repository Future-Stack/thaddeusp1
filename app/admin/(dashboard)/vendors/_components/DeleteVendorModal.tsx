"use client";

import React from "react";
import Modal from "@/components/Modal";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vendorName: string;
  isDeleting: boolean;
}

const DeleteVendorModal: React.FC<DeleteVendorModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  vendorName,
  isDeleting,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-0">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Delete Vendor</h2>
        <p className="text-[#6B7280] text-sm mb-8">
          Are you sure you want to delete <span className="font-semibold text-gray-900">{vendorName}</span>? 
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-[#111827] hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-100 disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteVendorModal;
