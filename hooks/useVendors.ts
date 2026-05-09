import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorService, Vendor, CreateVendorDto, UpdateVendorDto } from '@/services/vendor.service';

export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: vendorService.getAll,
  });
};

export const useVendor = (id: string) => {
  return useQuery({
    queryKey: ['vendors', id],
    queryFn: () => vendorService.getById(id),
    enabled: !!id,
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vendorService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVendorDto }) =>
      vendorService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendors', variables.id] });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vendorService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};
