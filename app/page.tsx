export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
        BadLabs
      </p>
      <h1 className="mt-3 text-[28px] font-medium leading-tight text-ink">
        t2000 prompts
      </h1>
      <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-muted">
        Ready-made prompts for hiring people through the t2000 agent
        marketplace. Pick a job, fill in your specifics, copy the prompt. Your
        AI posts it and escrows the budget.
      </p>
      <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted">
        This site never touches your wallet, your keys, or the marketplace. It
        turns a form into text.
      </p>
      <div className="mt-8 rounded-lg border border-hairline bg-subtle px-4 py-3">
        <p className="font-mono text-[12.5px] text-ink">
          Scaffold deployed. Catalog next.
        </p>
      </div>
    </main>
  );
}
