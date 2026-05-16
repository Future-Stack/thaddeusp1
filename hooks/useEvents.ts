import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { eventService, CreateEventDto } from '@/services/event.service';
import { toast } from 'sonner';

export const useEvents = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => eventService.getAll(params),
  });
};

export const useRunningEvent = () => {
  return useQuery({
    queryKey: ['running-event'],
    queryFn: eventService.getRunningEvent,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDto) => eventService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create event';
      toast.error(message);
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateEventDto> }) =>
      eventService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update event';
      toast.error(message);
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete event';
      toast.error(message);
    },
  });
};

export const useEventAdminStats = (id: string) => {
  return useQuery({
    queryKey: ['event-stats', id],
    queryFn: () => eventService.getAdminStats(id),
    enabled: !!id,
  });
};

export const useEventAdminUsers = (id: string, params: { page: number; limit: number; searchTerm: string }) => {
  return useQuery({
    queryKey: ['event-users', id, params],
    queryFn: () => eventService.getAdminUsers(id, params),
    enabled: !!id,
  });
};
