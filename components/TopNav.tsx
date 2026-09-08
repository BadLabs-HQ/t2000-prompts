"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "t2000" },
  { href: "/prompts", label: "Prompts" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-14 items-center gap-1 px-4 sm:px-5">
      <nav aria-label="Sections" className="flex items-center gap-1">
        {TABS.map((t) => {
          const active =
            t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-2.5 py-1.5 text-[13px] transition ${
                active
                  ? "bg-subtle text-ink"
                  : "text-muted hover:bg-subtle hover:text-ink"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>

      <a
        href="https://t2000.ai"
        target="_blank"
        rel="noreferrer"
        className="ml-auto shrink-0 font-mono text-[11px] text-muted transition hover:text-ink"
      >
        t2000.ai ↗
      </a>
    </div>
  );
}
