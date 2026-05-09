import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { eventService, CreateEventDto } from '@/services/event.service';
import { toast } from 'sonner';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAll,
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
