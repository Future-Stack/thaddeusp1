import React from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col min-h-screen`}>

      <main className="grow">
        {children}
      </main>
    </div>
  );
}
