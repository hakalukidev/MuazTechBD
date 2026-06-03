"use client";

import Link from "next/link";
import { LayoutDashboard, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    href: "/admin/products",
    label: "All Products",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products/new",
    label: "Add Product",
    icon: PackagePlus,
  },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin/products" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
              isActive
                ? "bg-cyan-400/10 text-white ring-1 ring-cyan-400/30"
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
