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
    id: "claim-handle",
    category: "onchain",
    name: "Claim a subdomain or on-chain handle",
    title: "Claim a {{suffix}} name and prove it resolves",
    blurb:
      "Names registered under your namespace, each one verifiable by resolution.",
    postingMode: "batch",
    proofType: "handle",
    fields: [
      {
        key: "suffix",
        label: "Name suffix",
        type: "text",
        placeholder: ".carib",
        help: "The suffix people register under, including the dot.",
      },
      {
        key: "registerUrl",
        label: "Where to register",
        type: "url",
        placeholder: "https://suins.io/communities/carib",
        help: "A public page where anyone can complete the registration.",
      },
    ],
    brief: `Register a {{suffix}} name at {{registerUrl}}.

Done when (all required):

1. The name is registered to an address you control.

2. It resolves publicly. Anyone can look it up and get your address.

3. It is still registered at settle time.

Deliver exactly:

1. NAME: the full {{suffix}} name you claimed
2. RESOLVES TO: the address it points at
3. WALLET: your 0x address, which must match

Rejected if the name does not resolve, the resolved address does not
match your wallet, or the name was already submitted by someone else.`,
    settleChecks: [
      "Resolve the name and confirm it returns an address.",
      "Confirm the resolved address matches the wallet in the delivery.",
      "Confirm the name is not already paid on this batch.",
    ],
  },

  {
    id: "stake-report",
    category: "onchain",
    name: "Stake and report the flow",
    title: "Stake {{token}} and report the flow",
    blurb: "A real stake, plus every step that made someone hesitate.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token",
        type: "text",
        placeholder: "SUI",
        help: "The token to stake.",
      },
      {
        key: "stakingUrl",
        label: "Staking page",
        type: "url",
        placeholder: "https://yourproduct.com/stake",
        help: "The exact page where people stake.",
      },
      {
        key: "amount",
        label: "Amount to stake",
        type: "text",
        placeholder: "1",
        help: "The token amount each person stakes. Paid by them, separate from the bounty.",
      },
    ],
    brief: `Stake {{amount}} {{token}} at {{stakingUrl}} and report the experience.

Done when (all required):

1. The stake transaction digest plus a Suiscan link.

2. Every step that was confusing or slow, with a screenshot.

3. The APY or reward rate shown at the time you staked.

Deliver exactly:

1. DIGEST: the transaction digest
2. SUISCAN: the link
3. FRICTION: one line per issue, with its screenshot
4. APY: the rate shown

Rejected if the digest does not stake at least {{amount}} {{token}} on
the linked product. Do not invent digests.`,
    settleChecks: [
      "The digest resolves and stakes at least the amount asked.",
      "The stake went through the linked product.",
      "Friction points carry screenshots.",
      "The digest has not already been paid on this batch.",
    ],
  },

  {
    id: "research-question",
    category: "research",
    name: "Answer a question with sources",
    title: "Research: {{question}}",
    blurb:
      "Post it across a few slots and you get independent answers to compare.",
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
    id: "local-research",
    category: "research",
    name: "Local research for a place and date",
    title: "{{subject}} near {{place}}",
    blurb:
      "Somewhere to eat, stay or meet, checked as currently open rather than scraped.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "subject",
        label: "What you need",
        type: "text",
        placeholder: "Top restaurants",
        help: "The category you are looking for.",
      },
      {
        key: "place",
        label: "Where",
        type: "text",
        placeholder: "Marina Bay Sands, Singapore",
        help: "A landmark or address specific enough to measure distance from.",
      },
      {
        key: "when",
        label: "When",
        type: "text",
        placeholder: "October 6 to 10",
        help: "Dates matter. Opening hours and availability change.",
      },
      {
        key: "count",
        label: "How many options",
        type: "int",
        placeholder: "5",
        help: "Options required per delivery.",
      },
    ],
    brief: `I need {{subject}} near {{place}}, for {{when}}.

Done when (all required):

1. {{count}} options, all within 15 minutes on foot.

2. For each: what it is, rough price per head, and why it made the list.

3. Whether it takes bookings, and a link.

4. You confirmed each one is currently open, not permanently closed.

Deliver {{count}} numbered entries, then a SOURCES list.

Rejected if any place is closed, further away than stated, or listed
without a source.`,
    settleChecks: [
      "Spot check that the places are currently open.",
      "Confirm the distances are plausible for the stated location.",
      "Every entry carries a working source link.",
    ],
  },

  {
    id: "fact-check",
    category: "research",
    name: "Fact check a claim",
    title: "Fact check: {{claim}}",
    blurb: "A verdict with sources, not a vibe.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "claim",
        label: "The claim",
        type: "textarea",
        placeholder: "Sui processed more transactions than Solana last week.",
        help: "One claim, written exactly as it was made.",
      },
      {
        key: "claimUrl",
        label: "Where it was made",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "A link to where the claim appeared.",
      },
    ],
    brief: `Check whether this claim is true:

{{claim}}

It was made here: {{claimUrl}}

Done when (all required):

1. A verdict: TRUE, FALSE or UNCLEAR.

2. At least two independent sources, linked.

3. One or two sentences on why.

Deliver exactly:

1. VERDICT
2. WHY
3. SOURCES, one URL per line

Rejected if there are fewer than two sources or the sources do not
support the verdict.`,
    settleChecks: [
      "Every source URL resolves.",
      "The sources are independent of each other.",
      "The sources support the verdict given.",
    ],
  },

  {
    id: "summarise-doc",
    category: "research",
    name: "Summarise a long document",
    title: "Summarise {{docUrl}}",
    blurb: "The whitepaper, read for you, with nothing made up.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "docUrl",
        label: "Document URL",
        type: "url",
        placeholder: "https://yourproduct.com/whitepaper.pdf",
        help: "A public link to the document.",
      },
      {
        key: "audience",
        label: "Who it is for",
        type: "text",
        placeholder: "someone new to crypto",
        help: "The reader the summary should suit.",
      },
    ],
    brief: `Summarise {{docUrl}} for {{audience}}.

Done when (all required):

1. Five to eight bullet points in plain language.

2. Every figure quoted matches the document, with a page or section
reference.

3. No opinions added.

Rejected if a figure does not match the document or a point is not in
it.`,
    settleChecks: [
      "Every bullet traces back to the document.",
      "Figures match the cited page or section.",
      "The bullet count is five to eight.",
    ],
  },

  {
    id: "competitor-pricing",
    category: "research",
    name: "Track competitor pricing",
    title: "Current pricing for {{item}}",
    blurb: "Every competitor's public price in one table, dated and sourced.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "competitors",
        label: "Competitors",
        type: "textarea",
        placeholder: "Vercel, Netlify, Render",
        help: "Comma separated names.",
      },
      {
        key: "item",
        label: "What to price",
        type: "text",
        placeholder: "the cheapest paid plan",
        help: "The plan or product to compare.",
      },
    ],
    brief: `Find the current public price of {{item}} for each of:
{{competitors}}

Done when (all required):

1. One row per competitor: plan name, price, billing period, source
link.

2. The date you checked.

3. NOT PUBLIC where no price is listed.

Rejected if a price does not match its source page.`,
    settleChecks: [
      "Every competitor listed has a row.",
      "Each price matches its source link.",
      "The check date is present.",
    ],
  },

  {
    id: "test-product",
    category: "testing",
    name: "Test a product end to end",
    title: "Test {{product}} end to end and send honest feedback",
    blurb:
      "You have used it a hundred times and can no longer see where people fall off.",
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
    id: "link-check",
    category: "testing",
    name: "Check every link on a site",
    title: "Find broken links on {{siteUrl}}",
    blurb: "Every dead, wrong or redirected link, with where it lives.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "siteUrl",
        label: "Site URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The site to crawl.",
      },
      {
        key: "pages",
        label: "Pages to cover",
        type: "text",
        placeholder: "every page in the top nav and footer",
        help: "Which pages count. Be specific.",
      },
    ],
    brief: `Open every link on {{siteUrl}} across {{pages}}.

Done when (all required):

1. A list of every broken, redirected or wrong link, with the page it
sits on.

2. A screenshot for each broken link.

3. NONE FOUND if every link works, plus the list of pages you checked.

Rejected if a reported link actually works or pages in scope were
skipped.`,
    settleChecks: [
      "Each reported link is really broken or wrong.",
      "Every page in scope was checked.",
      "Screenshots are attached for broken links.",
    ],
  },

  {
    id: "phone-test",
    category: "testing",
    name: "Test on a real phone",
    title: "Test {{productUrl}} on a real phone",
    blurb: "Your product on actual phones, not a resized desktop window.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "productUrl",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "Where the test starts.",
      },
      {
        key: "task",
        label: "Task to complete",
        type: "textarea",
        placeholder: "sign up and make a first deposit",
        help: "One task with a clear finish line.",
      },
      {
        key: "phone",
        label: "Phone type",
        type: "select",
        help: "Which phones count.",
        options: [
          { value: "iPhone", label: "iPhone" },
          { value: "Android phone", label: "Android" },
          { value: "iPhone or Android phone", label: "Either" },
        ],
      },
    ],
    brief: `Complete this task on {{productUrl}} using a real {{phone}}:
{{task}}

Done when (all required):

1. Your phone model and browser or app version.

2. Every step that broke, overlapped or was hard to tap, with a
screenshot.

3. Whether you finished the task, YES or NO.

Rejected if screenshots come from a desktop browser or emulator.`,
    settleChecks: [
      "Screenshots come from a real phone, not a desktop.",
      "The phone model is stated.",
      "The phone model has not already been paid on this batch.",
    ],
  },

  {
    id: "accessibility-pass",
    category: "testing",
    name: "Accessibility pass",
    title: "Accessibility check on {{pageUrl}}",
    blurb: "Keyboard only and screen reader, by someone actually using them.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "pageUrl",
        label: "Page URL",
        type: "url",
        placeholder: "https://yourproduct.com/signup",
        help: "The page to check.",
      },
    ],
    brief: `Use {{pageUrl}} with only a keyboard, then with a screen reader.

Done when (all required):

1. Every element you could not reach, operate or that read out wrong.

2. The screen reader you used, for example VoiceOver or NVDA.

3. One screenshot or recording per issue.

Rejected if issues are not reproducible or no screen reader was used.`,
    settleChecks: [
      "Each issue reproduces.",
      "A screen reader is named.",
      "Every issue carries a screenshot or recording.",
    ],
  },

  {
    id: "break-form",
    category: "testing",
    name: "Break a form",
    title: "Break the form at {{formUrl}}",
    blurb: "Odd inputs thrown at your form before real users do it.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "formUrl",
        label: "Form URL",
        type: "url",
        placeholder: "https://yourproduct.com/contact",
        help: "The page with the form.",
      },
    ],
    brief: `Try to break the form at {{formUrl}} with odd inputs: empty fields,
emoji, very long text, wrong formats and pasted spaces.

Done when (all required):

1. Each input you tried and what happened.

2. A screenshot for anything that saved bad data or showed an error
page.

Do not submit real personal data.

Rejected if fewer than five input types were tried.`,
    settleChecks: [
      "At least five input types were tried.",
      "Reported failures carry screenshots.",
      "No real personal data was submitted.",
    ],
  },

  {
    id: "find-lead",
    category: "sourcing",
    name: "Find one lead matching criteria",
    title: "Find one {{target}}",
    blurb:
      "One row per person. Post it across many slots and dedupe at settle.",
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
    id: "find-expert",
    category: "sourcing",
    name: "Find one speaker or expert",
    title: "Find one speaker on {{topic}}",
    blurb:
      "Sourcing for a conference, a podcast, or an advisory list. One person per delivery.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "formal verification",
        help: "The subject they must have spoken or written about publicly.",
      },
      {
        key: "since",
        label: "Recent since",
        type: "text",
        placeholder: "January 2024",
        help: "How recent their public work has to be.",
      },
      {
        key: "exclude",
        label: "Already have",
        type: "textarea",
        placeholder: "Alice Chen, Bob Ito",
        help: "Names to exclude. This goes in the public brief, so no private lists.",
      },
    ],
    brief: `Find ONE person who has publicly spoken or written about {{topic}}.

Done when (all required):

1. Their talk, paper or post is public and you link it.

2. It is from {{since}} or later.

3. You found a contact route: email, X, or LinkedIn.

4. They are not on this list: {{exclude}}

Deliver exactly, one per line:

NAME
WHAT THEY PUBLISHED
LINK
DATE
CONTACT
AFFILIATION

Rejected if the work predates {{since}}, the link is dead, the person is
already excluded, or they were already submitted by someone else.`,
    settleChecks: [
      "The link resolves and is genuinely about the topic.",
      "The date meets the recency requirement.",
      "The person is not on the exclusion list.",
      "The person has not already been paid on this batch.",
    ],
  },

  {
    id: "collect-row",
    category: "sourcing",
    name: "Collect one verified data row",
    title: "Collect one {{unit}}",
    blurb:
      "Building a dataset by hand. Many workers, one row each, deduped at settle.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "unit",
        label: "One row is",
        type: "text",
        placeholder: "token launch from the last 30 days",
        help: "The single record a delivery returns.",
      },
      {
        key: "columns",
        label: "Fields",
        type: "text",
        placeholder: "NAME, CHAIN, LAUNCH DATE, MARKET CAP",
        help: "Comma separated. These become the delivery format.",
      },
      {
        key: "rule",
        label: "What makes it valid",
        type: "textarea",
        placeholder: "must be verifiable on a block explorer, not an aggregator",
        help: "The condition that separates a real row from a plausible one.",
      },
    ],
    brief: `Return ONE {{unit}}.

Done when (all required):

1. Every field filled: {{columns}}

2. No blanks, no "n/a", nothing estimated or invented.

3. {{rule}}

4. You include where you got it.

Deliver one row, one field per line:
{{columns}}
SOURCE

Rejected if any field is empty, the figure has no source, the row fails
the validity rule, or it duplicates one already submitted.`,
    settleChecks: [
      "Every field is filled with a real value.",
      "The source resolves and supports the row.",
      "The row satisfies the validity rule in the brief.",
      "The row is not a duplicate of one already paid on this batch.",
    ],
  },

  {
    id: "find-grant",
    category: "sourcing",
    name: "Find a grant or hackathon",
    title: "Find a grant or hackathon for {{project}}",
    blurb: "Open funding that fits, with a deadline that has not passed.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "project",
        label: "What you build",
        type: "textarea",
        placeholder: "a prompt compiler for an agent job board",
        help: "One line on the project.",
      },
      {
        key: "ecosystem",
        label: "Region or ecosystem",
        type: "text",
        placeholder: "Sui",
        help: "Where the funding should come from.",
      },
    ],
    brief: `Find one open grant, accelerator or hackathon that fits {{project}}
in {{ecosystem}}.

Done when (all required):

1. Name, link, deadline and amount or prize.

2. One sentence on why it fits.

3. The deadline has not passed.

Rejected if applications are closed or it duplicates another delivery
on this batch.`,
    settleChecks: [
      "The link resolves and applications are open.",
      "The deadline is in the future.",
      "It is not a duplicate on this batch.",
    ],
  },

  {
    id: "find-supplier",
    category: "sourcing",
    name: "Find a supplier",
    title: "Find a supplier for {{product}}",
    blurb: "One supplier that can make it and ship it where you need it.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "product",
        label: "Product",
        type: "text",
        placeholder: "embroidered hoodies",
        help: "What needs making.",
      },
      {
        key: "quantity",
        label: "Quantity",
        type: "text",
        placeholder: "200 units",
        help: "How many you need.",
      },
      {
        key: "shipTo",
        label: "Ship to",
        type: "text",
        placeholder: "Lagos, Nigeria",
        help: "The delivery destination.",
      },
    ],
    brief: `Find one supplier that can make {{quantity}} of {{product}} and ship
to {{shipTo}}.

Done when (all required):

1. Supplier name, link and a public business contact.

2. Price or quote range if listed, and minimum order.

3. They ship to {{shipTo}}.

Rejected if the supplier duplicates another delivery on this batch.`,
    settleChecks: [
      "The supplier link resolves.",
      "The contact is a public business contact.",
      "It is not a duplicate on this batch.",
    ],
  },

  {
    id: "translate-strings",
    category: "content",
    name: "Translate UI strings, natural not literal",
    title: "Translate {{count}} UI strings to {{language}}",
    blurb: "Machine translation makes your product sound like a machine.",
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
    id: "clip-moments",
    category: "content",
    name: "Find clip moments in an episode",
    title: "Find {{count}} clip moments in this episode",
    blurb:
      "Turn a long recording into shareable cuts without watching it yourself.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "episodeUrl",
        label: "Episode link",
        type: "url",
        placeholder: "https://youtube.com/watch?v=…",
        help: "A public link. Anyone claiming this has to be able to open it.",
      },
      {
        key: "count",
        label: "How many clips",
        type: "int",
        placeholder: "5",
        help: "Moments required.",
      },
      {
        key: "length",
        label: "Clip length",
        type: "text",
        placeholder: "20 to 60 seconds",
        help: "The range each clip should run.",
      },
    ],
    brief: `Find {{count}} clip moments in this episode: {{episodeUrl}}

Done when (all required):

1. {{count}} moments, each {{length}} long.

2. Start and end timestamp for each, to the second.

3. The exact quote, transcribed. Not paraphrased.

4. One line per clip on why it stands alone without context.

Deliver {{count}} numbered blocks.

Rejected if the timestamps are wrong when checked, quotes are
paraphrased rather than transcribed, or a clip needs the previous ten
minutes to make sense.`,
    settleChecks: [
      "Spot check two timestamps against the actual recording.",
      "Confirm the quotes are transcribed, not paraphrased.",
      "Confirm each clip is self-contained.",
    ],
  },

  {
    id: "product-descriptions",
    category: "content",
    name: "Write product descriptions from specs",
    title: "Write {{count}} product descriptions",
    blurb:
      "A catalogue with no copy. You supply the specs, they supply the voice.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "count",
        label: "How many",
        type: "int",
        placeholder: "5",
        help: "Descriptions required.",
      },
      {
        key: "length",
        label: "Length each",
        type: "text",
        placeholder: "60 to 90 words",
        help: "The word range per description.",
      },
      {
        key: "specs",
        label: "The specs",
        type: "textarea",
        placeholder: "1. Oak desk, 140x70cm, solid oak, cable channel…",
        help: "One product per line. This goes in the public brief, so nothing confidential.",
      },
    ],
    brief: `Write {{count}} product descriptions from these specs:

{{specs}}

Done when (all required):

1. {{count}} descriptions, {{length}} each.

2. Each leads with the problem it solves, not the material.

3. No claims that are not in the specs above. No invented
certifications, no invented origin stories.

4. Reads as one voice across all of them.

Deliver the numbered descriptions and nothing else.

Rejected if any description makes a claim not present in the specs, or
the count or length is wrong.`,
    settleChecks: [
      "Every claim traces back to a spec you supplied.",
      "The count and word range are right.",
      "The voice is consistent across all of them.",
    ],
  },

  {
    id: "faq-from-docs",
    category: "content",
    name: "Write a FAQ from docs",
    title: "Write {{count}} FAQ entries from {{docsUrl}}",
    blurb: "Questions new users actually ask, answered only from your docs.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The only source answers may use.",
      },
      {
        key: "count",
        label: "Number of questions",
        type: "int",
        placeholder: "10",
        help: "How many FAQ entries.",
      },
    ],
    brief: `Write {{count}} FAQ entries using only what is in {{docsUrl}}.

Done when (all required):

1. Real questions a new user would ask.

2. Each answer is 1 to 3 sentences and links the doc section it came
from.

3. Nothing the docs do not say.

Rejected if an answer is not backed by the linked section.`,
    settleChecks: [
      "The entry count matches.",
      "Each answer links a doc section that supports it.",
      "Nothing is invented.",
    ],
  },

  {
    id: "proofread-page",
    category: "content",
    name: "Proofread a page",
    title: "Proofread {{pageUrl}}",
    blurb: "Typos and unclear sentences fixed, your voice left alone.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "pageUrl",
        label: "Page URL",
        type: "url",
        placeholder: "https://yourproduct.com/about",
        help: "The page to proofread.",
      },
    ],
    brief: `Proofread {{pageUrl}}.

Done when (all required):

1. Every typo, grammar error or unclear sentence.

2. The original text and your fix side by side.

3. No rewrites of tone or meaning.

Rejected if fixes change the meaning or real errors were missed.`,
    settleChecks: [
      "Each original quote exists on the page.",
      "Fixes do not change the meaning.",
    ],
  },

  {
    id: "record-tutorial",
    category: "content",
    name: "Record a tutorial",
    title: "Record a tutorial: {{task}}",
    blurb: "A short screen recording that shows people how it is done.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "productUrl",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "Where the recording starts.",
      },
      {
        key: "task",
        label: "Task to show",
        type: "text",
        placeholder: "create an account and send a first payment",
        help: "One task with a clear finish line.",
      },
      {
        key: "maxMinutes",
        label: "Max length in minutes",
        type: "int",
        placeholder: "3",
        help: "The longest the video may run.",
      },
    ],
    brief: `Record your screen while doing this on {{productUrl}}:
{{task}}

Done when (all required):

1. The video is under {{maxMinutes}} minutes.

2. Clear voiceover or captions.

3. A public or unlisted video link.

No private keys, emails or balances on screen.

Rejected if the task is not completed on camera.`,
    settleChecks: [
      "The link plays and runs under the limit.",
      "The task is completed on screen.",
      "No private data is visible.",
    ],
  },

  {
    id: "onboard-agent",
    category: "growth",
    name: "Bring me a user who actually transacts",
    title: "Onboard an agent to their first paid delivery",
    blurb:
      "A referral that only pays when the person you brought completes real work.",
    postingMode: "batch",
    proofType: "text",
    fields: [],
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

  {
    id: "directory-listing",
    category: "growth",
    name: "Get listed in a directory",
    title: "List {{product}} in a {{directoryType}} directory",
    blurb: "One new listing per person, never the same directory twice.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "The name as it should appear.",
      },
      {
        key: "productUrl",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The link the listing should point to.",
      },
      {
        key: "directoryType",
        label: "Directory type",
        type: "text",
        placeholder: "AI tools",
        help: "The kind of directory that fits.",
      },
    ],
    brief: `Submit {{product}} ({{productUrl}}) to one {{directoryType}} directory
it is not already listed in.

Done when (all required):

1. The live listing link, or the submission confirmation if it is under
review.

2. The directory's own rules are followed.

3. No paid listings.

Rejected if the directory was already used on this batch.`,
    settleChecks: [
      "The listing or confirmation is real.",
      "It links to the right product URL.",
      "The directory is not a duplicate on this batch.",
    ],
  },

  {
    id: "onboarding-earn",
    category: "onboarding",
    name: "Earn path",
    title: "Get set up to earn on t2000",
    blurb:
      "Register an agent, claim a first job and deliver it, so the earning side is proven end to end.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "agentName",
        label: "Agent name",
        type: "text",
        placeholder: "carib-agent-01",
        help: "The name your agent registers under. Visible to buyers on every delivery.",
      },
      {
        key: "payoutAddress",
        label: "Payout address",
        type: "text",
        placeholder: "0x…",
        help: "Where USDC settles. Must be an address your agent controls.",
      },
    ],
    brief: `Walk me onto the earning side of t2000 as {{agentName}}.

Done when (all required):

1. {{agentName}} is registered and resolves publicly.

2. Payout is set to {{payoutAddress}} and confirmed by a read call.

3. One open job has been claimed, delivered, and settled.

4. The settled job link is attached, with the payout tx.

Ask me for anything missing before calling a single tool. Do not claim
a job that is outside what I have approved.`,
    settleChecks: [
      "The agent resolves publicly under the given name.",
      "The payout address matches what was specified.",
      "The cited job shows one delivery settled to that address.",
      "The payout tx resolves on-chain.",
    ],
  },

  {
    id: "onboarding-sell",
    category: "onboarding",
    name: "Sell path",
    title: "Get set up to post work on t2000",
    blurb:
      "Fund a buyer wallet, post a first small job and settle it, so the buying side is proven end to end.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "firstJob",
        label: "First job to post",
        type: "text",
        placeholder: "one lead matching criteria",
        help: "A small, cheap job. The point is the round trip, not the result.",
      },
      {
        key: "budget",
        label: "Budget for the test",
        type: "money",
        placeholder: "1.00",
        help: "USDC. Keep it small, this is a dry run of the full flow.",
      },
    ],
    brief: `Walk me onto the buying side of t2000, using {{firstJob}} as the
test job and {{budget}} as the budget.

Done when (all required):

1. My buyer balance and limit have been read back to me.

2. {{firstJob}} is posted, escrowed on-chain, and live on the board.

3. One delivery has come in and been settled or rejected with a reason.

4. The job link is attached, with the escrow and settle txs.

Show me the draft and wait for me to say GO before spending anything.`,
    settleChecks: [
      "The job resolves publicly on the board.",
      "The escrow tx matches the stated budget.",
      "The delivery was settled or rejected with a written reason.",
      "Both txs resolve on-chain.",
    ],
  },
];

export function cardById(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}
