import React from "react";
import ProfileNavbar from "./_components/ProfileNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF7EE]">
      <ProfileNavbar />
      <main className="  mx-auto py-8 px-4 md:px-25">
        {children}
      </main>
    </div>
  );
}
