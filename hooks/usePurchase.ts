import { useMutation } from '@tanstack/react-query';
import { purchaseService, BuyTicketDto, BuyTicketResponse } from '@/services/purchase.service';
import { toast } from 'sonner';

export const useBuyTickets = (options?: {
  onSuccess?: (response: BuyTicketResponse) => void;
}) => {
  return useMutation({
    mutationFn: (data: BuyTicketDto) => purchaseService.buyTickets(data),
    onSuccess: (response) => {
      const redirectUrl = response.data?.url;
      if (redirectUrl) {
        // Redirect to the payment gateway URL returned by the API
        window.location.href = redirectUrl;
      } else {
        toast.success(response.message || 'Tickets purchased successfully!');
        options?.onSuccess?.(response);
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to purchase tickets. Please try again.';
      toast.error(message);
    },
  });
};
