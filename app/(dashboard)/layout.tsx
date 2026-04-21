import React from "react";
import DashboardNavbar from "./_components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF8F1]">
      <DashboardNavbar />
      <main className="container mx-auto py-8 px-4 md:px-0">
        {children}
      </main>
    </div>
  );
}
