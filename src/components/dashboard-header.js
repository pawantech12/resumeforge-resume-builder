"use client";

import Link from "next/link";
import { Bell, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { DashboardNav } from "./dashboard-nav";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function DashboardHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader>
                    <SheetTitle className="py-3 px-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-6 w-6 text-emerald-500" />
                        <span className="text-xl font-bold">ResumeForge</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <DashboardNav className="flex h-full" />
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold">ResumeForge</span>
            </Link>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
