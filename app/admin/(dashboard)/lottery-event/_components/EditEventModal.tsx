"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";

interface LotteryEvent {
  id: string;
  title: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  location: string;
  drawDate: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  prizeValue: number;
  salesOpen: string;
  salesClose: string;
  ticketPrice: number;
  winner?: string;
}

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: LotteryEvent | null;
  onSave?: (updated: LotteryEvent) => void;
}

// Converts "22/04/2026, 00:00:00" -> "2026-04-22" for <input type="date">
const toDateInput = (str: string) => {
  try {
    const [datePart] = str.split(",");
    const [day, month, year] = datePart.trim().split("/");
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
};

// Converts "May 1, 2026" -> "2026-05-01"
const drawDateToInput = (str: string) => {
  try {
    const d = new Date(str);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  } catch {
    return "";
  }
};

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    status: "Active" as LotteryEvent["status"],
    drawDate: "",
    salesOpen: "",
    salesClose: "",
    ticketPrice: "",
    prizeValue: "",
    totalTickets: "",
  });

  // Sync form when event changes
  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        location: event.location,
        status: event.status,
        drawDate: drawDateToInput(event.drawDate),
        salesOpen: toDateInput(event.salesOpen),
        salesClose: toDateInput(event.salesClose),
        ticketPrice: String(event.ticketPrice),
        prizeValue: String(event.prizeValue),
        totalTickets: String(event.totalTickets),
      });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    onSave?.({
      ...event,
      title: form.title,
      location: form.location,
      status: form.status,
      drawDate: form.drawDate,
      salesOpen: form.salesOpen,
      salesClose: form.salesClose,
      ticketPrice: parseFloat(form.ticketPrice) || 0,
      prizeValue: parseFloat(form.prizeValue) || 0,
      totalTickets: parseInt(form.totalTickets) || 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
              <EditIcon />
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">Edit Event</h2>
          </div>
          <p className="text-gray-500 text-sm pl-12">
            Update the details for <span className="font-semibold text-[#111827]">{event?.title}</span>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Event Name */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Spring Pizza Week"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Region / Status row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Region / City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm appearance-none bg-white"
                >
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Birmingham">Birmingham</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm appearance-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
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
                name="drawDate"
                value={form.drawDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <CalendarIcon />
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-gray-400">The date when the winner will be selected</p>
          </div>

          {/* Sales Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Sales Open <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="salesOpen"
                  value={form.salesOpen}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalendarIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Sales Close <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="salesClose"
                  value={form.salesClose}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Ticket Price ($)</label>
              <input
                type="number"
                name="ticketPrice"
                value={form.ticketPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Prize Value ($)</label>
              <input
                type="number"
                name="prizeValue"
                value={form.prizeValue}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Max Tickets</label>
              <input
                type="number"
                name="totalTickets"
                value={form.totalTickets}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-sm"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#2563EB] text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              <SaveIcon />
              Save Changes
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

// Icons
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

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

export default EditEventModal;
