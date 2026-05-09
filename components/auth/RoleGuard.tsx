'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole?: string;
}

export default function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const { accessToken, role, isLoading } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If store is still hydrating/loading from localstorage, wait
    if (isLoading) return;

    if (!accessToken) {
      // Not logged in
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRole && role !== allowedRole) {
      // Logged in but not the right role
      router.push('/'); // Or a 403 page
      return;
    }

    setIsAuthorized(true);
  }, [accessToken, role, allowedRole, router, pathname, isLoading]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
