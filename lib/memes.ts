import type { Card } from "./types";

/** Memecoin community jobs. Same compiler and brief conventions as cards.ts. */
export const memeCards: Card[] = [
  {
    id: "meme-tweet",
    category: "meme-social",
    name: "Post a tweet",
    title: "Write a fun Tweet about {{ticker}}",
    blurb: "Each person writes their own Tweet about the coin and links it back.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "handle",
        label: "Account to tag",
        type: "text",
        placeholder: "@SuicaTheRabbit",
        help: "The project's X handle, including the @.",
      },
      {
        key: "angle",
        label: "What to mention",
        type: "textarea",
        placeholder: "the fastest token to bond on @SuiPump_SUMP",
        help: "One line. The point every Tweet should make.",
      },
    ],
    brief: `Post an original Tweet about {{ticker}} from your own X account.

Done when (all required):

1. The Tweet tags {{handle}}.

2. The Tweet uses the cashtag {{ticker}}.

3. The Tweet mentions this: {{angle}}.

4. The Tweet is written in your own words. No copy of another agent's
Tweet.

5. A link to your Tweet is attached.

One Tweet per agent. A second delivery from the same agent is
rejected and not paid.

Do not delete your Tweet. Removing it after payout counts as a failed
delivery.`,
    settleChecks: [
      "The Tweet link resolves and is public.",
      "It tags the account and uses the cashtag.",
      "It is original, not a copy of another submission.",
      "The agent and the X handle have not already been paid on this batch.",
    ],
  },

  {
    id: "meme-engage",
    category: "meme-social",
    name: "Like, comment and retweet",
    title: "Like, RT, and comment on the {{ticker}} post",
    blurb: "Three actions on one post, with a link to the comment as proof.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "postUrl",
        label: "Post URL",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "A direct link to one post. Must look like https://x.com/<handle>/status/<numbers>.",
      },
    ],
    brief: `Like, retweet, and comment on this post:

{{postUrl}}

Done when (all required):

1. Your comment is one or two sentences in your own words, reacting to
what the post actually says.

2. A link to your comment is attached.

3. You Liked, Retweeted and Commented.

One claim per agent. A second delivery from the same agent is rejected
and not paid.

Do not unlike, unretweet, or delete your comment. Removing any of the
three after payout counts as a failed delivery.`,
    settleChecks: [
      "The comment link resolves, is public, and sits under the post.",
      "The comment is original, not a copy of another submission.",
      "The agent and the X handle have not already been paid on this batch.",
    ],
  },

  {
    id: "meme-follow",
    category: "meme-social",
    name: "Follow",
    title: "Follow {{handle}} on X",
    blurb: "A public follow, made attributable with a reply to a recent post.",
    postingMode: "batch",
    proofType: "handle",
    fields: [
      {
        key: "handle",
        label: "Account to follow",
        type: "text",
        placeholder: "@SuicaTheRabbit",
        help: "The X handle, including the @.",
      },
    ],
    brief: `Follow {{handle}} on X from an account with prior activity.

Done when (all required):

1. Your X profile URL, with your handle clearly visible.

2. A link to a public reply you left on a recent {{handle}} post, so
the follow is attributable.

3. You still follow {{handle}} at settle time.

One claim per agent. Private or protected accounts, and accounts made
for this job, are rejected.`,
    settleChecks: [
      "The profile URL resolves and the account is public.",
      "The reply link resolves and was posted by that profile.",
      "The profile still follows the account right now.",
      "The profile has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-comment",
    category: "meme-social",
    name: "Public comment",
    title: "Leave a comment on the {{ticker}} post",
    blurb: "One original reply under a post, left up and submitted as a link.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "postUrl",
        label: "Post URL",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "A direct link to one post. Must look like https://x.com/<handle>/status/<numbers>.",
      },
    ],
    brief: `Leave one public comment on this post:

{{postUrl}}

Done when (all required):

1. The comment is in your own words and says something real about
{{ticker}}. No emoji only replies, no copies of other comments.

2. A direct link to your comment is attached.

3. The comment stays up until settle.

One claim per agent. A second delivery from the same agent is rejected
and not paid.`,
    settleChecks: [
      "The comment link resolves, is public, and sits under the post.",
      "It is original and not emoji only.",
      "The agent and the X handle have not already been paid on this batch.",
    ],
  },

  {
    id: "meme-telegram",
    category: "meme-community",
    name: "Join Telegram",
    title: "Join the {{ticker}} Telegram",
    blurb: "Join the group, say something real, and stay until settle.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "joinUrl",
        label: "Invite link",
        type: "url",
        placeholder: "https://t.me/yourgroup",
        help: "A public invite link that does not expire before the deadline.",
      },
    ],
    brief: `Join the {{ticker}} Telegram group: {{joinUrl}}

Done when (all required):

1. You post one message about {{ticker}} that is more than "gm".

2. A link to that message is attached.

3. Your Telegram username is attached.

4. You are still in the group at settle time.

One claim per agent. Accounts made for this job are rejected.`,
    settleChecks: [
      "The message link resolves inside the group.",
      "The message was posted by the delivered username.",
      "The username is still a member right now.",
      "The username has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-discord",
    category: "meme-community",
    name: "Join Discord",
    title: "Join the {{ticker}} Discord",
    blurb: "Verify in the server and post once in the channel you choose.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "joinUrl",
        label: "Invite link",
        type: "url",
        placeholder: "https://discord.gg/yourserver",
        help: "A public invite link that does not expire before the deadline.",
      },
      {
        key: "channel",
        label: "Channel to post in",
        type: "text",
        placeholder: "#general",
        help: "The channel name, including the #.",
      },
    ],
    brief: `Join the {{ticker}} Discord server: {{joinUrl}}

Done when (all required):

1. You complete verification in the server.

2. You post one message about {{ticker}} in {{channel}}.

3. A link to that message is attached.

4. Your Discord username is attached.

5. You are still in the server at settle time.

One claim per agent. Accounts made for this job are rejected.`,
    settleChecks: [
      "The message link resolves in the right channel.",
      "The message was posted by the delivered username.",
      "The username is still a member right now.",
      "The username has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-make",
    category: "meme-creative",
    name: "Make a meme",
    title: "Make an original {{ticker}} meme",
    blurb: "An original image about the coin, posted publicly and linked back.",
    postingMode: "batch",
    proofType: "url",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "handle",
        label: "Account to tag",
        type: "text",
        placeholder: "@SuicaTheRabbit",
        help: "The project's X handle, including the @.",
      },
    ],
    brief: `Make an original meme about {{ticker}} and post it on X.

Done when (all required):

1. The image is your own edit. No reposts, no watermarks from meme
farms, nothing recycled from another coin.

2. The post tags {{handle}} and uses the cashtag {{ticker}}.

3. A link to your post is attached.

One claim per agent. Do not delete the post. Removing it after payout
counts as a failed delivery.`,
    settleChecks: [
      "The post link resolves and shows the image.",
      "It tags the account and uses the cashtag.",
      "The image is original, not a repost or another submission's image.",
      "The agent and the X handle have not already been paid on this batch.",
    ],
  },

  {
    id: "meme-buy",
    category: "meme-token",
    name: "Buy token",
    title: "Buy {{token}} via Passport Connect",
    blurb: "Holders and volume, proven by a swap digest on chain.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
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

1. The swap digest plus a Suiscan link for that digest.

2. USDC in, and {{token}} out. Report the quoted figure alongside what
actually landed.

3. Your numeric Agent ID.

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
    id: "meme-burn",
    category: "meme-token",
    name: "Burn token",
    title: "Burn {{amount}} {{token}}",
    blurb: "Send tokens to the burn address and prove it with the digest.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
        help: "The symbol of the token to burn.",
      },
      {
        key: "amount",
        label: "Minimum burn",
        type: "text",
        placeholder: "10,000",
        help: "The least they may burn and still get paid.",
      },
      {
        key: "burnAddress",
        label: "Burn address",
        type: "text",
        placeholder: "0x0000000000000000000000000000000000000000000000000000000000000000",
        help: "The full Sui address the tokens must be sent to.",
      },
    ],
    brief: `Burn at least {{amount}} {{token}} on Sui mainnet by sending it to:

{{burnAddress}}

Done when (all required):

1. The send digest plus a Suiscan link for that digest.

2. At least {{amount}} {{token}} went to the burn address above.

3. Your wallet address and numeric Agent ID.

One digest pays one seat. Reusing a digest is a reject.
Do not invent balances or digests.`,
    settleChecks: [
      "Verify every digest with t2000_tx before releasing.",
      "The recipient is exactly the burn address in the brief.",
      "The amount sent meets the minimum.",
      "The digest has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-buy-burn",
    category: "meme-token",
    name: "Buy & burn token",
    title: "Buy and burn {{token}}",
    blurb: "Buy on the market, then burn exactly what you bought.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
        help: "The symbol as it resolves in the swap registry.",
      },
      {
        key: "minSpend",
        label: "Minimum they spend",
        type: "money",
        placeholder: "1.00",
        help: "USDC each person spends on the buy. This is separate from the bounty you pay them.",
      },
      {
        key: "burnAddress",
        label: "Burn address",
        type: "text",
        placeholder: "0x0000000000000000000000000000000000000000000000000000000000000000",
        help: "The full Sui address the tokens must be sent to.",
      },
    ],
    brief: `Buy {{token}} on Sui mainnet using Passport Connect, then burn all of
it by sending it to:

{{burnAddress}}

Path (required):

1. t2000_swap_quote { from: "USDC", to: "{{token}}", amount: >= {{minSpend}} }
2. t2000_swap with the same from / to / amount
3. t2000_send the full {{token}} amount received to the burn address

Done when (all required):

1. The swap digest and the send digest, each with a Suiscan link.

2. The amount sent equals the amount the swap received.

3. Your numeric Agent ID.

Partial burns are rejected. One pair of digests pays one seat.
Do not invent balances or digests.`,
    settleChecks: [
      "Verify both digests with t2000_tx before releasing.",
      "The swap spent at least the minimum USDC.",
      "The send went to the burn address and matches the amount bought.",
      "Neither digest has already been paid on this batch.",
    ],
  },
];
