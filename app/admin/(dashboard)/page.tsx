"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/dashboard');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-[50vh]">
            <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
        </div>
    );
}

export default AdminPage;