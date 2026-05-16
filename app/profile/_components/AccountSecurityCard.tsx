"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useChangePassword } from '@/hooks/useAuth';

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordForm) => {
    changePassword(
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      {
        onSuccess: (res) => {
          if (res.data.success) {
            reset();
            onClose();
          }
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-50 rounded-2xl">
                    <Lock className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('oldPassword')}
                      type={showOld ? 'text' : 'password'}
                      className={`w-full px-5 py-3 bg-gray-50 border ${errors.oldPassword ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-orange-500 transition-all`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1">{errors.oldPassword.message}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('newPassword')}
                      type={showNew ? 'text' : 'password'}
                      className={`w-full px-5 py-3 bg-gray-50 border ${errors.newPassword ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-orange-500 transition-all`}
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1">{errors.newPassword.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirm ? 'text' : 'password'}
                      className={`w-full px-5 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-orange-500 transition-all`}
                      placeholder="Repeat new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#F54900] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Changing Password...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AccountSecurityCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-[#1F2937] mb-6">Account Security</h2>

      <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-[#1F2937]">Password</h3>
          <p className="text-gray-400 text-sm mt-1">Last changed recently</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-white text-[#4B5563] text-sm font-bold rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all"
        >
          Change
        </button>
      </div>

      <ChangePasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AccountSecurityCard;

