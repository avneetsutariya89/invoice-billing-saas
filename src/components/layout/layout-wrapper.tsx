"use client";

import { ReactNode } from "react";
import { Sidebar, MobileSidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

interface LayoutWrapperProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function LayoutWrapper({ children, showSidebar = true }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MobileSidebar />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        {showSidebar && (
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <Sidebar />
          </aside>
        )}
        <main className="relative w-full h-full py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
