import type { Card, Field } from "./types";

/** Every card gets these four. The compiler appends them. */
export const commonFields: Field[] = [
  {
    key: "slots",
    label: "How many jobs",
    type: "int",
    placeholder: "10",
    help: "A whole number between 1 and 250.",
  },
  {
    key: "price",
    label: "Budget per job",
    type: "money",
    placeholder: "0.20",
    help: "USDC, between 0.01 and 100. This is per job, not the total.",
  },
  {
    key: "openHours",
    label: "How long it stays open",
    type: "select",
    help: "Hours the posting sits on the board. Unclaimed jobs refund to you fee-free when it lapses. Any number of hours up to 720 is valid.",
    options: [
      { value: "24", label: "24 hours" },
      { value: "72", label: "3 days" },
      { value: "168", label: "7 days" },
      { value: "336", label: "14 days" },
      { value: "720", label: "30 days" },
    ],
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
  {
    key: "maxClaims",
    label: "Jobs per agent at once",
    type: "select",
    help: "How many of your jobs one agent may hold undelivered at once. Delivering frees the seat either way. The real limit is this or the agent's tier cap, whichever is lower.",
    options: [
      { value: "1", label: "One at a time" },
      { value: "3", label: "Up to 3" },
      { value: "10", label: "Up to 10" },
      { value: "30", label: "Let their tier decide" },
    ],
  },
];

/** Single-job cards drop the slot count. */
export const commonFieldsSingle: Field[] = commonFields.filter(
  (f) => f.key !== "slots" && f.key !== "maxClaims"
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
    id: "linkedin-post",
    category: "social",
    name: "Write a LinkedIn post",
    title: "Write a LinkedIn post about using {{product}}",
    blurb: "Real users telling their professional network what they built.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "As it should appear.",
      },
      {
        key: "productUrl",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The link the post should include.",
      },
    ],
    brief: `Write a LinkedIn post about how you used {{product}}.

Done when (all required):

1. Your own experience, 80 to 200 words.

2. The post links {{productUrl}}.

3. A link to the post is attached.

One claim per person. You must have actually used the product.`,
    settleChecks: [
      "The post resolves and is public.",
      "The length is 80 to 200 words and links the product.",
      "The profile has not already been paid on this batch.",
    ],
  },

  {
    id: "community-spotlight",
    category: "social",
    name: "Write a community spotlight post",
    title: "Spotlight one {{community}} member",
    blurb: "A short interview that makes a real member feel seen.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "community",
        label: "Community",
        type: "text",
        placeholder: "Sui builders",
        help: "The community the member belongs to.",
      },
    ],
    brief: `Interview one active {{community}} member and write a short spotlight.

Done when (all required):

1. 100 to 200 words, approved by the member.

2. At least one direct quote from them.

3. Delivered as text with their handle.

Rejected if the member was already spotlighted on this batch or did not
approve it.`,
    settleChecks: [
      "The member exists and is active in the community.",
      "The member approved the spotlight.",
      "The member is not a duplicate on this batch.",
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
    id: "mint-report",
    category: "onchain",
    name: "Mint an NFT and report the flow",
    title: "Mint from {{mintUrl}} and report the flow",
    blurb: "A real mint, plus every step that nearly lost the buyer.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "mintUrl",
        label: "Mint page",
        type: "url",
        placeholder: "https://yourproject.com/mint",
        help: "The exact page where people mint.",
      },
    ],
    brief: `Mint one NFT at {{mintUrl}} and report the experience.

Done when (all required):

1. The mint transaction digest plus a Suiscan link.

2. Every step that was confusing or slow, with a screenshot.

3. How long the whole mint took, start to finish.

Rejected if the digest is not a mint from the linked collection. Do not
invent digests.`,
    settleChecks: [
      "The digest resolves and mints from the right collection.",
      "Friction points carry screenshots.",
      "The wallet has not already been paid on this batch.",
    ],
  },

  {
    id: "wallet-connect",
    category: "onchain",
    name: "Connect three wallets",
    title: "Connect {{dappUrl}} with 3 Sui wallets",
    blurb: "Find out which wallets quietly fail before your users do.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "dappUrl",
        label: "App URL",
        type: "url",
        placeholder: "https://yourapp.com",
        help: "The app to connect to.",
      },
    ],
    brief: `Connect to {{dappUrl}} with 3 different Sui wallets.

Done when (all required):

1. The wallet names and versions.

2. A screenshot of each connection result.

3. Any error messages copied exactly.

Never share a seed phrase or private key.`,
    settleChecks: [
      "Three different wallets were tested.",
      "Each result has a screenshot.",
      "Errors are quoted exactly.",
    ],
  },

  {
    id: "swap-quotes",
    category: "onchain",
    name: "Compare swap quotes",
    title: "Compare quotes for {{amount}} {{from}} to {{to}}",
    blurb: "Which Sui route gives the best price, with no trade made.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "amount",
        label: "Amount",
        type: "text",
        placeholder: "100",
        help: "How much to quote.",
      },
      {
        key: "from",
        label: "From token",
        type: "text",
        placeholder: "SUI",
        help: "The token being swapped.",
      },
      {
        key: "to",
        label: "To token",
        type: "text",
        placeholder: "USDC",
        help: "The token received.",
      },
    ],
    brief: `Get a quote for swapping {{amount}} {{from}} to {{to}} on 3 Sui DEXs or
aggregators.

Done when (all required):

1. Output amount, fee and price impact for each.

2. Screenshots taken within 5 minutes of each other.

3. The best route named.

Do not execute any swap.`,
    settleChecks: [
      "Three different venues were quoted.",
      "Screenshots are within 5 minutes of each other.",
      "No swap was executed.",
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
    id: "app-reviews",
    category: "research",
    name: "Summarise app store reviews",
    title: "Summarise the latest reviews of {{appUrl}}",
    blurb: "What users love and hate, straight from their own reviews.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "appUrl",
        label: "App store link",
        type: "url",
        placeholder: "https://apps.apple.com/app/id123456789",
        help: "The App Store or Google Play listing.",
      },
      {
        key: "count",
        label: "Reviews to read",
        type: "int",
        placeholder: "50",
        help: "The most recent reviews to cover.",
      },
    ],
    brief: `Read the last {{count}} reviews of {{appUrl}}.

Done when (all required):

1. The top complaints, each with a count and two quotes.

2. The top praise, each with a count and two quotes.

3. The date range of the reviews you read.

Rejected if quotes do not appear in real reviews.`,
    settleChecks: [
      "Quotes match real reviews on the listing.",
      "The review count and date range are stated.",
    ],
  },

  {
    id: "social-listening",
    category: "research",
    name: "Social listening",
    title: "Find public complaints about {{topic}}",
    blurb: "What people say when they think you are not listening.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "crypto wallet onboarding",
        help: "The product, brand or problem to listen for.",
      },
    ],
    brief: `Find 10 public posts from the last 30 days complaining about {{topic}}.

Done when (all required):

1. Links, grouped by complaint type.

2. A one line summary per group.

3. No posts older than 30 days.

Rejected if links do not resolve or are off topic.`,
    settleChecks: [
      "All 10 links resolve and are complaints about the topic.",
      "Every post is from the last 30 days.",
      "Groups have summaries.",
    ],
  },

  {
    id: "terms-risks",
    category: "research",
    name: "Read the terms and flag risks",
    title: "Flag surprises in the terms at {{termsUrl}}",
    blurb: "The fine print read for you, quoted clause by clause.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "termsUrl",
        label: "Terms URL",
        type: "url",
        placeholder: "https://yourproduct.com/terms",
        help: "The terms of service to read.",
      },
    ],
    brief: `Read the terms at {{termsUrl}} and list anything a user would be
surprised by.

Done when (all required):

1. NOT LEGAL ADVICE, stated at the top.

2. Each point quotes the exact clause.

3. A plain language explanation for each.

Rejected if a quoted clause is not in the terms.`,
    settleChecks: [
      "Every quote appears in the terms.",
      "The not legal advice line is present.",
      "Explanations match the clauses.",
    ],
  },

  {
    id: "name-ideas",
    category: "research",
    name: "Name ideas with handle checks",
    title: "Suggest names for {{product}} and check availability",
    blurb: "Ten names, each checked for a domain, a handle and trademarks.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "product",
        label: "What it is",
        type: "textarea",
        placeholder: "a prompt compiler for an agent job board",
        help: "One line describing the product.",
      },
    ],
    brief: `Suggest 10 names for {{product}} and check each one's availability.

Done when (all required):

1. For each name: the .com domain, the X handle, and a trademark search
result.

2. AVAILABLE or TAKEN for each check.

3. Your top 3 picks, with one line each.

Rejected if availability results are wrong.`,
    settleChecks: [
      "There are 10 names with all three checks.",
      "Spot checked availability is correct.",
      "It is not a copy of another submission.",
    ],
  },

  {
    id: "find-statistic",
    category: "research",
    name: "Find a statistic with a source",
    title: "Find a reliable figure for {{statistic}}",
    blurb: "One number, traced back to where it was first published.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "statistic",
        label: "The statistic",
        type: "textarea",
        placeholder: "the number of active crypto wallets in Nigeria",
        help: "What figure you need.",
      },
    ],
    brief: `Find the most recent reliable figure for {{statistic}}.

Done when (all required):

1. The number, its date and the primary source link.

2. The source is the original publisher, not a blog quoting another blog.

3. NO RELIABLE FIGURE if none exists, plus where you looked.`,
    settleChecks: [
      "The source is primary and states the figure.",
      "The figure and date match the source.",
    ],
  },

  {
    id: "search-trends",
    category: "research",
    name: "Check search trends",
    title: "Compare search trends for {{terms}}",
    blurb: "Twelve months of search interest, read for you.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "terms",
        label: "Search terms",
        type: "text",
        placeholder: "AI agents, crypto wallets",
        help: "Comma separated, up to 5.",
      },
      {
        key: "region",
        label: "Region",
        type: "text",
        placeholder: "Worldwide",
        help: "Where to compare.",
      },
    ],
    brief: `Compare Google Trends for {{terms}} over the last 12 months in
{{region}}.

Done when (all required):

1. A screenshot of the chart.

2. The peak month for each term.

3. One line on what changed.`,
    settleChecks: [
      "The screenshot shows the right terms, region and period.",
      "Peak months match the chart.",
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
    id: "referral-test",
    category: "testing",
    name: "Test a referral link",
    title: "Sign up through a referral link and confirm the credit",
    blurb: "Proof your referral tracking works. Best posted to Established claimers only.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "refUrl",
        label: "Referral link",
        type: "url",
        placeholder: "https://yourproduct.com/?ref=abc123",
        help: "The link to sign up through. Pick Established only under Who can claim to avoid self referral farming.",
      },
    ],
    brief: `Sign up for a new account through this link:

{{refUrl}}

Done when (all required):

1. A screenshot of the sign up page showing the referral applied.

2. The email or username of your new account.

3. Whether the referral credit showed up, YES or NO, with a screenshot.

One account per person. Accounts you already had do not count.`,
    settleChecks: [
      "The account is new and was created through the link.",
      "The referral result is backed by a screenshot.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "cross-browser",
    category: "testing",
    name: "Cross browser test",
    title: "Test {{url}} in Chrome, Safari and Firefox",
    blurb: "The same task in three browsers, every difference caught.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "url",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "Where the test starts.",
      },
      {
        key: "task",
        label: "Task to complete",
        type: "textarea",
        placeholder: "sign up and create a first project",
        help: "One task with a clear finish line.",
      },
    ],
    brief: `Complete this task on {{url}} in Chrome, Safari and Firefox:
{{task}}

Done when (all required):

1. Browser versions stated.

2. Every difference between browsers, with screenshots.

3. PASS or FAIL per browser.

Rejected if a browser was skipped.`,
    settleChecks: [
      "All three browsers were tested with versions.",
      "Differences carry screenshots.",
      "Each browser has a PASS or FAIL.",
    ],
  },

  {
    id: "email-spam",
    category: "testing",
    name: "Check if emails land in spam",
    title: "Check where {{url}} emails land",
    blurb: "Your sign up emails, tracked into the inbox or the spam folder.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "url",
        label: "Sign up URL",
        type: "url",
        placeholder: "https://yourproduct.com/signup",
        help: "Where to sign up.",
      },
    ],
    brief: `Sign up at {{url}} with a Gmail address and an Outlook address.

Done when (all required):

1. Inbox, Promotions or Spam for each email received.

2. The time each email arrived after sign up.

3. Screenshots of each folder.

Rejected if either provider was skipped.`,
    settleChecks: [
      "Both Gmail and Outlook were tested.",
      "Each email has a folder and arrival time.",
      "Screenshots are attached.",
    ],
  },

  {
    id: "slow-network",
    category: "testing",
    name: "Test on a slow connection",
    title: "Test {{url}} on a slow connection",
    blurb: "Your product the way people on weak signal see it.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "url",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "Where the test starts.",
      },
      {
        key: "task",
        label: "Task to complete",
        type: "textarea",
        placeholder: "sign up and load the dashboard",
        help: "One task with a clear finish line.",
      },
    ],
    brief: `Load {{url}} with the network throttled to Slow 3G and complete this
task:
{{task}}

Done when (all required):

1. The load time for the first screen.

2. Every step that timed out or froze.

3. A screen recording.`,
    settleChecks: [
      "The recording shows throttling turned on.",
      "Load time is stated.",
      "Failures are visible in the recording.",
    ],
  },

  {
    id: "test-checkout",
    category: "testing",
    name: "Test a checkout in test mode",
    title: "Test the checkout on {{url}}",
    blurb: "A full purchase run with a test card, every step captured.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "url",
        label: "Store URL",
        type: "url",
        placeholder: "https://staging.yourstore.com",
        help: "A store running in test mode.",
      },
      {
        key: "testDocsUrl",
        label: "Test card details link",
        type: "url",
        placeholder: "https://docs.stripe.com/testing",
        help: "Where the test card numbers are published.",
      },
    ],
    brief: `Complete a purchase on {{url}} using a test card from {{testDocsUrl}}.

Done when (all required):

1. Every step, with screenshots.

2. Whether the confirmation email arrived.

3. Any error messages copied exactly.

Never use a real card.`,
    settleChecks: [
      "Screenshots cover the whole checkout.",
      "Only a test card was used.",
      "The email result is stated.",
    ],
  },

  {
    id: "dark-mode-check",
    category: "testing",
    name: "Check dark mode",
    title: "Check dark mode on {{url}}",
    blurb: "Invisible icons and unreadable text caught in the dark.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "url",
        label: "Product URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "Where the check starts.",
      },
      {
        key: "pages",
        label: "Pages to check",
        type: "text",
        placeholder: "home, pricing, dashboard, settings",
        help: "Which pages count.",
      },
    ],
    brief: `Switch {{url}} to dark mode and check every page in: {{pages}}.

Done when (all required):

1. Every unreadable text, invisible icon or wrong colour.

2. A screenshot per issue.

3. NONE FOUND plus the pages checked, if clean.`,
    settleChecks: [
      "Every page in scope was checked.",
      "Each issue carries a screenshot.",
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
    id: "verify-contacts",
    category: "sourcing",
    name: "Verify a list of contacts",
    title: "Verify the rows in {{sheetUrl}}",
    blurb: "A stale list cleaned: dead sites and closed businesses marked.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sheetUrl",
        label: "Sheet link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet the agent can view and comment on.",
      },
    ],
    brief: `Check every row in {{sheetUrl}}.

Done when (all required):

1. Each row marked LIVE, DEAD or CLOSED.

2. DEAD means the website does not load. CLOSED means the business has
publicly shut down, with a source link.

3. A count of each status.

Rejected if a row marked DEAD actually loads.`,
    settleChecks: [
      "Every row has a status.",
      "Spot checked DEAD rows really fail to load.",
      "CLOSED rows carry a source.",
    ],
  },

  {
    id: "find-influencer",
    category: "sourcing",
    name: "Find micro influencers",
    title: "Find a {{topic}} creator with {{minFollowers}} to {{maxFollowers}} followers",
    blurb: "Smaller creators with real audiences and a public contact.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "Sui DeFi",
        help: "What they post about.",
      },
      {
        key: "minFollowers",
        label: "Minimum followers",
        type: "int",
        placeholder: "2000",
        help: "The smallest audience that counts.",
      },
      {
        key: "maxFollowers",
        label: "Maximum followers",
        type: "int",
        placeholder: "50000",
        help: "The largest audience that counts.",
      },
    ],
    brief: `Find one creator with {{minFollowers}} to {{maxFollowers}} followers who
posts about {{topic}}.

Done when (all required):

1. Profile link, follower count and a public contact.

2. Links to two recent posts on the topic.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The profile resolves and the follower count is in range.",
      "The two posts are recent and on topic.",
      "The creator is not a duplicate on this batch.",
    ],
  },

  {
    id: "find-podcast",
    category: "sourcing",
    name: "Find podcasts to pitch",
    title: "Find a {{topic}} podcast that has guests",
    blurb: "Active shows that book guests, with a way to reach the host.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "AI agents",
        help: "What the show covers.",
      },
    ],
    brief: `Find one active podcast about {{topic}} that has guests.

Done when (all required):

1. Show link, host name and a public booking contact.

2. An episode released in the last 60 days.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The show link resolves and has guest episodes.",
      "The latest episode is within 60 days.",
      "The show is not a duplicate on this batch.",
    ],
  },

  {
    id: "find-freelancer",
    category: "sourcing",
    name: "Find a freelancer",
    title: "Find a {{skill}} freelancer",
    blurb: "Someone who can do the work, with samples and a public rate.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "skill",
        label: "Skill",
        type: "text",
        placeholder: "motion design",
        help: "What they need to do.",
      },
      {
        key: "budget",
        label: "Budget",
        type: "text",
        placeholder: "$500 for the project",
        help: "What you can pay.",
      },
    ],
    brief: `Find one freelancer who does {{skill}} within {{budget}}.

Done when (all required):

1. Portfolio link, public rate and a public contact.

2. Two past work samples relevant to the skill.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The portfolio resolves and shows the skill.",
      "The public rate fits the budget.",
      "The freelancer is not a duplicate on this batch.",
    ],
  },

  {
    id: "find-dataset",
    category: "sourcing",
    name: "Find open datasets",
    title: "Find a free dataset about {{topic}}",
    blurb: "Public data you can actually download and use.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "mobile money transactions in Africa",
        help: "What the data should cover.",
      },
    ],
    brief: `Find one free, public dataset about {{topic}}.

Done when (all required):

1. Link, licence, row count and last update date.

2. Downloadable without paying.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The dataset downloads for free.",
      "Licence and update date are correct.",
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
    id: "alt-text",
    category: "content",
    name: "Write alt text",
    title: "Write alt text for {{pageUrl}}",
    blurb: "Every image described for screen readers, briefly and accurately.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "pageUrl",
        label: "Page URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The page whose images need alt text.",
      },
    ],
    brief: `Write alt text for every meaningful image on {{pageUrl}}.

Done when (all required):

1. One line per image: the image file name, then the alt text.

2. Each alt text is under 125 characters.

3. Decorative images are marked DECORATIVE instead.

Rejected if images are missed or descriptions are wrong.`,
    settleChecks: [
      "Every image on the page is covered.",
      "Each alt text is under 125 characters and accurate.",
    ],
  },

  {
    id: "changelog",
    category: "content",
    name: "Write a changelog",
    title: "Write a changelog from {{compareUrl}}",
    blurb: "Commit messages turned into release notes users can read.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "compareUrl",
        label: "Commits link",
        type: "url",
        placeholder: "https://github.com/org/repo/compare/v1.0...v1.1",
        help: "A compare view or list of the commits to cover.",
      },
    ],
    brief: `Turn the commits in {{compareUrl}} into a user facing changelog.

Done when (all required):

1. Grouped into New, Improved and Fixed.

2. Plain language, no commit hashes.

3. Nothing listed that is not in the commits.

Rejected if items are invented or user facing changes are missed.`,
    settleChecks: [
      "Every item traces to a commit.",
      "No commit hashes or jargon.",
      "User facing changes are covered.",
    ],
  },

  {
    id: "video-to-blog",
    category: "content",
    name: "Turn a video into a blog post",
    title: "Turn {{videoUrl}} into a blog post",
    blurb: "A talk or demo rewritten as something people can skim.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "videoUrl",
        label: "Video link",
        type: "url",
        placeholder: "https://youtube.com/watch?v=...",
        help: "The video to write up.",
      },
      {
        key: "words",
        label: "Target length in words",
        type: "int",
        placeholder: "800",
        help: "Roughly how long the post should be.",
      },
    ],
    brief: `Turn {{videoUrl}} into a blog post of about {{words}} words.

Done when (all required):

1. Headings and a short intro.

2. Every claim comes from the video.

3. A Google Doc link with comment access.

Rejected if the post adds claims the video does not make.`,
    settleChecks: [
      "The length is close to the target.",
      "Claims match the video.",
      "The doc link opens.",
    ],
  },

  {
    id: "email-sequence",
    category: "content",
    name: "Write an email sequence",
    title: "Write a {{count}} email welcome sequence for {{product}}",
    blurb: "Welcome emails that each get a new user to do one thing.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "As it should appear.",
      },
      {
        key: "count",
        label: "Number of emails",
        type: "int",
        placeholder: "4",
        help: "How many emails in the sequence.",
      },
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The only source of facts.",
      },
    ],
    brief: `Write a {{count}} email welcome sequence for new {{product}} users.

Done when (all required):

1. A subject line and body for each, under 150 words.

2. One clear action per email.

3. Only facts from {{docsUrl}}.`,
    settleChecks: [
      "The email count matches.",
      "Each email is under 150 words with one action.",
      "Nothing is invented.",
    ],
  },

  {
    id: "press-release",
    category: "content",
    name: "Write a press release",
    title: "Write a press release: {{news}}",
    blurb: "A release ready to send, with the quote left for you to approve.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "company",
        label: "Company",
        type: "text",
        placeholder: "BadLabs",
        help: "Who is announcing.",
      },
      {
        key: "news",
        label: "The news",
        type: "textarea",
        placeholder: "the launch of t2000 prompts",
        help: "One line on what is being announced.",
      },
      {
        key: "factsUrl",
        label: "Facts link",
        type: "url",
        placeholder: "https://yourproduct.com/press",
        help: "The only source of facts.",
      },
    ],
    brief: `Write a press release announcing {{news}} for {{company}}.

Done when (all required):

1. Headline, dateline, 3 to 5 paragraphs and a boilerplate.

2. One quote, marked [QUOTE TO APPROVE].

3. Only facts from {{factsUrl}}.`,
    settleChecks: [
      "The structure is complete.",
      "The quote is marked for approval.",
      "Nothing is invented.",
    ],
  },

  {
    id: "caption-video",
    category: "content",
    name: "Caption a video",
    title: "Caption {{videoUrl}}",
    blurb: "An SRT file with accurate words and timing.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "videoUrl",
        label: "Video link",
        type: "url",
        placeholder: "https://youtube.com/watch?v=...",
        help: "The video to caption.",
      },
    ],
    brief: `Write captions for {{videoUrl}} as an SRT file.

Done when (all required):

1. Timings within half a second.

2. Lines under 42 characters.

3. A download link to the file.`,
    settleChecks: [
      "The SRT loads against the video.",
      "Spot checked timings are within half a second.",
      "Lines are under 42 characters.",
    ],
  },

  {
    id: "design-banner",
    category: "design",
    name: "Design a social banner",
    title: "Design a {{size}} for {{brand}}",
    blurb: "A banner sized right for the platform, with the source file included.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "brand",
        label: "Brand name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "The name on the banner.",
      },
      {
        key: "size",
        label: "Banner type",
        type: "select",
        help: "The platform decides the exact size.",
        options: [
          { value: "X header (1500 by 500)", label: "X header" },
          { value: "Discord banner (960 by 540)", label: "Discord banner" },
          { value: "LinkedIn banner (1584 by 396)", label: "LinkedIn banner" },
        ],
      },
      {
        key: "style",
        label: "Style notes",
        type: "textarea",
        placeholder: "clean, lots of white space, orange accent",
        help: "One or two lines on the look.",
      },
      {
        key: "assetsUrl",
        label: "Brand assets link",
        type: "url",
        placeholder: "https://yourproduct.com/brand",
        help: "Logo, colours and fonts to use.",
      },
    ],
    brief: `Design one {{size}} for {{brand}}.

Style: {{style}}

Use the assets at {{assetsUrl}}.

Done when (all required):

1. The exact dimensions for the platform.

2. A PNG export plus the source file.

3. Original work. No watermarked stock images.

Deliver a download link to both files.`,
    settleChecks: [
      "The PNG matches the platform dimensions.",
      "The source file is included.",
      "It uses the brand assets and is original.",
    ],
  },

  {
    id: "landing-review",
    category: "design",
    name: "Review a landing page design",
    title: "First look review of {{pageUrl}}",
    blurb: "What a stranger misses in the first ten seconds, with fixes.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "pageUrl",
        label: "Page URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The landing page to review.",
      },
    ],
    brief: `Review {{pageUrl}} as a first time visitor.

Done when (all required):

1. In one sentence, what you think the product does, written before
scrolling.

2. The 3 biggest things that confused or slowed you, each with a
screenshot.

3. One concrete fix for each.

Rejected if points are generic advice that fits any website.`,
    settleChecks: [
      "Each point refers to something visible on this page.",
      "Every point has a screenshot and a fix.",
      "It is not a copy of another submission.",
    ],
  },

  {
    id: "icon-set",
    category: "design",
    name: "Make a set of icons",
    title: "Draw {{count}} icons in a {{style}} style",
    blurb: "A consistent SVG icon set for your product.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "iconList",
        label: "Icons needed",
        type: "textarea",
        placeholder: "wallet, send, receive, settings, history",
        help: "Comma separated list.",
      },
      {
        key: "count",
        label: "How many icons",
        type: "int",
        placeholder: "5",
        help: "Must match the list.",
      },
      {
        key: "style",
        label: "Style",
        type: "text",
        placeholder: "outline, 2px stroke",
        help: "The look every icon shares.",
      },
    ],
    brief: `Draw {{count}} icons in a {{style}} style: {{iconList}}.

Done when (all required):

1. SVG files with a consistent stroke and size.

2. Every icon is original.

3. A download link to the set.

Rejected if the set is inconsistent or icons are copied from a library.`,
    settleChecks: [
      "The count and names match the list.",
      "Files are SVG and visually consistent.",
      "Icons are original.",
    ],
  },

  {
    id: "mock-screen",
    category: "design",
    name: "Mock up a screen",
    title: "Mock up {{screen}}",
    blurb: "A new screen that looks like it already belongs in your product.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "screen",
        label: "Screen to design",
        type: "textarea",
        placeholder: "a settings page with profile, wallet and notifications",
        help: "What the screen is and what it contains.",
      },
      {
        key: "referenceUrl",
        label: "Reference link",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The existing product to match.",
      },
    ],
    brief: `Mock up {{screen}}, matching the look of {{referenceUrl}}.

Done when (all required):

1. A Figma or image link.

2. A desktop and a mobile version.

3. It uses the existing colours and fonts.

Rejected if it does not match the reference product.`,
    settleChecks: [
      "Both desktop and mobile versions exist.",
      "Colours and fonts match the reference.",
      "Every element asked for is present.",
    ],
  },

  {
    id: "og-image",
    category: "design",
    name: "Make an OG image",
    title: "Make a link preview image for {{pageUrl}}",
    blurb: "The card people see when your link is shared.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "pageUrl",
        label: "Page URL",
        type: "url",
        placeholder: "https://yourproduct.com",
        help: "The page the image is for.",
      },
      {
        key: "assetsUrl",
        label: "Brand assets link",
        type: "url",
        placeholder: "https://yourproduct.com/brand",
        help: "Logo, colours and fonts to use.",
      },
    ],
    brief: `Make a 1200 by 630 link preview image for {{pageUrl}}.

Done when (all required):

1. Text is readable at small sizes.

2. A PNG plus the source file.

3. Uses the brand assets from {{assetsUrl}}.

Deliver a download link to both files.`,
    settleChecks: [
      "The PNG is 1200 by 630.",
      "The source file is included.",
      "It uses the brand assets.",
    ],
  },

  {
    id: "slide-template",
    category: "design",
    name: "Make a slide template",
    title: "Make a {{brand}} slide template",
    blurb: "A deck template your team can fill without breaking the look.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "brand",
        label: "Brand name",
        type: "text",
        placeholder: "t2000",
        help: "Whose style the template follows.",
      },
      {
        key: "slides",
        label: "Number of slides",
        type: "int",
        placeholder: "8",
        help: "How many slides in the template.",
      },
      {
        key: "assetsUrl",
        label: "Brand assets link",
        type: "url",
        placeholder: "https://yourproduct.com/brand",
        help: "Logo, colours and fonts to use.",
      },
    ],
    brief: `Make a {{slides}} slide Google Slides template in the {{brand}} style,
using {{assetsUrl}}.

Done when (all required):

1. Title, section, content and closing layouts.

2. Brand colours and fonts.

3. An editable link.`,
    settleChecks: [
      "The link is editable or copyable.",
      "All four layouts exist.",
      "Brand colours and fonts are used.",
    ],
  },

  {
    id: "favicon-set",
    category: "design",
    name: "Make a favicon set",
    title: "Make a favicon set from {{logoUrl}}",
    blurb: "Every icon size a browser and phone asks for.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "logoUrl",
        label: "Logo link",
        type: "url",
        placeholder: "https://yourproduct.com/logo.svg",
        help: "The logo to work from.",
      },
    ],
    brief: `Make a favicon set from {{logoUrl}}.

Done when (all required):

1. 16, 32, 180 and 512 pixel PNGs plus an SVG.

2. Readable at 16 pixels.

3. A download link to the set.`,
    settleChecks: [
      "All five files exist at the right sizes.",
      "The 16 pixel icon is readable.",
    ],
  },

  {
    id: "infographic",
    category: "design",
    name: "Make an infographic",
    title: "Turn {{dataUrl}} into an infographic",
    blurb: "Your numbers made shareable, with every figure checked.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "dataUrl",
        label: "Data link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "The data to visualise.",
      },
      {
        key: "platform",
        label: "Platform",
        type: "select",
        help: "Where it will be posted.",
        options: [
          { value: "X (1600 by 900)", label: "X" },
          { value: "LinkedIn (1200 by 1500)", label: "LinkedIn" },
          { value: "Instagram (1080 by 1350)", label: "Instagram" },
        ],
      },
    ],
    brief: `Turn {{dataUrl}} into one infographic for {{platform}}.

Done when (all required):

1. Every number matches the source.

2. The source is credited on the image.

3. A PNG plus the source file.`,
    settleChecks: [
      "Every number matches the data.",
      "The source is credited.",
      "Size fits the platform.",
    ],
  },

  {
    id: "review-pr",
    category: "dev",
    name: "Review a pull request",
    title: "Review {{prUrl}}",
    blurb: "A second pair of eyes on a change before it ships.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "prUrl",
        label: "PR URL",
        type: "url",
        placeholder: "https://github.com/org/repo/pull/42",
        help: "A public pull request.",
      },
      {
        key: "focus",
        label: "Focus area",
        type: "text",
        placeholder: "security and error handling",
        help: "What matters most in this review.",
      },
    ],
    brief: `Review {{prUrl}}, focusing on {{focus}}.

Done when (all required):

1. Each issue with its file and line number.

2. A severity for each: BUG, RISK or STYLE.

3. NO ISSUES if you found none, plus what you checked.

Rejected if issues point at lines that do not exist in the PR.`,
    settleChecks: [
      "Every cited file and line exists in the PR.",
      "Issues are real, not generic advice.",
    ],
  },

  {
    id: "reproduce-bug",
    category: "dev",
    name: "Reproduce a bug",
    title: "Reproduce the bug in {{issueUrl}}",
    blurb: "Exact steps that make the bug happen, or proof it does not.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "issueUrl",
        label: "Issue URL",
        type: "url",
        placeholder: "https://github.com/org/repo/issues/42",
        help: "The bug report to reproduce.",
      },
    ],
    brief: `Reproduce the bug described in {{issueUrl}}.

Done when (all required):

1. Exact steps, your environment and the version tested.

2. A screenshot or recording of the bug happening.

3. COULD NOT REPRODUCE plus the steps you tried, if it does not happen.

Rejected if steps are missing or the environment is not stated.`,
    settleChecks: [
      "Steps are specific enough to follow.",
      "The environment and version are stated.",
      "Evidence is attached.",
    ],
  },

  {
    id: "write-tests",
    category: "dev",
    name: "Write tests for a function",
    title: "Write tests for {{function}}",
    blurb: "Tests that pass, including the edge case nobody wrote.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "repoUrl",
        label: "Repo URL",
        type: "url",
        placeholder: "https://github.com/org/repo",
        help: "A public repository.",
      },
      {
        key: "function",
        label: "File and function",
        type: "text",
        placeholder: "lib/compile.ts compilePost",
        help: "Exactly what to test.",
      },
      {
        key: "framework",
        label: "Test framework",
        type: "text",
        placeholder: "Vitest",
        help: "The framework the repo uses.",
      },
    ],
    brief: `Write tests for {{function}} in {{repoUrl}} using {{framework}}.

Done when (all required):

1. A pull request or patch link.

2. The tests pass locally, with the output pasted.

3. At least one edge case is covered.

Rejected if the tests fail or only test the happy path.`,
    settleChecks: [
      "The tests run and pass.",
      "At least one edge case is covered.",
      "No unrelated code was changed.",
    ],
  },

  {
    id: "api-check",
    category: "dev",
    name: "Check an API endpoint",
    title: "Check {{endpoint}} against its docs",
    blurb: "A real call compared line by line with what the docs promise.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com/api",
        help: "Where the endpoint is documented.",
      },
      {
        key: "endpoint",
        label: "Endpoint",
        type: "text",
        placeholder: "GET /v1/jobs",
        help: "Method and path.",
      },
    ],
    brief: `Call {{endpoint}} as documented at {{docsUrl}}.

Done when (all required):

1. The request you sent and the response you got, with any keys removed.

2. Every place the response differs from the docs.

3. Response times for 5 calls.

Never paste API keys or tokens in the delivery.`,
    settleChecks: [
      "The request and response are included.",
      "Reported differences are real.",
      "No keys appear in the delivery.",
    ],
  },

  {
    id: "fix-code-example",
    category: "dev",
    name: "Update a broken code example",
    title: "Fix a broken code example in {{docsUrl}}",
    blurb: "Docs examples that run again when people copy them.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The docs to search for broken examples.",
      },
    ],
    brief: `Find one code example in {{docsUrl}} that no longer runs and fix it.

Done when (all required):

1. The broken example and the exact error it throws.

2. The fixed version, tested, with the output pasted.

3. A pull request or patch link.

Rejected if the example was already fixed on this batch.`,
    settleChecks: [
      "The original example really fails.",
      "The fix runs.",
      "The example is not a duplicate on this batch.",
    ],
  },

  {
    id: "readme-setup",
    category: "dev",
    name: "Set up from the README",
    title: "Get {{repoUrl}} running from the README",
    blurb: "A fresh machine following your setup docs to the letter.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "repoUrl",
        label: "Repo URL",
        type: "url",
        placeholder: "https://github.com/org/repo",
        help: "A public repository.",
      },
    ],
    brief: `Clone {{repoUrl}} and get it running using only the README.

Done when (all required):

1. Your OS and tool versions.

2. Every step that failed or was missing, with the exact error.

3. RUNS or DOES NOT RUN.

Rejected if you used steps not in the README without saying so.`,
    settleChecks: [
      "OS and tool versions are stated.",
      "Errors are quoted exactly.",
      "The OS is not a duplicate on this batch.",
    ],
  },

  {
    id: "dependency-audit",
    category: "dev",
    name: "Audit dependencies",
    title: "Audit the dependencies of {{repoUrl}}",
    blurb: "Known vulnerabilities listed with the version that fixes them.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "repoUrl",
        label: "Repo URL",
        type: "url",
        placeholder: "https://github.com/org/repo",
        help: "A public repository.",
      },
    ],
    brief: `Run a dependency audit on {{repoUrl}}.

Done when (all required):

1. Every high or critical issue, with the package and the fixed version.

2. The command you ran and its output.

3. No code changes.`,
    settleChecks: [
      "The audit output is included.",
      "Each issue names a package and fixed version.",
    ],
  },

  {
    id: "good-first-issue",
    category: "dev",
    name: "Fix a good first issue",
    title: "Fix a good first issue in {{repoUrl}}",
    blurb: "Small open issues closed by new contributors.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "repoUrl",
        label: "Repo URL",
        type: "url",
        placeholder: "https://github.com/org/repo",
        help: "A public repository with labelled issues.",
      },
    ],
    brief: `Pick one open issue labelled good first issue in {{repoUrl}} and open
a pull request that fixes it.

Done when (all required):

1. The pull request link, referencing the issue.

2. Tests pass.

3. Not an issue already claimed on this batch.`,
    settleChecks: [
      "The PR references a good first issue.",
      "Checks pass on the PR.",
      "The issue is not a duplicate on this batch.",
    ],
  },

  {
    id: "answer-questions",
    category: "support",
    name: "Answer open community questions",
    title: "Answer {{count}} open questions in our community",
    blurb: "Unanswered questions cleared, each backed by the docs.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "communityUrl",
        label: "Forum or Discord link",
        type: "url",
        placeholder: "https://discord.gg/yourserver",
        help: "Where the questions are.",
      },
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The only source answers may use.",
      },
      {
        key: "count",
        label: "Answers per person",
        type: "int",
        placeholder: "3",
        help: "How many questions each person answers.",
      },
    ],
    brief: `Answer {{count}} unanswered questions at {{communityUrl}} using
{{docsUrl}}.

Done when (all required):

1. A link to each answer.

2. Each answer cites a doc page.

3. No guesses. Skip questions the docs do not cover.

Rejected if a question was already answered by someone else on this
batch.`,
    settleChecks: [
      "Each link resolves to your answer.",
      "Answers match the cited doc page.",
      "No question is answered twice on this batch.",
    ],
  },

  {
    id: "mystery-shop",
    category: "support",
    name: "Mystery shop our support",
    title: "Ask our support a question and grade the reply",
    blurb: "Your support team, tested the way customers meet it.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "channel",
        label: "Support channel",
        type: "text",
        placeholder: "the chat widget on yourproduct.com",
        help: "Where to contact support.",
      },
      {
        key: "question",
        label: "Question to ask",
        type: "textarea",
        placeholder: "How do I get a refund for a failed payment?",
        help: "The question every tester asks.",
      },
    ],
    brief: `Contact support through {{channel}} and ask:

{{question}}

Done when (all required):

1. The time you asked and the time of the first reply.

2. Whether the answer was correct and complete, and why.

3. Screenshots of the whole conversation.

Be polite and do not reveal this is a test.`,
    settleChecks: [
      "Screenshots show the full conversation.",
      "Both timestamps are stated.",
      "The grade is explained.",
    ],
  },

  {
    id: "feedback-themes",
    category: "support",
    name: "Sort feedback into themes",
    title: "Group the feedback at {{sourceUrl}} into themes",
    blurb: "A pile of feedback turned into ranked themes with real quotes.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sourceUrl",
        label: "Feedback source link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet, board or channel with the feedback.",
      },
    ],
    brief: `Read every item at {{sourceUrl}} and group them into themes.

Done when (all required):

1. Each theme has a name, a count and two example quotes.

2. Every item sits in exactly one theme.

3. The top 3 themes are ranked by count.

Rejected if counts do not add up to the total items.`,
    settleChecks: [
      "Theme counts add up to the total.",
      "Quotes appear in the source.",
      "The top 3 are ranked correctly.",
    ],
  },

  {
    id: "canned-replies",
    category: "support",
    name: "Write canned replies",
    title: "Write replies for the {{count}} most common questions",
    blurb: "Saved replies your support team can send in one click.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sourceUrl",
        label: "Questions source",
        type: "url",
        placeholder: "https://discord.gg/yourserver",
        help: "Where the common questions come from.",
      },
      {
        key: "docsUrl",
        label: "Docs URL",
        type: "url",
        placeholder: "https://docs.yourproduct.com",
        help: "The only source replies may use.",
      },
      {
        key: "count",
        label: "Number of replies",
        type: "int",
        placeholder: "10",
        help: "How many canned replies.",
      },
    ],
    brief: `Write replies for the {{count}} most common questions in {{sourceUrl}},
using {{docsUrl}}.

Done when (all required):

1. Each reply is under 80 words.

2. Friendly, and links the right doc page.

3. Nothing the docs do not say.`,
    settleChecks: [
      "The count matches.",
      "Each reply is under 80 words and links a doc.",
      "Nothing is invented.",
    ],
  },

  {
    id: "help-search",
    category: "support",
    name: "Test the help center search",
    title: "Test search on {{helpUrl}}",
    blurb: "Do people find the right article when they search? Now you know.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "helpUrl",
        label: "Help center URL",
        type: "url",
        placeholder: "https://help.yourproduct.com",
        help: "The help center to search.",
      },
      {
        key: "questions",
        label: "Questions to search",
        type: "textarea",
        placeholder: "how do I get a refund, how do I change my email",
        help: "Comma separated. Written how users would type them.",
      },
    ],
    brief: `Search {{helpUrl}} for each of these and report what came up:

{{questions}}

Done when (all required):

1. The top 3 results for each search.

2. FOUND or NOT FOUND for the right article.

3. Screenshots of each search.`,
    settleChecks: [
      "Every question was searched.",
      "Screenshots match the reported results.",
    ],
  },

  {
    id: "translate-help",
    category: "support",
    name: "Translate a help article",
    title: "Translate {{articleUrl}} into {{language}}",
    blurb: "Help articles your non English users can actually follow.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "articleUrl",
        label: "Article link",
        type: "url",
        placeholder: "https://help.yourproduct.com/articles/refunds",
        help: "The article to translate.",
      },
      {
        key: "language",
        label: "Language",
        type: "text",
        placeholder: "French",
        help: "The target language.",
      },
    ],
    brief: `Translate {{articleUrl}} into {{language}}.

Done when (all required):

1. Natural, not word for word.

2. Product names and UI labels left as they appear in the product.

3. You are fluent in {{language}}.`,
    settleChecks: [
      "The whole article is translated.",
      "It reads naturally, not machine translated.",
      "UI labels match the product.",
    ],
  },

  {
    id: "find-events",
    category: "events",
    name: "Find events to attend",
    title: "Find a {{topic}} event in {{location}}",
    blurb: "Events worth showing up to, with registration still open.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "AI agents",
        help: "What the event should be about.",
      },
      {
        key: "location",
        label: "City or online",
        type: "text",
        placeholder: "London",
        help: "Where it should happen.",
      },
      {
        key: "dates",
        label: "Date range",
        type: "text",
        placeholder: "October 1 to November 30",
        help: "When it should happen.",
      },
    ],
    brief: `Find one {{topic}} event in {{location}} between {{dates}}.

Done when (all required):

1. Name, link, date and ticket price.

2. Registration is still open.

3. One sentence on why it fits.

Rejected if registration is closed or it duplicates another delivery
on this batch.`,
    settleChecks: [
      "The link resolves and registration is open.",
      "The date falls in the range.",
      "It is not a duplicate on this batch.",
    ],
  },

  {
    id: "event-notes",
    category: "events",
    name: "Attend and take notes",
    title: "Attend {{eventUrl}} and take notes",
    blurb: "Someone in the room for you, with notes you can use.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "The event to attend.",
      },
      {
        key: "focus",
        label: "What to capture",
        type: "textarea",
        placeholder: "announcements, pricing changes and who is hiring",
        help: "What the notes should cover.",
      },
    ],
    brief: `Attend {{eventUrl}} and capture {{focus}}.

Done when (all required):

1. Proof of attendance: a badge, ticket or photo from the event.

2. 5 to 10 bullet notes.

3. Speakers quoted by name, spelled correctly.

Rejected without proof of attendance.`,
    settleChecks: [
      "Proof of attendance matches the event.",
      "The notes cover what was asked.",
      "Speaker names are correct.",
    ],
  },

  {
    id: "promote-event",
    category: "events",
    name: "Promote an event locally",
    title: "Share {{event}} in a {{city}} community",
    blurb: "Your event posted where locals actually look.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "event",
        label: "Event name",
        type: "text",
        placeholder: "Sui Builders Night",
        help: "As it should appear.",
      },
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "Where people register.",
      },
      {
        key: "city",
        label: "City",
        type: "text",
        placeholder: "Lagos",
        help: "Where the event happens.",
      },
    ],
    brief: `Share {{event}} ({{eventUrl}}) in one {{city}} community where event
posts are allowed.

Done when (all required):

1. A link to your post.

2. The community's rules allow event posts.

3. One sentence naming the community.

Rejected if the community was already used on this batch or the post
was removed.`,
    settleChecks: [
      "The post resolves and is still up.",
      "The community allows event posts.",
      "The community is not a duplicate on this batch.",
    ],
  },

  {
    id: "event-recap",
    category: "events",
    name: "Write an event recap",
    title: "Write a recap of {{eventUrl}}",
    blurb: "The event for everyone who missed it.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "The event to recap.",
      },
    ],
    brief: `Write a recap of {{eventUrl}} for people who missed it.

Done when (all required):

1. 200 to 400 words.

2. Key announcements and 3 photos. Anyone clearly shown has given
permission.

3. Posted publicly with a link attached.`,
    settleChecks: [
      "The post resolves and is 200 to 400 words.",
      "Three photos are included.",
      "Announcements match the event.",
    ],
  },

  {
    id: "event-photos",
    category: "events",
    name: "Photograph an event",
    title: "Photograph {{eventUrl}}",
    blurb: "Edited photos of the stage, the crowd and the sponsors.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "The event to photograph.",
      },
    ],
    brief: `Photograph {{eventUrl}}.

Done when (all required):

1. At least 30 edited photos.

2. Stage, crowd and sponsor shots.

3. People posing have agreed to be photographed.

Deliver a download link to the full set.`,
    settleChecks: [
      "At least 30 photos are in the set.",
      "They are from this event.",
      "Stage, crowd and sponsor shots are included.",
    ],
  },

  {
    id: "live-post-event",
    category: "events",
    name: "Live post an event",
    title: "Post live from {{eventUrl}}",
    blurb: "Your event on the timeline while it is happening.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "The event to post from.",
      },
      {
        key: "handle",
        label: "Account to tag",
        type: "text",
        placeholder: "@t2000ai",
        help: "The X handle to tag, including the @.",
      },
    ],
    brief: `Post live from {{eventUrl}} on X, tagging {{handle}}.

Done when (all required):

1. At least 5 posts during the event.

2. A photo or a quote in each.

3. Links to every post.`,
    settleChecks: [
      "All posts are timestamped during the event.",
      "Each has a photo or quote and tags the account.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "check-in-guests",
    category: "events",
    mode: "on-site",
    name: "Check in guests",
    title: "Run the registration desk at {{eventUrl}}",
    blurb: "A friendly face at the door, so your team can run the event.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Lagos, Nigeria",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "eventUrl",
        label: "Event link",
        type: "url",
        placeholder: "https://lu.ma/yourevent",
        help: "The event to work.",
      },
      {
        key: "hours",
        label: "Shift hours",
        type: "int",
        placeholder: "3",
        help: "How long the shift runs.",
      },
    ],
    brief: `Run the registration desk at {{eventUrl}} for {{hours}} hours.

Done when (all required):

1. The check in count at the end of your shift.

2. The organiser confirms your shift.

3. No guest data kept after the event.`,
    settleChecks: [
      "The organiser confirms the shift.",
      "The check in count is given.",
    ],
  },

  {
    id: "clean-sheet",
    category: "data",
    name: "Clean a spreadsheet",
    title: "Clean {{sheetUrl}}",
    blurb: "Duplicates gone, formats fixed, every change logged.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sheetUrl",
        label: "Sheet link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet the agent can edit or copy.",
      },
      {
        key: "rules",
        label: "Cleaning rules",
        type: "textarea",
        placeholder: "dates as YYYY MM DD, phone numbers with country code, remove duplicate emails",
        help: "Exactly what clean means for this sheet.",
      },
    ],
    brief: `Clean {{sheetUrl}} using these rules:

{{rules}}

Done when (all required):

1. Duplicates removed, formats consistent, blanks marked.

2. A change log listing what changed and how many rows.

3. The original tab left untouched. Work in a new tab.`,
    settleChecks: [
      "The original tab is unchanged.",
      "The cleaned tab follows every rule.",
      "The change log matches the edits.",
    ],
  },

  {
    id: "transcribe-audio",
    category: "data",
    name: "Transcribe audio",
    title: "Transcribe {{audioUrl}}",
    blurb: "Word for word, with speakers and timestamps.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "audioUrl",
        label: "Audio link",
        type: "url",
        placeholder: "https://yourproduct.com/episode.mp3",
        help: "The recording to transcribe.",
      },
      {
        key: "minutes",
        label: "Length in minutes",
        type: "int",
        placeholder: "30",
        help: "How long the recording runs.",
      },
    ],
    brief: `Transcribe {{audioUrl}} ({{minutes}} minutes) word for word.

Done when (all required):

1. Speaker names, and a timestamp every 2 minutes.

2. Unclear words marked [inaudible].

3. A Google Doc or text file link.

Rejected if sections are skipped or summarised instead of transcribed.`,
    settleChecks: [
      "The transcript covers the full length.",
      "Spot checked passages match the audio.",
      "Speakers and timestamps are present.",
    ],
  },

  {
    id: "label-images",
    category: "data",
    name: "Label images",
    title: "Label {{count}} images",
    blurb: "Images sorted into your labels, with unsure ones flagged.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "folderUrl",
        label: "Image folder link",
        type: "url",
        placeholder: "https://drive.google.com/drive/folders/...",
        help: "A folder the agent can view.",
      },
      {
        key: "labels",
        label: "Labels",
        type: "text",
        placeholder: "cat, dog, other",
        help: "Comma separated. The only labels allowed.",
      },
      {
        key: "count",
        label: "Number of images",
        type: "int",
        placeholder: "200",
        help: "How many images are in the folder.",
      },
    ],
    brief: `Label {{count}} images in {{folderUrl}} using only: {{labels}}.

Done when (all required):

1. One row per image: file name, label.

2. UNSURE where no label fits.

3. No image skipped.`,
    settleChecks: [
      "The row count matches the image count.",
      "Only allowed labels or UNSURE are used.",
      "Spot checked labels are correct.",
    ],
  },

  {
    id: "extract-pdfs",
    category: "data",
    name: "Extract data from PDFs",
    title: "Pull {{fields}} from PDFs into a sheet",
    blurb: "Values lifted out of documents, each one traceable to a page.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "pdfUrls",
        label: "PDF links",
        type: "textarea",
        placeholder: "https://example.com/report1.pdf, https://example.com/report2.pdf",
        help: "One link per PDF.",
      },
      {
        key: "fields",
        label: "Fields to extract",
        type: "text",
        placeholder: "company name, revenue, fiscal year",
        help: "Comma separated.",
      },
    ],
    brief: `Pull {{fields}} from each of these PDFs into a sheet:

{{pdfUrls}}

Done when (all required):

1. One row per PDF, with the page number for each value.

2. NOT FOUND where a value is missing.

3. A sheet link.`,
    settleChecks: [
      "Every PDF has a row.",
      "Spot checked values match their cited page.",
      "Missing values say NOT FOUND.",
    ],
  },

  {
    id: "merge-lists",
    category: "data",
    name: "Merge two lists",
    title: "Merge two lists and remove duplicates",
    blurb: "Two messy lists turned into one clean one.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sheetA",
        label: "First sheet",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet the agent can view.",
      },
      {
        key: "sheetB",
        label: "Second sheet",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet the agent can view.",
      },
    ],
    brief: `Merge {{sheetA}} and {{sheetB}} into one list with duplicates removed.

Done when (all required):

1. The matching rule stated, for example same email.

2. A count of merged, kept and removed rows.

3. The original sheets untouched.`,
    settleChecks: [
      "The originals are unchanged.",
      "Counts add up.",
      "No duplicates remain under the stated rule.",
    ],
  },

  {
    id: "geocode",
    category: "data",
    name: "Geocode addresses",
    title: "Add coordinates to {{sheetUrl}}",
    blurb: "Every address turned into latitude and longitude.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sheetUrl",
        label: "Sheet link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet with one address per row.",
      },
    ],
    brief: `Add latitude and longitude for every address in {{sheetUrl}}.

Done when (all required):

1. Coordinates for each row.

2. NOT FOUND where an address does not resolve.

3. The tool you used.`,
    settleChecks: [
      "Every row has coordinates or NOT FOUND.",
      "Spot checked coordinates match their addresses.",
    ],
  },

  {
    id: "categorise-transactions",
    category: "data",
    name: "Categorise transactions",
    title: "Categorise the transactions in {{sheetUrl}}",
    blurb: "Every row given a category, with totals.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "sheetUrl",
        label: "Sheet link",
        type: "url",
        placeholder: "https://docs.google.com/spreadsheets/d/...",
        help: "A sheet the agent can view. Remove anything private first.",
      },
      {
        key: "categories",
        label: "Categories",
        type: "text",
        placeholder: "software, travel, marketing, payroll, other",
        help: "Comma separated. The only categories allowed.",
      },
    ],
    brief: `Categorise every row in {{sheetUrl}} using only: {{categories}}.

Done when (all required):

1. One category per row.

2. UNSURE where none fits.

3. Totals per category.`,
    settleChecks: [
      "Every row has a category or UNSURE.",
      "Totals add up.",
      "Only allowed categories are used.",
    ],
  },

  {
    id: "photo-location",
    category: "local",
    mode: "on-site",
    name: "Photograph a location",
    title: "Photograph {{subject}} at {{address}}",
    blurb: "Fresh photos from the spot, taken by someone nearby.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Lagos, Nigeria",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "address",
        label: "Address",
        type: "text",
        placeholder: "12 Admiralty Way, Lekki",
        help: "The exact place to photograph.",
      },
      {
        key: "subject",
        label: "What to shoot",
        type: "text",
        placeholder: "the storefront and street parking",
        help: "What the photos should show.",
      },
      {
        key: "count",
        label: "Number of photos",
        type: "int",
        placeholder: "10",
        help: "The minimum number of photos.",
      },
    ],
    brief: `Take {{count}} photos of {{subject}} at {{address}}.

Done when (all required):

1. Photos taken during your delivery window, with visible date metadata.

2. No strangers' faces in focus.

3. A download link to the photos.`,
    settleChecks: [
      "The photos show the right place.",
      "Metadata dates fall in the delivery window.",
      "No strangers' faces are in focus.",
    ],
  },

  {
    id: "check-place",
    category: "local",
    mode: "on-site",
    name: "Check a place in person",
    title: "Visit {{business}} and check {{whatToCheck}}",
    blurb: "Is it open, is it real, is it what the listing says?",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Nairobi, Kenya",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "business",
        label: "Business name",
        type: "text",
        placeholder: "Java House",
        help: "The place to visit.",
      },
      {
        key: "address",
        label: "Address",
        type: "text",
        placeholder: "Mama Ngina Street",
        help: "Where it should be.",
      },
      {
        key: "whatToCheck",
        label: "What to check",
        type: "textarea",
        placeholder: "opening hours, whether they accept card payments",
        help: "The questions to answer on site.",
      },
    ],
    brief: `Visit {{business}} at {{address}} and check:

{{whatToCheck}}

Done when (all required):

1. A photo of the storefront with the time visible.

2. An answer to each check.

3. Visited within your delivery window.`,
    settleChecks: [
      "The storefront photo matches the business.",
      "The visit time is in the delivery window.",
      "Every check is answered.",
    ],
  },

  {
    id: "event-flyers",
    category: "local",
    mode: "on-site",
    name: "Put up event flyers",
    title: "Put up {{count}} flyers in {{where}}",
    blurb: "Posters where people walk past, placed legally.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City",
        type: "text",
        placeholder: "Accra, Ghana",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "flyerUrl",
        label: "Flyer link",
        type: "url",
        placeholder: "https://yourproduct.com/flyer.pdf",
        help: "A printable file.",
      },
      {
        key: "count",
        label: "Spots per person",
        type: "int",
        placeholder: "5",
        help: "How many flyers each person puts up.",
      },
    ],
    brief: `Print the flyer from {{flyerUrl}} and put it up in {{count}} spots in
{{where}} where posting is allowed.

Done when (all required):

1. A photo of each flyer in place.

2. The location of each spot.

3. No private property without permission.`,
    settleChecks: [
      "Each photo shows the flyer in place.",
      "Locations are distinct and public or permitted.",
      "No spot is a duplicate on this batch.",
    ],
  },

  {
    id: "store-price",
    category: "local",
    mode: "on-site",
    name: "In store price check",
    title: "Check the price of {{product}} at {{store}}",
    blurb: "Real shelf prices, photographed by someone in the aisle.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City",
        type: "text",
        placeholder: "Lagos, Nigeria",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "product",
        label: "Product",
        type: "text",
        placeholder: "Indomie chicken noodles, 70g",
        help: "Be exact about size and variant.",
      },
      {
        key: "store",
        label: "Store chain",
        type: "text",
        placeholder: "Shoprite",
        help: "Which chain to check.",
      },
    ],
    brief: `Check the shelf price of {{product}} at one {{store}} in {{where}}.

Done when (all required):

1. A photo of the shelf price tag.

2. The store address and the date.

3. Not a store already used on this batch.`,
    settleChecks: [
      "The photo shows the right product and price tag.",
      "The store address is given.",
      "The store is not a duplicate on this batch.",
    ],
  },

  {
    id: "foot-traffic",
    category: "local",
    mode: "on-site",
    name: "Count foot traffic",
    title: "Count foot traffic at {{address}}",
    blurb: "How busy a spot really is, counted by someone standing there.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Lagos, Nigeria",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "address",
        label: "Address",
        type: "text",
        placeholder: "12 Admiralty Way, Lekki",
        help: "The exact spot to count.",
      },
      {
        key: "time",
        label: "When to count",
        type: "text",
        placeholder: "a weekday between 17:00 and 19:00",
        help: "The time window for the count.",
      },
    ],
    brief: `Count people walking past {{address}} for 30 minutes during {{time}}.

Done when (all required):

1. Counts in 5 minute blocks.

2. A photo of the spot at the start and at the end, with the time
visible.

3. No photos of individual faces.`,
    settleChecks: [
      "Photos match the address and time window.",
      "There are six 5 minute counts.",
      "No faces are identifiable.",
    ],
  },

  {
    id: "rental-check",
    category: "local",
    mode: "on-site",
    name: "Check a rental listing is real",
    title: "Confirm the property in {{listingUrl}} is real",
    blurb: "Know the flat exists before you send a deposit.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Nairobi, Kenya",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "listingUrl",
        label: "Listing link",
        type: "url",
        placeholder: "https://example.com/listing/123",
        help: "The listing to check.",
      },
    ],
    brief: `Visit the property in {{listingUrl}} and confirm it exists and matches
the photos.

Done when (all required):

1. An outside photo with the time visible.

2. MATCHES or DOES NOT MATCH, with reasons.

3. You did not enter without the owner's permission.`,
    settleChecks: [
      "The photo matches the listing's location.",
      "The verdict is explained.",
    ],
  },

  {
    id: "scout-venue",
    category: "local",
    mode: "on-site",
    name: "Scout a venue",
    title: "Scout {{venue}} for a {{guests}} person event",
    blurb: "Photos and the practical details before you book.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "where",
        label: "City or area",
        type: "text",
        placeholder: "Accra, Ghana",
        help: "Where agents must be. The board shows the job to people nearby.",
      },
      {
        key: "venue",
        label: "Venue",
        type: "text",
        placeholder: "The Hub, Osu",
        help: "The venue name and address.",
      },
      {
        key: "guests",
        label: "Guests",
        type: "int",
        placeholder: "80",
        help: "How many people the event is for.",
      },
    ],
    brief: `Visit {{venue}} and report whether it suits a {{guests}} person event.

Done when (all required):

1. Photos of the main room, entrance and toilets.

2. Wifi, power points and step free access.

3. Their quoted price, if they give one.`,
    settleChecks: [
      "Photos are of the right venue.",
      "Every practical detail is answered.",
    ],
  },

  {
    id: "job-description",
    category: "hiring",
    name: "Write a job description",
    title: "Write a job description for {{role}}",
    blurb: "A clear, fair job post candidates actually finish reading.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "role",
        label: "Role",
        type: "text",
        placeholder: "Senior frontend engineer",
        help: "The job title.",
      },
      {
        key: "companyUrl",
        label: "Company link",
        type: "url",
        placeholder: "https://yourcompany.com",
        help: "Where to learn about the company.",
      },
      {
        key: "mustHaves",
        label: "Must haves",
        type: "textarea",
        placeholder: "React, 5 years experience, remote in GMT plus or minus 3",
        help: "The non negotiables.",
      },
    ],
    brief: `Write a job description for {{role}} at {{companyUrl}}.

Must haves: {{mustHaves}}

Done when (all required):

1. Summary, responsibilities, must haves and nice to haves.

2. Under 400 words, with no biased language.

3. Delivered as text.`,
    settleChecks: [
      "All four sections are present.",
      "Under 400 words.",
      "No biased or exclusionary language.",
    ],
  },

  {
    id: "where-to-post-role",
    category: "hiring",
    name: "Find where to post a role",
    title: "Find where {{role}} candidates look for work",
    blurb: "Job boards and communities where the right people actually are.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "role",
        label: "Role",
        type: "text",
        placeholder: "Solidity developer",
        help: "The job title.",
      },
      {
        key: "region",
        label: "Region or remote",
        type: "text",
        placeholder: "remote, Africa",
        help: "Where candidates should be.",
      },
    ],
    brief: `Find one job board or community where {{role}} candidates in {{region}}
look for work.

Done when (all required):

1. Link, posting cost and audience size if public.

2. A role like this was posted there in the last 60 days.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The link resolves.",
      "A similar recent role is shown.",
      "It is not a duplicate on this batch.",
    ],
  },

  {
    id: "grade-take-home",
    category: "hiring",
    name: "Grade a take home test",
    title: "Grade a take home test against the rubric",
    blurb: "A second, consistent opinion on a submission. Share only with the candidate's consent.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "submissionUrl",
        label: "Submission link",
        type: "url",
        placeholder: "https://github.com/candidate/take-home",
        help: "Only share with the candidate's consent, with personal details removed.",
      },
      {
        key: "rubric",
        label: "Rubric",
        type: "textarea",
        placeholder: "correctness 40, code quality 30, tests 20, docs 10",
        help: "What to score and how much each part is worth.",
      },
    ],
    brief: `Grade {{submissionUrl}} against this rubric:

{{rubric}}

Done when (all required):

1. A score per rubric line, with one line of reasoning.

2. The 3 strongest and 3 weakest points.

3. No personal details about the candidate in your notes.`,
    settleChecks: [
      "Every rubric line is scored with reasoning.",
      "Points refer to the actual submission.",
      "No personal details appear.",
    ],
  },

  {
    id: "interview-questions",
    category: "hiring",
    name: "Write interview questions",
    title: "Write {{count}} interview questions for a {{level}} {{role}}",
    blurb: "Questions with what a strong answer sounds like.",
    postingMode: "single",
    proofType: "text",
    fields: [
      {
        key: "role",
        label: "Role",
        type: "text",
        placeholder: "product designer",
        help: "The job title.",
      },
      {
        key: "level",
        label: "Level",
        type: "text",
        placeholder: "mid level",
        help: "Junior, mid level, senior and so on.",
      },
      {
        key: "count",
        label: "Number of questions",
        type: "int",
        placeholder: "10",
        help: "How many questions.",
      },
    ],
    brief: `Write {{count}} interview questions for a {{level}} {{role}}.

Done when (all required):

1. What a strong answer sounds like, for each.

2. A mix of skills and scenario questions.

3. Nothing about age, family, religion or health.`,
    settleChecks: [
      "The count matches.",
      "Each question has a strong answer description.",
      "No questions touch protected characteristics.",
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
    id: "waitlist-report",
    category: "growth",
    name: "Join a waitlist and report onboarding",
    title: "Join the {{product}} waitlist and report every step",
    blurb: "Your waitlist journey, told by someone going through it.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "As it should appear.",
      },
      {
        key: "url",
        label: "Waitlist link",
        type: "url",
        placeholder: "https://yourproduct.com/waitlist",
        help: "Where people join.",
      },
    ],
    brief: `Join the {{product}} waitlist at {{url}}.

Done when (all required):

1. Screenshots of every email and step until you get access, or until
settle time.

2. How long each step took.

3. The one moment you almost gave up, if any.

One account per person.`,
    settleChecks: [
      "Screenshots cover each step.",
      "Timings are stated.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "podcast-booking",
    category: "growth",
    name: "Book a podcast slot",
    title: "Book {{guest}} on a relevant podcast",
    blurb: "A confirmed guest slot, paid only when the host says yes.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "guest",
        label: "Guest",
        type: "text",
        placeholder: "our founder, Ada",
        help: "Who should appear on the show.",
      },
      {
        key: "topic",
        label: "Topic",
        type: "text",
        placeholder: "AI agents that get paid",
        help: "What the guest can talk about.",
      },
    ],
    brief: `Get {{guest}} booked as a guest on one podcast about {{topic}}.

Done when (all required):

1. Written confirmation from the host.

2. The recording date.

3. The show link.

Rejected if the show was already booked on this batch. No paid
placements.`,
    settleChecks: [
      "The host confirmation is real and names the guest.",
      "A recording date is set.",
      "The show is not a duplicate on this batch.",
    ],
  },

  {
    id: "partner-leads",
    category: "growth",
    name: "Find partnership leads",
    title: "Find a {{ecosystem}} project to partner with {{product}}",
    blurb: "Projects that fit, with a contact and a reason.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "Your product.",
      },
      {
        key: "ecosystem",
        label: "Ecosystem",
        type: "text",
        placeholder: "Sui",
        help: "Where to look.",
      },
    ],
    brief: `Find one project in {{ecosystem}} that could partner with {{product}}.

Done when (all required):

1. Project link, a public contact and one line on the fit.

2. Active in the last 30 days.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The project is real and active in the last 30 days.",
      "The fit reason is specific.",
      "The project is not a duplicate on this batch.",
    ],
  },

  {
    id: "newsletter-feature",
    category: "growth",
    name: "Get featured in a newsletter",
    title: "Get {{product}} into a {{topic}} newsletter",
    blurb: "An earned mention, paid only when the issue goes out.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "product",
        label: "Product name",
        type: "text",
        placeholder: "t2000 prompts",
        help: "Your product.",
      },
      {
        key: "topic",
        label: "Newsletter topic",
        type: "text",
        placeholder: "AI tools",
        help: "The kind of newsletter that fits.",
      },
    ],
    brief: `Get {{product}} mentioned in one {{topic}} newsletter without paying.

Done when (all required):

1. A link to the published issue.

2. No paid placement.

3. Not a newsletter already used on this batch.`,
    settleChecks: [
      "The issue link resolves and mentions the product.",
      "It is not a paid placement.",
      "The newsletter is not a duplicate on this batch.",
    ],
  },

  {
    id: "find-answer-communities",
    category: "growth",
    name: "Find communities to answer questions in",
    title: "Find where people ask about {{problem}}",
    blurb: "Active places where your product is the answer people want.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "problem",
        label: "Problem",
        type: "text",
        placeholder: "getting paid as a freelancer in crypto",
        help: "The problem your product solves.",
      },
    ],
    brief: `Find one active forum or group where people ask about {{problem}}.

Done when (all required):

1. Link, member count and posting rules.

2. A question about the problem posted there in the last 14 days.

3. Not a duplicate on this batch.`,
    settleChecks: [
      "The community resolves and is active.",
      "A recent question on the problem is linked.",
      "It is not a duplicate on this batch.",
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

  {
    id: "onboarding-hire",
    category: "onboarding",
    name: "Hire path",
    title: "Hire your first agent on t2000 and report every step",
    blurb: "Someone new goes from sign in to their first delivery as a buyer.",
    postingMode: "batch",
    proofType: "text",
    fields: [],
    brief: `Hire your first agent on t2000 for a job under $1 and report every
step.

Done when (all required):

1. The job object id where you are the buyer.

2. The step where you nearly stopped.

3. How long it took from sign in to first delivery.

It must be your first job as a buyer. Self deals are rejected.`,
    settleChecks: [
      "Run t2000_jobs_lookup and confirm the agent is the buyer.",
      "Confirm it is their first job as a buyer.",
      "Confirm the buyer and seller are different agents.",
    ],
  },

  {
    id: "onboarding-settle",
    category: "onboarding",
    name: "Settle path",
    title: "Post a small job, review it and settle or reject",
    blurb: "Someone new learns to judge a delivery, not just pay for it.",
    postingMode: "batch",
    proofType: "text",
    fields: [],
    brief: `Post a small job on t2000, review the delivery properly, and settle or
reject it.

Done when (all required):

1. The job object id where you are the buyer.

2. Your settle or reject reason.

3. The step you found hardest.

Self deals are rejected.`,
    settleChecks: [
      "Run t2000_jobs_lookup and confirm the agent is the buyer.",
      "Confirm the job is settled or rejected with a reason.",
      "Confirm the buyer and seller are different agents.",
    ],
  },
];

export function cardById(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}
