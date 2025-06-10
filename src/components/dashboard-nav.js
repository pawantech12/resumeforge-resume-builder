"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  Settings,
  LayoutTemplateIcon as Templates,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardNav({ className = "" }) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      href: "/dashboard/templates",
      icon: Templates,
    },
    {
      title: "My Resumes",
      href: "/dashboard/resumes",
      icon: FileText,
    },
  ];

  return (
    <nav
      className={cn("w-64 flex flex-col border-r bg-muted/40 p-6", className)}
    >
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "flex w-full justify-start",
                pathname === item.href && "bg-muted font-medium"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
