"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "毛糸",
      href: "/yarns",
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} className="w-6 h-6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c-2 3-3 6-3 9s1 6 3 9" strokeWidth="1.5" fill="none" stroke="currentColor" />
          <path d="M12 3c2 3 3 6 3 9s-1 6-3 9" strokeWidth="1.5" fill="none" stroke="currentColor" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" stroke="currentColor" />
        </svg>
      ),
    },
    {
      label: "作品",
      href: "/works",
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center py-2 text-xs ${
                isActive ? "text-pink-500" : "text-gray-500"
              }`}
            >
              {tab.icon(isActive)}
              <span className="mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
