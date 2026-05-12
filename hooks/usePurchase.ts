import { useMutation } from '@tanstack/react-query';
import { purchaseService, BuyTicketDto } from '@/services/purchase.service';
import { toast } from 'sonner';

export const useBuyTickets = () => {
  return useMutation({
    mutationFn: (data: BuyTicketDto) => purchaseService.buyTickets(data),
    onSuccess: (response) => {
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.success(response.message || 'Tickets purchased successfully!');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to purchase tickets. Please try again.';
      toast.error(message);
    },
  });
};
