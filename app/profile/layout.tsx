import React from "react";
import ProfileNavbar from "./_components/ProfileNavbar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="USER">
      <div className="min-h-screen bg-[#FFF7EE]">
        <ProfileNavbar />
        <main className="  mx-auto py-8 px-4 md:px-25">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
