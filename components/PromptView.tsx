"use client";

import { CopyButton } from "./CopyButton";

export function PromptView({
  text,
  missingCount,
}: {
  text: string;
  missingCount: number;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between gap-3 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Prompt
          </span>
          <span className="text-[12px] text-muted">
            {missingCount === 0
              ? "complete — paste and it runs"
              : `${missingCount} blank${missingCount === 1 ? "" : "s"} — safe to copy, your AI will ask`}
          </span>
        </div>
        <CopyButton text={text} label="prompt" />
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-hairline bg-subtle">
        <pre className="whitespace-pre px-4 py-3 font-mono text-[12px] leading-[1.55] text-ink">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
}
