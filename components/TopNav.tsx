"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "t2000" },
  { href: "/prompts", label: "Prompts" },
];

export function TopNav({
  railExpanded,
  onToggleRail,
}: {
  railExpanded?: boolean;
  onToggleRail?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-14 items-center gap-1 px-4 sm:px-5">
      {onToggleRail ? (
        <button
          type="button"
          onClick={onToggleRail}
          aria-label={railExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={railExpanded}
          title={railExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="mr-1 hidden h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-subtle hover:text-ink md:flex"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-[17px] w-[17px]"
          >
            {railExpanded ? (
              <path d="M14 7l-5 5 5 5" />
            ) : (
              <path d="M10 7l5 5-5 5" />
            )}
          </svg>
        </button>
      ) : null}

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
