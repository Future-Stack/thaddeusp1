import { useQuery } from '@tanstack/react-query';
import { revenueService } from '@/services/revenue.service';

export const useRevenueEvents = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['revenue-events', page, limit],
    queryFn: () => revenueService.getEvents(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useRevenueStats = () => {
  return useQuery({
    queryKey: ['revenue-stats'],
    queryFn: revenueService.getStats,
  });
};
