"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { useBuyTickets } from "@/hooks/usePurchase";
import { useRunningEvent } from "@/hooks/useEvents";
import { format } from "date-fns";
import { Loader2, Ticket, CalendarDays, Clock } from "lucide-react";
import type { Event } from "@/services/event.service";

interface BuyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pass the currently selected event from the dashboard (optional – falls back to the running event) */
  event?: Pick<Event, "id" | "name" | "drawDate" | "ticketClose" | "ticketPrice" | "status"> | null;
}

const BuyTicketsModal: React.FC<BuyTicketsModalProps> = ({
  isOpen,
  onClose,
  event: eventProp,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Fall back to the live running event if no event is passed from the parent
  const { data: runningEventResponse, isLoading: isRunningEventLoading } =
    useRunningEvent();
  const runningEvent = runningEventResponse?.data ?? null;

  // Use the prop event if provided, otherwise use the running event from API
  const currentEvent: Pick<
    Event,
    "id" | "name" | "drawDate" | "ticketClose" | "ticketPrice" | "status"
  > | null = eventProp ?? runningEvent;

  const pricePerTicket = Number(currentEvent?.ticketPrice ?? 1.0);
  const total = quantity * pricePerTicket;

  const { mutate: buyTickets, isPending } = useBuyTickets({
    onSuccess: () => {
      // If no payment URL is returned the hook shows a toast; close the modal
      onClose();
    },
  });

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleProceed = () => {
    if (!currentEvent?.id) return;
    buyTickets({ eventId: currentEvent.id, quantity });
  };

  // ── Formatted date helpers ────────────────────────────────────────────────
  const formattedDrawDate = currentEvent?.drawDate
    ? format(new Date(currentEvent.drawDate), "MMMM d, yyyy")
    : "—";

  const formattedTicketClose = currentEvent?.ticketClose
    ? format(new Date(currentEvent.ticketClose), "EEEE h:mm a")
    : "—";

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
          {isRunningEventLoading && !eventProp ? (
            <div className="flex items-center gap-3 text-gray-400 text-sm animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading event details…
            </div>
          ) : currentEvent ? (
            <div className="flex items-start justify-between gap-4">
              {/* Event name + draw date */}
              <div className="min-w-0">
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {currentEvent.name}
                </h3>
                <p className="text-gray-400 text-sm mt-0.5 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                  Draw: {formattedDrawDate}
                </p>
              </div>
              {/* Ticket-close time */}
              <div className="flex items-center gap-1.5 text-primary shrink-0">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold text-primary">
                  Closes {formattedTicketClose}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No active event found.</p>
          )}
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
              disabled={quantity <= 1 || isPending}
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
              disabled={quantity >= 99 || isPending}
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
            <span className="text-gray-500 font-medium flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" />
              Tickets
            </span>
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

        {/* CTA Button */}
        <motion.button
          whileHover={!isPending && currentEvent ? { scale: 1.02, y: -1 } : {}}
          whileTap={!isPending && currentEvent ? { scale: 0.98 } : {}}
          onClick={handleProceed}
          disabled={isPending || !currentEvent?.id}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing…
            </>
          ) : (
            "Proceed to Payment"
          )}
        </motion.button>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By purchasing, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-gray-600 transition-colors">
            Terms &amp; Conditions
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default BuyTicketsModal;

