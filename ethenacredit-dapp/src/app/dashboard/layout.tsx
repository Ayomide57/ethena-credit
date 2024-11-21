"use client";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-12 flex">
      <SideBar />
      <div className="w-full" style={{width: "-webkit-fill-available"}}>{children}</div>
    </section>
  );
}
