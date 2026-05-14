import { useQuery } from '@tanstack/react-query';
import { voucherService } from '@/services/voucher.service';

export const useMyVouchers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['my-vouchers', page, limit],
    queryFn: () => voucherService.getMyVouchers(page, limit),
  });
};
