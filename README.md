# t2000 prompts

Ready-made prompts for hiring people through the [t2000](https://t2000.ai)
agent marketplace.

Pick a job, fill in your specifics, copy the prompt, paste it into your AI.
Your AI posts the job and escrows the budget.

**[t2000-prompts.vercel.app](https://t2000-prompts.vercel.app)**

## What it is

A prompt compiler, not a prompt library.

The difference matters. A markdown file of templates with angle brackets in
it invites an AI to post a job whose brief literally reads `<POST URL>` and
escrow real USDC against it. So this site emits resolved text instead.

It holds no funds, no keys, and never calls the marketplace. It turns a form
into text.

## The three render states

The compiler takes a card plus whatever the buyer has filled in, and emits
one of three things.

| State | What the prompt does |
|---|---|
| Nothing filled | Reads as a guided interview. An ask block lists every field with its validation rule. |
| Partly filled | The ask block shrinks to only what is missing. Known values are already baked into the brief. |
| Fully filled | The ask block disappears. It becomes a direct command with every value literal. |

The rule that makes this safe: **a value is either literally present, or it
is named in the ask block.** A placeholder never reaches the clipboard
without an instruction attached telling the AI to ask for it.

One consequence worth knowing: the settle prompt has no ask block, so it
never reads user values at all. Anything it templated would be unguarded.

## Adding a job

Add an entry to `lib/cards.ts`. Never code.

```ts
{
  id: "like-rt-comment",
  category: "social",
  name: "Like, RT and comment on a post",   // catalog row
  title: "Like, RT, and Comment.",          // job title on the board
  blurb: "…",
  postingMode: "batch",                     // batch | single
  proofType: "url",                         // drives the settle prompt
  fields: [ /* card-specific only */ ],
  brief: `… {{postUrl}} …`,                 // posted verbatim
  settleChecks: [ "…" ],                    // how to grade it
}
```

The four fields every job needs — budget, headcount, deadline, trust gate —
are appended by the compiler. Do not repeat them per card.

`proofType` is what lets the settle prompt be generated rather than written
by hand. A `digest` job tells the AI to verify with `t2000_tx`; a `url` job
tells it to check the link resolves and is not already paid on that batch.

## Writing a brief

Every brief in here is modelled on a posting that actually settled on the
board, not an invented shape. Four things they have in common:

1. **Rigor scales with dispute cost.** A one-worker job where you are buying
   voice needs three lines. A cheap job that thirty strangers will farm needs
   explicit reject conditions.
2. **The proof either resolves or it does not.** A URL, a transaction digest,
   a timestamp, an object id. Never "describe what you did".
3. **State the reject conditions**, so a rejection is never a surprise.
4. **Never restate what the contract enforces.** `maxClaimsPerAgent: 1`
   limits one agent to one slot. Saying it in the title does nothing.

## Stack

Next 15 App Router, React 19, Tailwind 3.4, TypeScript. No UI dependencies,
no database, no auth, no API routes. Palette and component language are
shared with `web3ns-ui` so the two BadLabs surfaces read as one system.

```bash
npm install
npm run dev
npm run typecheck
```

Pushes to `main` deploy to Vercel automatically.

## Reference

`reference/` holds the hand-written prompts the compiler has to reproduce.
They are the spec. If the compiled output drifts from them, the compiler is
wrong.

## Licence

MIT.
