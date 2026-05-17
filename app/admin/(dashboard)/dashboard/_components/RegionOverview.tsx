"use client";

import React from "react";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import Image from "next/image";
import { useEvents } from "@/hooks/useEvents";
import { useGetWinners } from "@/hooks/useDraws";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trophy,
  Calendar,
  ArrowRight,
  MapPin,
  AlertCircle,
} from "lucide-react";

const OverviewCard = ({
  title,
  icon: Icon,
  children,
  href,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  href: string;
}) => (
  <AnimationWrapper animationType="fadeUp" className="h-full">
    <div className="bg-white rounded-[20px] p-8 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF5C00]">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
        </div>
        <Link
          href={href}
          className="text-gray-400 hover:text-[#FF5C00] transition-colors p-2 hover:bg-orange-50 rounded-xl"
        >
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  </AnimationWrapper>
);

const ListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 p-4 border border-gray-50 rounded-2xl"
      >
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
      <AlertCircle size={24} />
    </div>
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
    <p className="text-gray-500 font-medium italic">{message}</p>
  </div>
);

const RegionOverview = () => {
  const {
    data: eventsResponse,
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = useEvents();
  const {
    data: winnersResponse,
    isLoading: isWinnersLoading,
    isError: isWinnersError,
  } = useGetWinners(1, 10);

  const events = eventsResponse?.data?.data || [];
  const winners = winnersResponse?.data?.data || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      {/* Events Card */}
      <OverviewCard
        title="Recent Events"
        icon={Calendar}
        href="/admin/lottery-event"
      >
        {isEventsLoading ? (
          <ListSkeleton />
        ) : isEventsError ? (
          <ErrorState message="Failed to load events" />
        ) : events.length === 0 ? (
          <EmptyState message="No events scheduled yet" />
        ) : (
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            {events.slice(0, 10).map((event: any) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${event.status === "RUNNING" ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                  />
                  <div>
                    <div className="font-bold text-[#111827] text-sm">
                      {event.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Draw Date:{" "}
                      {event.drawDate
                        ? format(new Date(event.drawDate), "MMM d, yyyy")
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-900">
                    ${event.ticketPrice}
                  </div>
                  <div className="text-[10px] text-gray-400">per ticket</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </OverviewCard>

      {/* Winners Card */}
      <OverviewCard title="Recent Winners" icon={Trophy} href="#">
        {isWinnersLoading ? (
          <ListSkeleton />
        ) : isWinnersError ? (
          <ErrorState message="Failed to load winners" />
        ) : winners.length === 0 ? (
          <EmptyState message="No winners announced yet" />
        ) : (
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            {winners.slice(0, 10).map((winner: any) => (
              <div
                key={winner.id}
                className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm bg-gray-100">
                    <Image
                      src={winner.profileImg || "/profile.webp"}
                      alt={winner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#111827] text-sm">
                      {winner.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin size={10} /> {winner.address || "Location N/A"}
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 text-[#FF5C00] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  WINNER
                </div>
              </div>
            ))}
          </div>
        )}
      </OverviewCard>
    </div>
  );
};

export default RegionOverview;
