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
      <Link
        href="/"
        className="mr-3 hidden shrink-0 items-baseline gap-2 sm:flex"
        aria-label="Home"
      >
        <span className="text-[14px] font-medium text-ink">t2000 prompts</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          BadLabs
        </span>
      </Link>

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

      <div className="ml-auto flex shrink-0 items-center gap-4">
        <a
          href="https://t2000.ai"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] text-muted transition hover:text-ink"
        >
          t2000.ai ↗
        </a>
        <a
          href="https://github.com/BadLabs-HQ/t2000-prompts"
          target="_blank"
          rel="noreferrer"
          className="hidden font-mono text-[11px] text-muted transition hover:text-ink sm:block"
        >
          Source ↗
        </a>
      </div>
    </div>
  );
}
