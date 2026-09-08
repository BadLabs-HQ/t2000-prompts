export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-5 font-mono text-[11px] text-muted sm:px-5">
        <a
          href="https://t2000.ai"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-ink"
        >
          t2000.ai ↗
        </a>
        <a
          href="https://github.com/BadLabs-HQ/t2000-prompts"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-ink"
        >
          Source ↗
        </a>
        <span className="ml-auto uppercase tracking-wider">BadLabs</span>
      </div>
    </footer>
  );
}
