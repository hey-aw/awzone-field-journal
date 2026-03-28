"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSelector } from "@/components/themes/selector";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Notes", href: "/notes" },
  { label: "Experiments", href: "/experiments" },
  { label: "Projects", href: "/projects" },
  { label: "Flow", href: "/flow" },
  { label: "Captures", href: "/captures" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between py-6 md:py-8">
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity"
      >
        AWzone
      </Link>
      <div className="flex items-center gap-1">
        <div className="hidden sm:flex items-center mr-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                pathname === link.href || pathname?.startsWith(link.href + "/")
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <ThemeSelector />
      </div>
    </nav>
  );
}
