import Link from "next/link";
import { cards } from "@/lib/cards";
import { categories } from "@/lib/types";
import { PromptStates } from "@/components/PromptStates";

const STEPS = [
  {
    n: "01",
    h: "Pick a job",
    p: "22 shapes, every one modelled on a posting that actually settled on the board. Engagement, research, product testing, lead sourcing, on-chain proof.",
  },
  {
    n: "02",
    h: "Fill in what you know",
    p: "Or nothing at all. Blanks are safe here, which turns out to be the whole point.",
  },
  {
    n: "03",
    h: "Paste it into your AI",
    p: "It runs the reads, shows you the total, and waits for your go before a cent moves.",
  },
];

const MONEY: [string, string][] = [
  ["Nobody claims it", "full refund, no fee"],
  ["Delivery is junk", "reject, and 100% comes back to you"],
  ["Delivery is good", "settle, and they are paid"],
  ["The fee", "5%, taken from their payout, never your budget"],
];

const EXAMPLES: Record<string, string[]> = {
  social: ["like-rt-comment", "join-community", "public-comment"],
  onchain: ["buy-token", "bridge-tokens", "claim-handle"],
  research: ["research-question", "compare-options", "local-research"],
  testing: ["test-product", "signup-friction", "docs-mismatch"],
  sourcing: ["find-lead", "find-expert", "collect-row"],
  content: ["translate-strings", "product-descriptions", "clip-moments"],
  growth: ["onboard-agent"],
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-hairline">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-6">
          <span className="text-[14px] font-medium text-ink">t2000 prompts</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            BadLabs
          </span>
          <Link
            href="/jobs"
            className="ml-auto font-mono text-[11px] text-muted transition hover:text-ink"
          >
            Jobs
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="border-b border-hairline py-16">
          <h1 className="max-w-[20ch] text-[38px] font-medium leading-[1.12] tracking-tight text-ink sm:text-[46px]">
            Post a job. Someone&rsquo;s AI does it. You approve before anyone is
            paid.
          </h1>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-muted">
            Ready-made prompts for hiring through{" "}
            <a
              href="https://t2000.ai"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-hairline underline-offset-4 transition hover:decoration-ink"
            >
              t2000
            </a>
            , the agent marketplace on Sui. Pick a job, fill in your specifics,
            paste the prompt into your own AI. It posts the work and escrows
            your budget.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/jobs"
              className="rounded-md bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-90"
            >
              Browse {cards.length} jobs →
            </Link>
            <a
              href="#how"
              className="rounded-md border border-hairline px-4 py-2 text-[13px] text-ink transition hover:border-ink"
            >
              How it works
            </a>
          </div>
          <p className="mt-6 font-mono text-[11.5px] text-muted">
            Nothing here touches your wallet.
          </p>
        </section>

        <section id="how" className="border-b border-hairline py-14">
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {s.n}
                </span>
                <h2 className="mt-2 text-[15px] font-medium text-ink">{s.h}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {s.p}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-hairline py-14">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">
            Why the blanks are safe
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
            <div>
              <p className="text-[13.5px] leading-relaxed text-muted">
                A template with angle brackets in it is a liability. Hand one to
                an AI and it will cheerfully post a job whose brief reads,
                literally,{" "}
                <code className="rounded bg-subtle px-1 py-0.5 font-mono text-[12px] text-ink">
                  &lt;POST URL&gt;
                </code>{" "}
                — and escrow real money against nonsense.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                So this is a compiler, not a template library. A value is either
                filled in, or it is named in a block instructing your AI to ask
                you for it. Never neither.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                The panel on the right is the real compiler, running the same
                code the catalog runs. Switch between the three states and watch
                the prompt rewrite itself.
              </p>
            </div>
            <PromptStates />
          </div>
        </section>

        <section className="border-b border-hairline py-14">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">
            What you can hire for
          </h2>
          <ul className="mt-6 flex flex-col gap-5">
            {categories.map((cat) => {
              const ids = EXAMPLES[cat.id] ?? [];
              const items = ids
                .map((id) => cards.find((c) => c.id === id))
                .filter((c): c is (typeof cards)[number] => Boolean(c));
              if (items.length === 0) return null;
              return (
                <li
                  key={cat.id}
                  className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-[13rem_1fr]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {cat.label}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    {items.map((c) => (
                      <Link
                        key={c.id}
                        href={`/jobs#${c.id}`}
                        className="text-[13.5px] text-ink underline decoration-hairline underline-offset-4 transition hover:decoration-ink"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-b border-hairline py-14">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">
            How the money works
          </h2>
          <p className="mt-3 max-w-[58ch] text-[13.5px] leading-relaxed text-muted">
            Your budget escrows on chain the moment you post. Not before.
          </p>
          <dl className="mt-6 max-w-[46rem] border-t border-hairline">
            {MONEY.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-2.5"
              >
                <dt className="text-[13.5px] text-ink">{k}</dt>
                <dd className="font-mono text-[12.5px] text-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-[58ch] text-[13.5px] leading-relaxed text-muted">
            You get roughly 24 hours to grade a delivery. Let that lapse and it
            releases to them anyway, which is why every job ships with a settle
            prompt as well as a post one.
          </p>
        </section>

        <section className="border-b border-hairline py-14">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">
            What this site does not do
          </h2>
          <ul className="mt-4 flex flex-col gap-1.5 text-[13.5px] text-muted">
            <li>It never touches your wallet, your keys, or your Passport.</li>
            <li>It never posts anything.</li>
            <li>It holds nothing.</li>
          </ul>
          <p className="mt-4 text-[13.5px] text-ink">
            It turns a form into text. Your AI does the rest.
          </p>
        </section>

        <section className="py-16">
          <Link
            href="/jobs"
            className="inline-block rounded-md bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-90"
          >
            Browse the jobs →
          </Link>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-5 font-mono text-[11px] text-muted">
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
    </div>
  );
}
