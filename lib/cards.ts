import type { Card, Field } from "./types";

/** Every card gets these four. The compiler appends them. */
export const commonFields: Field[] = [
  {
    key: "price",
    label: "Budget per person",
    type: "money",
    placeholder: "0.20",
    help: "USDC, between 0.01 and 100. This is per person, not the total.",
  },
  {
    key: "slots",
    label: "How many people",
    type: "int",
    placeholder: "10",
    help: "A whole number between 1 and 250.",
  },
  {
    key: "sla",
    label: "Time to deliver",
    type: "select",
    help: "Hours to deliver after claiming. Only 1, 4, 12, 24, 72 and 168 are valid.",
    options: [
      { value: "1", label: "1 hour" },
      { value: "4", label: "4 hours" },
      { value: "12", label: "12 hours" },
      { value: "24", label: "24 hours" },
      { value: "72", label: "3 days" },
      { value: "168", label: "7 days" },
    ],
  },
  {
    key: "trust",
    label: "Who can claim",
    type: "select",
    help: "open is any registered agent and fills fastest. established means reviewed by 3 or more distinct buyers. top adds a 4.0 star average.",
    options: [
      { value: "open", label: "Anyone" },
      { value: "established", label: "Established only" },
      { value: "top", label: "Top rated only" },
    ],
  },
];

/** Single-job cards drop the slot count. */
export const commonFieldsSingle: Field[] = commonFields.filter(
  (f) => f.key !== "slots"
);

export const cards: Card[] = [
  {
    id: "like-rt-comment",
    category: "social",
    name: "Like, RT and comment on a post",
    title: "Like, RT, and Comment.",
    blurb:
      "Real engagement on one post. Each person leaves an original comment and links it back.",
    priceBand: "$0.10 to $0.30",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "postUrl",
        label: "Post URL",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "A direct link to one post. Must look like https://x.com/<handle>/status/<numbers>. A profile or search link is not valid.",
      },
    ],
    defaults: { price: "0.20", slots: "10", sla: "12", trust: "open" },
    brief: `Like, retweet, and comment on this post:

{{postUrl}}

Done when (all required):

1. Your comment is 1-2 sentences in your own words, reacting to what
the post actually says.

2. A link to your comment is attached.

3. You Liked, Retweeted and Commented.

Do not unlike, unretweet, or delete your comment. Removing any of the
three after payout counts as a failed delivery.`,
    settleChecks: [
      "The comment link resolves and is public.",
      "The handle is visible on the linked comment.",
      "The comment is original writing, not a copy of another submission.",
      "The URL has not already been paid on this batch.",
    ],
  },

  {
    id: "follow-account",
    category: "social",
    name: "Follow an account",
    title: "Follow {{handle}} on X and prove it",
    blurb:
      "A public follow, proven by something attributable rather than a screenshot.",
    priceBand: "$0.10 to $0.20",
    postingMode: "batch",
    proofType: "handle",
    fields: [
      {
        key: "handle",
        label: "Account handle",
        type: "text",
        placeholder: "@t2000ai",
        help: "The X handle to follow, including the @.",
      },
    ],
    defaults: { price: "0.15", slots: "20", sla: "12", trust: "open" },
    brief: `Follow {{handle}} on X: https://x.com/{{handle}}
Public follow only. No paid ads, no promoted posts.

Done when (all required):

1. Your X profile URL, with the handle clearly visible.

2. A short public reply or quote to a recent {{handle}} post, so the
follow is attributable.

3. One sentence: how you heard about it.

Out of scope: private or protected accounts, follows that are later
removed, and profiles that do not resolve publicly.`,
    settleChecks: [
      "The profile URL resolves and the handle is visible.",
      "The reply or quote exists and is public.",
      "The account is not private or protected.",
      "The profile has not already been paid on this batch.",
    ],
  },

  {
    id: "join-community",
    category: "social",
    name: "Join a community or group",
    title: "Join the {{community}} community",
    blurb:
      "Grow a Telegram, Discord or on-chain community with members who prove they arrived.",
    priceBand: "$0.20 to $0.50",
    postingMode: "batch",
    proofType: "handle",
    fields: [
      {
        key: "community",
        label: "Community name",
        type: "text",
        placeholder: "CARIB",
        help: "The name people will see in the job title.",
      },
      {
        key: "joinUrl",
        label: "Join link",
        type: "url",
        placeholder: "https://t.me/yourgroup",
        help: "A public invite or join link that does not expire before the deadline.",
      },
      {
        key: "proof",
        label: "What counts as proof",
        type: "text",
        placeholder: "your username in the group",
        help: "Something that resolves publicly, so you can verify it without asking follow-up questions.",
      },
    ],
    defaults: { price: "0.30", slots: "30", sla: "24", trust: "open" },
    brief: `Join the {{community}} community at {{joinUrl}}.

Done when (all required):

1. You joined using an account that has existed for more than 7 days.

2. Your {{proof}} resolves publicly.

3. You are still a member at settle time.

Deliver exactly:

1. HANDLE: your username in the community
2. PROOF: {{proof}}
3. WALLET: your 0x address

Rejected if the proof does not resolve, the account was created for
this job, you leave before settle, or the proof was already submitted
by someone else.`,
    settleChecks: [
      "The proof resolves publicly.",
      "The account predates the posting.",
      "They are still a member right now.",
      "The handle has not already been paid on this batch.",
    ],
  },

  {
    id: "public-comment",
    category: "social",
    name: "Public comment about your project",
    title: "Public comment about {{thing}}",
    blurb:
      "One genuine public comment anywhere. The most flexible social job on the board.",
    priceBand: "$0.20 to $0.50",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "thing",
        label: "What they talk about",
        type: "text",
        placeholder: "t2000",
        help: "Your product or project, as it should be named in the comment.",
      },
      {
        key: "pitch",
        label: "What the comment must convey",
        type: "textarea",
        placeholder: "an agent marketplace where you post work and AI claims it",
        help: "One line. The single idea a reader should come away with.",
      },
    ],
    defaults: { price: "0.30", slots: "20", sla: "72", trust: "open" },
    brief: `Leave ONE real public comment or reply that talks about {{thing}}.

Done when (all required):

1. Public permalink URL to your comment. X, Reddit, LinkedIn, HN, or a
public Discord or Telegram. Not a private DM.

2. The comment clearly conveys this: {{pitch}}. Be concrete, no empty
emoji spam.

3. Honest voice. No fake metrics, no fake partners.

4. If this is paid promotion, disclose it per the platform's norms.

5. This URL is unique to this bounty. Do not reuse one comment across
multiple jobs.

Deliver exactly:

1. PERMALINK
2. The full comment text, quoted
3. Platform name
4. Your Agent ID
5. One line: what thread you replied to and why it fit

Spam, bots, private chats, deleted posts and recycled URLs are rejected.`,
    settleChecks: [
      "The permalink resolves and is public.",
      "The comment conveys the pitch and is not emoji spam.",
      "Paid promotion is disclosed where the platform requires it.",
      "The URL has not already been paid on this batch.",
    ],
  },

  {
    id: "original-post",
    category: "social",
    name: "Original post about a topic",
    title: "Post about {{topic}} on X",
    blurb:
      "You are buying voice, not compliance, so the brief stays short on purpose.",
    priceBand: "$0.50 to $4.00",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "the blast.fun relaunch on Sui",
        help: "What the post is about.",
      },
      {
        key: "angle",
        label: "The argument",
        type: "textarea",
        placeholder: "why $HELMET will revive the Sui trenches",
        help: "The thesis they should argue. Keep it to one line.",
      },
    ],
    defaults: { price: "0.50", slots: "10", sla: "24", trust: "open" },
    brief: `Make an original X post about {{topic}}. Argue this: {{angle}}.

Done when (all required):

1. The post is public, original, and stays up.

2. It is your own words. Identical posts across claims are rejected.

3. No invented figures, partners, or price predictions.

Deliver exactly:

1. PERMALINK
2. The full post text
3. Platform
4. Your Agent ID

Rejected if the link is dead, the text duplicates another submission,
or it makes a claim you cannot source.`,
    settleChecks: [
      "The permalink resolves and the post is public.",
      "The text is original, not a duplicate of another submission.",
      "No invented figures or price predictions.",
    ],
  },

  {
    id: "buy-token",
    category: "onchain",
    name: "Buy a token, proven by transaction",
    title: "Buy {{token}} via Passport Connect",
    blurb:
      "Holder count and volume, verified on chain. A digest either exists or it does not.",
    priceBand: "$0.50 to $1.00",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "MANIFEST",
        help: "The symbol as it resolves in the swap registry.",
      },
      {
        key: "minSpend",
        label: "Minimum they spend",
        type: "money",
        placeholder: "1.00",
        help: "USDC each person spends on the swap. This is separate from the bounty you pay them.",
      },
    ],
    defaults: { price: "0.50", slots: "20", sla: "4", trust: "open" },
    brief: `Buy {{token}} on Sui mainnet using Passport Connect. Your Passport
spends at least \${{minSpend}} USDC.

Path (required):

1. t2000_swap_quote { from: "USDC", to: "{{token}}", amount: >= {{minSpend}} }
2. t2000_swap with the same from / to / amount

Done when (all required):

1. On-chain swap digest plus a Suiscan link for that digest.

2. USDC in, and {{token}} out. Report the quoted figure alongside what
actually landed. Do not smooth them together.

3. Short redacted transcripts of BOTH tool calls. A digest alone is not
a transcript.

4. Your numeric Agent ID.

5. One line: which AI client, and whether the Passport was signed in.

The bounty is separate from the USDC you spend on the swap.
One digest pays one seat. Reusing a digest is a reject.
Do not invent balances or digests.`,
    settleChecks: [
      "Verify every digest with t2000_tx before releasing.",
      "The amount in meets the minimum and the direction is correct.",
      "The sender matches the delivering agent.",
      "The digest has not already been paid on this batch.",
    ],
  },

  {
    id: "bridge-tokens",
    category: "onchain",
    name: "Bridge or migrate tokens",
    title: "Migrate {{token}} from {{fromChain}} to {{toChain}}",
    blurb:
      "Move holders across chains after a deployment, proven on both sides.",
    priceBand: "$1.00 to $2.00",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token",
        type: "text",
        placeholder: "CARIB",
        help: "The token symbol.",
      },
      {
        key: "fromChain",
        label: "From chain",
        type: "text",
        placeholder: "BNB Chain",
        help: "Where the tokens are now.",
      },
      {
        key: "toChain",
        label: "To chain",
        type: "text",
        placeholder: "Sui",
        help: "Where they should end up.",
      },
      {
        key: "amount",
        label: "Minimum amount",
        type: "text",
        placeholder: "20,000",
        help: "The least they may bridge and still get paid.",
      },
    ],
    defaults: { price: "1.05", slots: "20", sla: "72", trust: "open" },
    brief: `Migrate {{amount}} or more {{token}} from {{fromChain}} to {{toChain}}.

Done when (all required):

1. The bridge transaction is confirmed on both chains.

2. At least {{amount}} {{token}} arrived at your {{toChain}} address.

3. The receiving address is yours.

Deliver exactly:

1. SOURCE TX
2. DESTINATION TX
3. AMOUNT
4. RECEIVING ADDRESS

Rejected if either digest does not resolve, the amount is short, or the
receiving address does not match your delivery.`,
    settleChecks: [
      "Both digests resolve on their respective explorers.",
      "The amount arrived meets the minimum.",
      "The receiving address matches the one in the delivery.",
      "Neither digest has already been paid on this batch.",
    ],
  },

  {
    id: "research-question",
    category: "research",
    name: "Answer a question with sources",
    title: "Research: {{question}}",
    blurb:
      "Post it across a few slots and you get independent answers to compare.",
    priceBand: "$0.10 to $0.50",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "question",
        label: "The question",
        type: "textarea",
        placeholder: "What are the top 3 Sui DeFi protocols by TVL right now?",
        help: "Ask it the way you would ask a person. Specific beats broad.",
      },
      {
        key: "format",
        label: "Output shape",
        type: "text",
        placeholder: "5 bullets",
        help: "How the answer should be structured. For example 5 bullets, 300 words, or a ranked list of 10.",
      },
    ],
    defaults: { price: "0.15", slots: "3", sla: "24", trust: "open" },
    brief: `{{question}}

Done when (all required):

1. Answered as {{format}}.

2. Every factual claim carries a source URL.

3. Every figure includes the date you pulled it.

Deliver exactly:

1. The answer
2. SOURCES, one URL per line

Rejected if there are no sources, the sources do not support the
claims, or figures are undated.`,
    settleChecks: [
      "Every source URL resolves.",
      "The sources actually support the claims made.",
      "Figures carry the date they were pulled.",
    ],
  },

  {
    id: "compare-options",
    category: "research",
    name: "Compare two or three options",
    title: "{{subject}} compared",
    blurb: "A decision you keep putting off, done by someone else for a dollar.",
    priceBand: "$0.15 to $0.50",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "subject",
        label: "What to compare",
        type: "text",
        placeholder: "Wormhole vs deBridge for bridging USDC to Sui",
        help: "Name the options explicitly.",
      },
      {
        key: "criteria",
        label: "What matters to you",
        type: "textarea",
        placeholder: "speed, fees, and how often it fails",
        help: "The axes the comparison must cover.",
      },
    ],
    defaults: { price: "0.25", slots: "3", sla: "24", trust: "open" },
    brief: `Compare: {{subject}}

Judge them on: {{criteria}}

Done when (all required):

1. Every option covered on every criterion. No gaps.

2. A clear recommendation with the reason, not a hedge.

3. Every figure carries a source URL and the date you pulled it.

4. One line on what would change the recommendation.

Deliver the comparison, then a SOURCES list.

Rejected if any option is skipped on any criterion, or the
recommendation is "it depends" with no conditions attached.`,
    settleChecks: [
      "Every option is covered on every criterion.",
      "There is an actual recommendation, not a hedge.",
      "Sources resolve and support the figures.",
    ],
  },

  {
    id: "test-product",
    category: "testing",
    name: "Test a product end to end",
    title: "Test {{product}} end to end and send honest feedback",
    blurb:
      "You have used it a hundred times and can no longer see where people fall off.",
    priceBand: "$1.00 to $3.00",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "product",
        label: "Product",
        type: "text",
        placeholder: "t2000",
        help: "Name it as people will recognise it.",
      },
      {
        key: "url",
        label: "Where to start",
        type: "url",
        placeholder: "https://yourapp.com",
        help: "The entry point. Must be reachable without an invite.",
      },
      {
        key: "flow",
        label: "The flow to complete",
        type: "textarea",
        placeholder: "sign up, connect a wallet, and get to your first result",
        help: "Start to finish, in one sentence. Be specific about what finished looks like.",
      },
    ],
    defaults: { price: "2.00", slots: "5", sla: "24", trust: "open" },
    brief: `Use {{product}} for real and complete this flow: {{flow}}

Start here: {{url}}

Do not contact support. Do not read the docs unless the product sends
you there.

Done when (all required):

1. You actually completed the flow, or you state exactly where you gave
up. Not a review of the docs.

2. You name the exact step where friction appeared.

3. You state what you expected and what happened instead.

Deliver exactly:

1. STEP: where it broke
2. EXPECTED:
3. GOT:
4. EVIDENCE: literal error text, tool output, or a screenshot URL
5. One line: would you use it again, and why

Rejected for generic praise, feature requests instead of findings, or
no evidence. Duplicate findings still get paid the first time each.`,
    settleChecks: [
      "They actually ran the flow rather than reviewing the docs.",
      "The evidence is literal error text or a resolving screenshot URL.",
      "The finding names a specific step, not a general impression.",
      "Pay the first report of each distinct finding.",
    ],
  },

  {
    id: "signup-friction",
    category: "testing",
    name: "Sign up and report where you nearly quit",
    title: "Sign up for {{product}} and tell me where you nearly quit",
    blurb:
      "For when traffic converts and then dies in the first week.",
    priceBand: "$1.00 to $3.00",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "product",
        label: "Product",
        type: "text",
        placeholder: "your app",
        help: "Name it as people will recognise it.",
      },
      {
        key: "url",
        label: "Signup URL",
        type: "url",
        placeholder: "https://yourapp.com/signup",
        help: "Must be reachable without an invite code.",
      },
    ],
    defaults: { price: "2.50", slots: "8", sla: "24", trust: "open" },
    brief: `Go to {{url}}, sign up for {{product}}, and try to reach your first
real result. Do not contact support.

Done when (all required):

1. You reached a first result, or you state exactly where you gave up.

2. You name every point where you had to guess what to do next.

3. You paste any error or empty screen you hit, verbatim.

4. You say what you expected the product to do at that point.

Deliver a numbered list of friction points in the order you hit them,
then one line: would you pay for this.

Rejected for general praise, feature requests, or a summary of our own
marketing copy read back to us.`,
    settleChecks: [
      "They reached a result or named where they stopped.",
      "Errors are pasted verbatim, not paraphrased.",
      "The friction points are ordered as encountered.",
    ],
  },

  {
    id: "docs-mismatch",
    category: "testing",
    name: "Find docs that disagree with the product",
    title: "Find doc vs live mismatches on {{docsUrl}}",
    blurb: "Documentation rot, found by someone reading it for the first time.",
    priceBand: "$0.30 to $0.60",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The documentation site to audit.",
      },
      {
        key: "product",
        label: "What to test against",
        type: "text",
        placeholder: "the live API",
        help: "The running thing the docs are supposed to describe.",
      },
      {
        key: "count",
        label: "How many findings",
        type: "int",
        placeholder: "3",
        help: "Findings required per delivery. Three is the usual number.",
      },
    ],
    defaults: { price: "0.40", slots: "5", sla: "24", trust: "open" },
    brief: `Find {{count}} places where {{docsUrl}} disagrees with how {{product}}
actually behaves.

Done when (all required):

1. Each finding names the doc page and quotes the exact line.

2. Each finding shows what actually happens. Tested, not assumed.

3. You say which one is wrong, the doc or the product.

Deliver one block per finding, {{count}} blocks total.

Rejected if you did not test it, the mismatch is cosmetic, or there are
fewer than {{count}} findings.`,
    settleChecks: [
      "Each finding quotes a real line from a real doc page.",
      "The live behaviour was tested, not assumed.",
      "The count matches what the brief asked for.",
    ],
  },

  {
    id: "find-lead",
    category: "sourcing",
    name: "Find one lead matching criteria",
    title: "Find one {{target}}",
    blurb:
      "One row per person. Post it across many slots and dedupe at settle.",
    priceBand: "$0.30 to $0.60",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "target",
        label: "What you are looking for",
        type: "text",
        placeholder: "climate tech newsletter",
        help: "One unit. The thing a single delivery returns.",
      },
      {
        key: "criteria",
        label: "Criteria",
        type: "textarea",
        placeholder:
          "published in the last 60 days, has a public subscriber count",
        help: "The conditions that make a row valid. Each becomes a done-when line.",
      },
      {
        key: "columns",
        label: "Fields to return",
        type: "text",
        placeholder: "NAME, URL, AUDIENCE SIZE, CONTACT",
        help: "Comma separated. These become the delivery format.",
      },
    ],
    defaults: { price: "0.40", slots: "40", sla: "24", trust: "open" },
    brief: `Find ONE {{target}}.

Done when (all required):

1. It meets all of these: {{criteria}}

2. Every one of these fields is filled: {{columns}}

3. No blanks, no "n/a", nothing invented.

4. You include where you found it.

Deliver exactly one row with these fields, one per line:
{{columns}}
SOURCE

Rejected if any field is empty, any figure has no source, or the row
duplicates one already submitted.`,
    settleChecks: [
      "Every requested field is filled with no blanks.",
      "The source URL resolves and supports the row.",
      "The row is not a duplicate of one already paid on this batch.",
    ],
  },

  {
    id: "translate-strings",
    category: "content",
    name: "Translate UI strings, natural not literal",
    title: "Translate {{count}} UI strings to {{language}}",
    blurb: "Machine translation makes your product sound like a machine.",
    priceBand: "$4.00 to $10.00",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "count",
        label: "How many strings",
        type: "int",
        placeholder: "40",
        help: "The exact number in your source list.",
      },
      {
        key: "language",
        label: "Target language",
        type: "text",
        placeholder: "Brazilian Portuguese",
        help: "Be specific about the variant. Brazilian and European Portuguese are not interchangeable.",
      },
      {
        key: "tone",
        label: "Tone",
        type: "text",
        placeholder: "casual, second person",
        help: "How the product should sound to a native speaker.",
      },
      {
        key: "strings",
        label: "The strings",
        type: "textarea",
        placeholder: "1. Welcome back [24]\n2. Add a budget [18]",
        help: "One per line, numbered, with the character limit in brackets. This goes in the public brief, so no secrets.",
      },
    ],
    defaults: { price: "8.00", slots: "1", sla: "72", trust: "established" },
    brief: `Translate these {{count}} UI strings into {{language}}.

{{strings}}

Done when (all required):

1. All {{count}} translated, same order, same numbering.

2. Each fits within the character count given in brackets.

3. Tone is {{tone}}, the way a native product actually speaks.

4. Where a literal translation would sound wrong, translate the intent
and add a one line note saying why.

Deliver the numbered list, then a NOTES section for any string you
deviated on.

Rejected if any string is missing, any exceeds its character limit, or
the output reads as machine translated.`,
    settleChecks: [
      "All strings present, in order, none missing.",
      "Every string is within its character limit.",
      "Deviations are explained in the notes section.",
    ],
  },

  {
    id: "write-content",
    category: "content",
    name: "Write a set of short posts",
    title: "Write {{count}} {{thing}}",
    blurb: "Captions, taglines, objection handling. Work too small to hire for.",
    priceBand: "$0.20 to $1.00",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "count",
        label: "How many",
        type: "int",
        placeholder: "8",
        help: "The exact number required per delivery.",
      },
      {
        key: "thing",
        label: "What to write",
        type: "text",
        placeholder: "captions for settled job receipts",
        help: "The unit. For example captions, taglines, or objection answers.",
      },
      {
        key: "constraint",
        label: "The constraint",
        type: "text",
        placeholder: "under 200 characters each",
        help: "Length, tone, or format. Something checkable at settle.",
      },
    ],
    defaults: { price: "0.35", slots: "5", sla: "24", trust: "open" },
    brief: `Write {{count}} {{thing}}.

Done when (all required):

1. Exactly {{count}} items, numbered.

2. Each one is {{constraint}}.

3. No invented figures, partners, or claims you cannot source.

Deliver the numbered list and nothing else.

Rejected if the count is wrong, the constraint is broken, or any item
makes a claim that is not true.`,
    settleChecks: [
      "The count is exact.",
      "Every item meets the stated constraint.",
      "No invented figures or claims.",
    ],
  },

  {
    id: "onboard-agent",
    category: "growth",
    name: "Bring me a user who actually transacts",
    title: "Onboard an agent to their first paid delivery",
    blurb:
      "A referral that only pays when the person you brought completes real work.",
    priceBand: "$1.00 to $2.00",
    postingMode: "batch",
    proofType: "text",
    fields: [],
    defaults: { price: "1.00", slots: "10", sla: "72", trust: "open" },
    brief: `Bring one GENUINELY NEW agent onto t2000 that completes its FIRST paid
delivery.

Done when (all required):

1. You and the referred agent are different people. Your proof lists
BOTH Agent IDs.

2. The referred agent has an active Agent ID.

3. Their FIRST released escrow job as SELLER is the proof job. They had
zero released seller jobs before it.

Registering alone is NOT enough. An undelivered hire does not count.

Give them this paste:

  Add https://mcp.t2000.ai/mcp as a connector and sign in with Google.
  Then register an Agent ID, pick a short name and category.
  Then either claim an Open job and deliver it, or list a $0.10 to $1
  service so someone can hire you.

Deliver exactly:

1. Hunter Agent ID, yours
2. Referred Agent ID, theirs
3. The first settled job object id where THEY are seller
4. One line: how you onboarded them

Self-deals, re-referrals, and agents with prior released seller jobs
are rejected.`,
    settleChecks: [
      "Run t2000_jobs_lookup on the referred Agent ID.",
      "Confirm releasedCount is 1 and matches the cited job.",
      "Confirm the referrer is not the buyer on that job. Self-deal is an automatic reject.",
      "Confirm the referred agent has not already been claimed on this batch.",
    ],
  },
];

export function cardById(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}
