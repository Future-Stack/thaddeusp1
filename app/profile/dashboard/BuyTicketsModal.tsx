"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";

interface BuyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuyTicketsModal: React.FC<BuyTicketsModalProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const pricePerTicket = 1.0;
  const totalPoolTickets = 248;

  const total = quantity * pricePerTicket;
  const odds = ((quantity / (totalPoolTickets + quantity)) * 100).toFixed(2);
  const oddsRatio = Math.round((totalPoolTickets + quantity) / quantity);

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-160">
      <div className="p-6 sm:p-8 font-inter">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-[28px] font-black text-gray-900 tracking-tight">
            Buy Your Tickets
          </h2>
          <p className="text-gray-400 text-sm mt-1.5">
            Don&apos;t miss out—grab your tickets now
          </p>
        </div>

        {/* Draw Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="border border-primary/30 bg-[#FFF7ED] rounded-2xl p-4 sm:p-5 mb-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">New York Draw</h3>
              <p className="text-gray-400 text-sm mt-0.5">
                Next draw: April 20, 2026
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-primary shrink-0">
              <span className="text-lg">⏱</span>
              <span className="text-sm font-bold text-primary">
                Closes Sunday 11:59 PM
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quantity Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-6"
        >
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Number of Tickets
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={decrement}
              disabled={quantity <= 1}
              className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-bold text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </motion.button>
            <div className="w-16 h-11 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-lg font-bold text-gray-900">
              {quantity}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={increment}
              disabled={quantity >= 99}
              className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-bold text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </motion.button>
          </div>
        </motion.div>

        {/* Price Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="border border-gray-100 rounded-2xl p-5 mb-5 space-y-3"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Tickets</span>
            <span className="text-gray-900 font-semibold">{quantity}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Price per ticket</span>
            <span className="text-gray-900 font-semibold">
              ${pricePerTicket.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.2, color: "#F54900" }}
              animate={{ scale: 1, color: "#F54900" }}
              className="text-xl font-medium"
            >
              ${total.toFixed(2)}
            </motion.span>
          </div>
        </motion.div>

        {/* Odds Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-[#FFF7ED] border border-orange-200/60 rounded-2xl p-4 mb-6 flex items-center gap-3"
        >
          <span className="text-2xl">📊</span>
          <div>
            <p className="font-bold text-gray-900 text-sm">
              Your chances this week
            </p>
            <p className="text-gray-500 text-sm mt-0.5">
              1 in {oddsRatio} ({odds}%)
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all text-base tracking-wide"
        >
          Proceed to Payment
        </motion.button>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By purchasing, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-gray-600 transition-colors">
            Terms & Conditions
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default BuyTicketsModal;
