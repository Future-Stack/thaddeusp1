"use client";

import React from "react";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { useCreateReview } from "@/hooks/useReviews";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const reviewSchema = z.object({
  text: z.string().min(10, "Review must be at least 10 characters long").max(500, "Review must be less than 500 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
    },
  });

  const { mutate: createReview, isPending } = useCreateReview();

  const onSubmit = (data: ReviewFormValues) => {
    createReview(data, {
      onSuccess: () => {
        toast.success("Thank you for your review!");
        reset();
        onClose();
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || "Failed to submit review. Please try again.";
        toast.error(message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6 sm:p-8 font-inter">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[#F54900]" />
          </div>
          <h2 className="text-2xl sm:text-[28px] font-black text-gray-900 tracking-tight">
            Share Your Experience
          </h2>
          <p className="text-gray-400 text-sm mt-1.5">
            Your feedback helps us improve and inspires others.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-semibold text-gray-700">
              Your Review
            </label>
            <div className="relative">
              <textarea
                id="text"
                rows={4}
                {...register("text")}
                className={`w-full px-4 py-3 rounded-2xl border-2 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all resize-none ${
                  errors.text 
                    ? "border-red-200 focus:border-red-500" 
                    : "border-gray-100 focus:border-[#F54900]"
                }`}
                placeholder="What do you think about our platform?"
                disabled={isPending}
              />
              {errors.text && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-medium text-red-500 mt-1"
                >
                  {errors.text.message}
                </motion.p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={!isPending ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isPending ? { scale: 0.98 } : {}}
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F54900] text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </motion.button>
        </form>
      </div>
    </Modal>
  );
};

export default AddReviewModal;
