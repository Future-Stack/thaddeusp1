"use client";

import React from "react";
import Modal from "@/components/Modal";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-h-[80vh] overflow-y-auto scrollbar-hide">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Create Lottery Event</h2>
          <p className="text-gray-500 text-sm">
            Set up a new lottery draw for a specific region with custom dates and times
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Event Name */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Spring Pizza Week, Holiday Special Draw"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Region / City */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Region / City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm appearance-none bg-white"
              >
                <option value="" disabled>
                  Select a region
                </option>
                <option value="london">London</option>
                <option value="manchester">Manchester</option>
                <option value="birmingham">Birmingham</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          {/* Draw Date */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Draw Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <CalendarIcon />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">The date when the winner will be selected</p>
          </div>

          {/* Ticket Sales Window */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Ticket Sales Open <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalendarIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Ticket Sales Close <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Ticket Price ($)</label>
              <input
                type="number"
                placeholder="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Prize Value ($)</label>
              <input
                type="number"
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
              />
            </div>
          </div>

          {/* Maximum Tickets */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Maximum Tickets (Optional)</label>
            <input
              type="number"
              placeholder="1000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm"
            />
            <p className="mt-2 text-[11px] text-gray-400">Set a maximum number of tickets that can be sold for this event</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Event Description (Optional)</label>
            <textarea
              placeholder="Add any special details about this event..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#111827] text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 bg-[#E5E7EB] text-[#4B5563] py-4 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default CreateEventModal;
