"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutGrid } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-glow">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Snap Search</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-700 hover:bg-surface-100"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
