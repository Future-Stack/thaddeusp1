"use client";
import React from "react";
import Modal from "@/components/Modal";
import { useUpdateUserStatus } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

interface UpdateUserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
}

const UpdateUserStatusModal: React.FC<UpdateUserStatusModalProps> = ({ isOpen, onClose, user }) => {
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  const handleUpdate = (status: "active" | "suspended") => {
    if (!user) return;
    updateStatus(
      { id: user.id, status },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-8">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-[#111827] mb-2">Update User Status</h2>
          <p className="text-gray-500 text-sm">
            Change account status for <span className="font-semibold text-[#111827]">{user.fullName}</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleUpdate("active")}
            disabled={isPending || user.status === "active"}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              user.status === "active"
                ? "bg-green-50 text-green-400 cursor-not-allowed border border-green-100"
                : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-100"
            }`}
          >
            {isPending && user.status !== "active" && <Loader2 className="w-4 h-4 animate-spin" />}
            Set to Active
          </button>

          <button
            onClick={() => handleUpdate("suspended")}
            disabled={isPending || user.status === "suspended"}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              user.status === "suspended"
                ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
            }`}
          >
            {isPending && user.status !== "suspended" && <Loader2 className="w-4 h-4 animate-spin" />}
            Suspend Account
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-4 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UpdateUserStatusModal;
