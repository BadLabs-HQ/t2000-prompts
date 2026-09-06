"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; ignore silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-[12px] text-ink transition hover:border-ink"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2.5 6.5l2.5 2.5 4.5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <rect
              x="3.5"
              y="3.5"
              width="6"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M2 8V2.5A.5.5 0 0 1 2.5 2H8"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
