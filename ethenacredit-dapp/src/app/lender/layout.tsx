"use client";

import SideBarLender from "@/components/SideBarLender";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
        <SideBarLender/>
          <div className="ml-10 w-full">
              {children}
          </div>
          </section>
          );
};