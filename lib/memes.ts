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
    id: "meme-quote",
    category: "meme-social",
    name: "Quote tweet with a take",
    title: "Quote {{ticker}} with your take",
    blurb: "A quote post that adds an opinion, not just a retweet.",
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
    brief: `Quote this post from your own X account:

{{postUrl}}

Done when (all required):

1. Your quote adds your own opinion about {{ticker}} in one or two
sentences. A bare retweet or emoji only is not a take.

2. Your quote uses the cashtag {{ticker}}.

3. A link to your quote post is attached.

One claim per agent. Do not delete your quote. Removing it after
payout counts as a failed delivery.`,
    settleChecks: [
      "The link resolves and quotes the right post.",
      "It contains a real opinion and the cashtag.",
      "It is not a copy of another submission.",
      "The X handle has not already been paid on this batch.",
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
    id: "meme-thread",
    category: "meme-creative",
    name: "Write a thread",
    title: "Write an X thread about {{ticker}}",
    blurb: "Four to six posts that explain the coin, in your own words.",
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
        label: "What the thread explains",
        type: "textarea",
        placeholder: "why Suica is the fastest token to bond on @SuiPump_SUMP",
        help: "One line. The story the thread should tell.",
      },
    ],
    brief: `Write an original X thread about {{ticker}} from your own account.

Done when (all required):

1. The thread has 4 to 6 posts.

2. It explains this: {{angle}}.

3. The first post tags {{handle}} and uses the cashtag {{ticker}}.

4. Your own words. No invented figures, partners or price predictions.

5. A link to the first post of the thread is attached.

One claim per agent. Do not delete the thread.`,
    settleChecks: [
      "The thread resolves and has 4 to 6 posts.",
      "It covers the angle and tags the account.",
      "No invented figures or price predictions.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-video",
    category: "meme-creative",
    name: "Make a short video",
    title: "Make a short {{ticker}} video",
    blurb: "A 10 to 30 second original clip, posted publicly and linked back.",
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
        key: "platform",
        label: "Platform",
        type: "select",
        help: "Where the video must be posted.",
        options: [
          { value: "X", label: "X" },
          { value: "TikTok", label: "TikTok" },
        ],
      },
    ],
    brief: `Make an original video about {{ticker}} and post it on {{platform}}.

Done when (all required):

1. The video runs 10 to 30 seconds.

2. It is your own edit. No reposts of someone else's video.

3. The caption tags {{handle}} and uses the cashtag {{ticker}}.

4. A link to your post is attached.

One claim per agent. Do not delete the post.`,
    settleChecks: [
      "The link resolves and the video plays.",
      "Length is 10 to 30 seconds.",
      "It is original, not a repost.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-stickers",
    category: "meme-creative",
    name: "Make a sticker pack",
    title: "Make a {{ticker}} Telegram sticker pack",
    blurb: "A public Telegram sticker set the whole community can add.",
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
        key: "theme",
        label: "Mascot or theme",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "What every sticker should be built around.",
      },
      {
        key: "count",
        label: "How many stickers",
        type: "int",
        placeholder: "8",
        help: "The minimum number of stickers in the pack.",
      },
    ],
    brief: `Make a Telegram sticker pack for {{ticker}} built around {{theme}}.

Done when (all required):

1. The pack has at least {{count}} stickers.

2. Every sticker is your own work. No stickers lifted from other packs.

3. The pack is public and anyone can add it.

4. The t.me/addstickers link to the pack is attached.

One claim per agent.`,
    settleChecks: [
      "The addstickers link opens and the pack can be added.",
      "The sticker count meets the minimum.",
      "The stickers are original and on theme.",
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

  {
    id: "meme-liquidity",
    category: "meme-token",
    name: "Add liquidity",
    title: "Add {{token}} liquidity on {{dex}}",
    blurb: "A real liquidity position in your pool, proven by transaction.",
    postingMode: "batch",
    proofType: "digest",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
        help: "The symbol of the token in the pool.",
      },
      {
        key: "dex",
        label: "DEX",
        type: "text",
        placeholder: "Cetus",
        help: "The Sui DEX the pool lives on.",
      },
      {
        key: "poolUrl",
        label: "Pool link",
        type: "url",
        placeholder: "https://app.cetus.zone/liquidity",
        help: "A direct link to the exact pool. Liquidity in any other pool does not count.",
      },
      {
        key: "minLiquidity",
        label: "Minimum liquidity",
        type: "money",
        placeholder: "5.00",
        help: "USD value each person must add. This is separate from the bounty you pay them.",
      },
    ],
    brief: `Add at least \${{minLiquidity}} of liquidity to the {{token}} pool on
{{dex}}: {{poolUrl}}

Done when (all required):

1. The add liquidity transaction digest plus a Suiscan link.

2. The position is in the pool linked above, not another pool.

3. Your wallet still holds the position at settle time.

One wallet pays one seat. Pulling the liquidity before settle is a
reject. Do not invent digests.`,
    settleChecks: [
      "The digest resolves and adds to the right pool.",
      "The value meets the minimum.",
      "The position still exists at settle time.",
      "The wallet has not already been paid on this batch.",
    ],
  },
];
