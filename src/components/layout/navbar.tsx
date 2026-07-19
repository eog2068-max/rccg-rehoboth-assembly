"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Departments", href: "/departments" },
  { label: "Members Gallery", href: "/members" },
  { label: "Sermons", href: "/sermons" },
  { label: "Media", href: "/media" },
  { label: "Events", href: "/events" },
  { label: "Prayer", href: "/prayer" },
  { label: "Join a Ministry", href: "/join-ministry" },
  { label: "Devotionals", href: "/devotionals" },
  { label: "Announcements", href: "/announcements" },
  { label: "Giving", href: "/giving" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#1A237E]/10"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/rccg-logo.png"
              alt="Redeemed Christian Church of God"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-[#1A237E] leading-tight">
                Redeemed Christian Church
                <span className="hidden xl:inline"> of God</span>
              </p>
              <p className="text-xs text-gray-500 leading-tight">(Rehoboth Assembly Parish)</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-[#1A237E] bg-[#1A237E]/5"
                    : "text-gray-600 hover:text-[#1A237E] hover:bg-[#1A237E]/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Watch Live + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden sm:inline-flex bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-xl px-5 font-semibold"
            >
              <Link href="/media?tab=livestream">
                <Radio className="size-4" />
                Watch Live
              </Link>
            </Button>

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden text-[#1A237E]"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader className="mb-4 mt-2">
                  <SheetTitle className="text-[#1A237E] flex items-center gap-2">
                    <Image
                      src="/rccg-logo.png"
                      alt="RCCG"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                    Rehoboth Assembly Parish
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                        pathname === item.href
                          ? "text-[#1A237E] bg-[#F0F4FF] font-semibold"
                          : "text-gray-600 hover:text-[#1A237E] hover:bg-gray-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      asChild
                      className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-xl font-semibold"
                    >
                      <Link href="/media?tab=livestream" onClick={() => setMobileOpen(false)}>
                        <Radio className="size-4" />
                        Watch Live
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}