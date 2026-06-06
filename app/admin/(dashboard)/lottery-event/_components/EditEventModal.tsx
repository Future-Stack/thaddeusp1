"use client";

import React, { useEffect } from "react";
import Modal from "@/components/Modal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateEvent } from "@/hooks/useEvents";
import { CreateEventDto, Event } from "@/services/event.service";
import { Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventFormValues {
  name: string;
  description: string;
  status: "UPCOMING" | "ONGOING" | "CLOSED" | "COMPLETED" | "CANCELLED";
  drawDate: Date;
  ticketOpen: Date;
  ticketClose: Date;
  ticketPrice: number;
  prizeValue: number;
  maxTickets: number;
  isAutoDraw: boolean;
}

const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["UPCOMING", "ONGOING", "CLOSED", "COMPLETED", "CANCELLED"]),
  drawDate: z.date({ message: "Draw date is required" }),
  ticketOpen: z.date({ message: "Ticket open date is required" }),
  ticketClose: z.date({ message: "Ticket close date is required" }),
  ticketPrice: z.number().min(0, "Ticket price cannot be negative"),
  prizeValue: z.number().min(0, "Prize value cannot be negative"),
  maxTickets: z.number().min(1, "Max tickets must be at least 1"),
  isAutoDraw: z.boolean(),
});

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  event: Event | null;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const { mutate: updateEvent, isPending } = useUpdateEvent();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  // Sync form when event changes
  useEffect(() => {
    if (event && isOpen) {
      reset({
        name: event.name,
        description: event.description,
        status: event.status,
        drawDate: new Date(event.drawDate),
        ticketOpen: new Date(event.ticketOpen),
        ticketClose: new Date(event.ticketClose),
        ticketPrice: event.ticketPrice,
        prizeValue: event.prizeValue,
        maxTickets: event.maxTickets,
        isAutoDraw: event.isAutoDraw,
      });
    }
  }, [event, isOpen, reset]);

  const onSubmit = (data: EventFormValues) => {
    if (!event) return;

    // Convert dates to ISO format
    const payload: Partial<CreateEventDto> = {
      ...data,
      drawDate: new Date(data.drawDate).toISOString(),
      ticketOpen: new Date(data.ticketOpen).toISOString(),
      ticketClose: new Date(data.ticketClose).toISOString(),
    };

    updateEvent({ id: event.id, data: payload }, {
      onSuccess: () => {
        if (onSave) {
          onSave();
        } else {
          onClose();
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-h-[80vh] overflow-y-auto scrollbar-hide">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#111827]/10 flex items-center justify-center">
              <EditIcon />
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">Edit Event</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Update the details for <span className="font-semibold text-[#111827]">{event?.name}</span>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Event Name */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g., Summer Lucky Draw"
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm placeholder:text-gray-400`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Event Status */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Event Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("status")}
                className={`w-full px-4 py-3 rounded-xl border ${errors.status ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm appearance-none bg-white`}
              >
                {event?.status === "UPCOMING" && (
                  <option value="UPCOMING">UPCOMING</option>
                )}
                <option value="ONGOING">ONGOING</option>
                <option value="CLOSED">CLOSED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDownIcon />
              </div>
            </div>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>

          {/* Draw Date */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Draw Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Controller
                control={control}
                name="drawDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select draw date and time"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.drawDate ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                    wrapperClassName="w-full"
                    popperPlacement="bottom-end"
                    portalId="edit-datepicker-portal"
                  />
                )}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <CalendarIcon />
              </div>
            </div>
            {errors.drawDate && <p className="text-red-500 text-xs mt-1">{errors.drawDate.message}</p>}
          </div>

          {/* Ticket Sales Window */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Ticket Sales Open <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  control={control}
                  name="ticketOpen"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select opening time"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.ticketOpen ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                      wrapperClassName="w-full"
                      popperPlacement="bottom-end"
                      portalId="edit-datepicker-portal"
                    />
                  )}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <CalendarIcon />
                </div>
              </div>
              {errors.ticketOpen && <p className="text-red-500 text-xs mt-1">{errors.ticketOpen.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Ticket Sales Close <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  control={control}
                  name="ticketClose"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select closing time"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.ticketClose ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                      wrapperClassName="w-full"
                      popperPlacement="bottom-end"
                      portalId="edit-datepicker-portal"
                    />
                  )}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <CalendarIcon />
                </div>
              </div>
              {errors.ticketClose && <p className="text-red-500 text-xs mt-1">{errors.ticketClose.message}</p>}
            </div>
          </div>

          {/* Pricing and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Ticket Price ($)</label>
              <input
                type="number"
                {...register("ticketPrice", { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.ticketPrice ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm`}
              />
              {errors.ticketPrice && <p className="text-red-500 text-xs mt-1">{errors.ticketPrice.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Prize Value ($)</label>
              <input
                type="number"
                {...register("prizeValue", { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.prizeValue ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm`}
              />
              {errors.prizeValue && <p className="text-red-500 text-xs mt-1">{errors.prizeValue.message}</p>}
            </div>
          </div>

          {/* Maximum Tickets */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Maximum Tickets</label>
            <input
              type="number"
              {...register("maxTickets", { valueAsNumber: true })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.maxTickets ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm`}
            />
            {errors.maxTickets && <p className="text-red-500 text-xs mt-1">{errors.maxTickets.message}</p>}
          </div>

          {/* Auto Draw Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="editIsAutoDraw"
              {...register("isAutoDraw")}
              className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827]"
            />
            <label htmlFor="editIsAutoDraw" className="text-sm font-bold text-[#111827] cursor-pointer">
              Enable Automatic Draw
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Event Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm resize-none`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-[#111827] text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isPending ? "Updating..." : "Update Event"}
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

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

// Custom styles for DatePicker
const datePickerStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
  }
  .react-datepicker-popper {
    z-index: 9999 !important;
  }
  .react-datepicker {
    font-family: inherit;
    border-radius: 16px;
    border: 1px solid #F3F4F6;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #F3F4F6;
  }
  .react-datepicker__day--selected {
    background-color: #111827 !important;
    border-radius: 8px;
  }
`;

if (typeof document !== 'undefined') {
  const portalDiv = document.getElementById('edit-datepicker-portal');
  if (!portalDiv) {
    const div = document.createElement('div');
    div.id = 'edit-datepicker-portal';
    document.body.appendChild(div);
  }

  const styleId = 'edit-datepicker-styles';
  let style = document.getElementById(styleId) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }
  style.innerHTML = datePickerStyles;
}

export default EditEventModal;
