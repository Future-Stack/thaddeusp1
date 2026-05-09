"use client";

import React from "react";
import Modal from "@/components/Modal";
import { useRegions } from "@/hooks/useRegions";
import { Region } from "@/services/region.service";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateEvent } from "@/hooks/useEvents";
import { CreateEventDto } from "@/services/event.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  regionId: z.string().min(1, "Please select a region"),
  drawDate: z.date({ required_error: "Draw date is required" }),
  ticketOpen: z.date({ required_error: "Ticket open date is required" }),
  ticketClose: z.date({ required_error: "Ticket close date is required" }),
  ticketPrice: z.coerce.number().min(0, "Ticket price cannot be negative"),
  prizeValue: z.coerce.number().min(0, "Prize value cannot be negative"),
  maxTickets: z.coerce.number().min(1, "Max tickets must be at least 1"),
  isAutoDraw: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { data: regionsData, isLoading: regionsLoading } = useRegions();
  const regions = regionsData?.data || [];
  
  const { mutate: createEvent, isPending } = useCreateEvent();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isAutoDraw: false,
      ticketPrice: 10,
      prizeValue: 1000,
      maxTickets: 500,
    },
  });

  const onSubmit = (data: EventFormValues) => {
    // Convert dates to ISO format
    const payload: CreateEventDto = {
      ...data,
      drawDate: new Date(data.drawDate).toISOString(),
      ticketOpen: new Date(data.ticketOpen).toISOString(),
      ticketClose: new Date(data.ticketClose).toISOString(),
    };

    createEvent(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

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

          {/* Region / City */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">
              Region / City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("regionId")}
                defaultValue=""
                className={`w-full px-4 py-3 rounded-xl border ${errors.regionId ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm appearance-none bg-white`}
              >
                <option value="" disabled>
                  {regionsLoading ? "Loading regions..." : "Select a region"}
                </option>
                {regions.map((region: Region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDownIcon />
              </div>
            </div>
            {errors.regionId && <p className="text-red-500 text-xs mt-1">{errors.regionId.message}</p>}
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
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select draw date and time"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.drawDate ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                    wrapperClassName="w-full"
                  />
                )}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <CalendarIcon />
              </div>
            </div>
            {errors.drawDate && <p className="text-red-500 text-xs mt-1">{errors.drawDate.message}</p>}
            <p className="mt-2 text-[11px] text-gray-400">The date when the winner will be selected</p>
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
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select opening time"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.ticketOpen ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                      wrapperClassName="w-full"
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
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select closing time"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.ticketClose ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm w-full`}
                      wrapperClassName="w-full"
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
                {...register("ticketPrice")}
                placeholder="10"
                className={`w-full px-4 py-3 rounded-xl border ${errors.ticketPrice ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm`}
              />
              {errors.ticketPrice && <p className="text-red-500 text-xs mt-1">{errors.ticketPrice.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">Prize Value ($)</label>
              <input
                type="number"
                {...register("prizeValue")}
                placeholder="1000"
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
              {...register("maxTickets")}
              placeholder="500"
              className={`w-full px-4 py-3 rounded-xl border ${errors.maxTickets ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#111827]/5 focus:border-[#111827] transition-all text-sm`}
            />
            {errors.maxTickets && <p className="text-red-500 text-xs mt-1">{errors.maxTickets.message}</p>}
            <p className="mt-2 text-[11px] text-gray-400">Set a maximum number of tickets that can be sold for this event</p>
          </div>

          {/* Auto Draw Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isAutoDraw"
              {...register("isAutoDraw")}
              className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827]"
            />
            <label htmlFor="isAutoDraw" className="text-sm font-bold text-[#111827] cursor-pointer">
              Enable Automatic Draw
            </label>
            <p className="text-[11px] text-gray-400 ml-auto">System will automatically pick a winner on draw date</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Event Description</label>
            <textarea
              {...register("description")}
              placeholder="Add any special details about this event..."
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
              {isPending ? "Creating..." : "Create Event"}
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

// Custom styles for DatePicker
const datePickerStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
  }
  .react-datepicker {
    font-family: inherit;
    border-radius: 12px;
    border: 1px solid #E5E7EB;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  .react-datepicker__header {
    background-color: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding-top: 12px;
  }
  .react-datepicker__day--selected {
    background-color: #111827 !important;
    border-radius: 8px;
  }
  .react-datepicker__day:hover {
    border-radius: 8px;
  }
  .react-datepicker__time-container {
    border-left: 1px solid #E5E7EB;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: #111827 !important;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = datePickerStyles;
  document.head.appendChild(style);
}
