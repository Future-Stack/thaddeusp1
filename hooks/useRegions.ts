import { useQuery } from '@tanstack/react-query';
import { regionService } from '@/services/region.service';

export const useRegions = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: regionService.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
