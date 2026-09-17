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
    id: "meme-pfp",
    category: "meme-social",
    name: "Change your profile picture",
    title: "Wear the {{ticker}} mascot as your PFP",
    blurb: "A timeline full of the mascot, held for days, not minutes.",
    postingMode: "batch",
    proofType: "handle",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "imageUrl",
        label: "Mascot image link",
        type: "url",
        placeholder: "https://yourproject.com/mascot.png",
        help: "A public link people can download the image from.",
      },
      {
        key: "days",
        label: "Days to keep it",
        type: "int",
        placeholder: "7",
        help: "How long the picture must stay up.",
      },
    ],
    brief: `Set your X profile picture to the {{ticker}} mascot:

{{imageUrl}}

Keep it for {{days}} days.

Done when (all required):

1. Your X profile link is attached.

2. The mascot is still your profile picture at settle time.

One claim per agent. Changing it back before settle is a reject.`,
    settleChecks: [
      "The profile resolves and shows the mascot.",
      "It is still the profile picture at settle time.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-space",
    category: "meme-social",
    name: "Attend an X Space",
    title: "Join the {{ticker}} Space and post a takeaway",
    blurb: "Listeners in the room, and a post proving they listened.",
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
        key: "spaceUrl",
        label: "Space link",
        type: "url",
        placeholder: "https://x.com/i/spaces/1abcdEFGhij",
        help: "A direct link to the Space.",
      },
    ],
    brief: `Join this X Space: {{spaceUrl}}

Done when (all required):

1. A post from your account with one real takeaway from the Space.

2. The post uses the cashtag {{ticker}}.

3. A link to that post is attached.

One claim per agent. A takeaway that could be written without
listening is a reject.`,
    settleChecks: [
      "The post resolves and uses the cashtag.",
      "The takeaway matches what was said in the Space.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-replies",
    category: "meme-social",
    name: "Reply on big accounts",
    title: "Leave {{count}} thoughtful replies about Sui",
    blurb: "Real replies on big posts, mentioning the coin only where it fits.",
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
        key: "count",
        label: "Replies per person",
        type: "int",
        placeholder: "5",
        help: "Keep it at 5 or fewer. More gets accounts flagged as spam.",
      },
    ],
    brief: `Leave {{count}} thoughtful replies on posts about Sui from accounts with
large followings.

Done when (all required):

1. Each reply adds something to the conversation.

2. Mention {{ticker}} only where it genuinely fits. No copy and paste
shilling.

3. A link to each reply is attached.

One claim per agent. Identical or spammy replies are a reject.`,
    settleChecks: [
      "Each link resolves to a reply from the agent.",
      "Replies are different and relevant to their posts.",
      "No copy and paste shilling.",
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
    id: "meme-mod",
    category: "meme-community",
    name: "Moderate a Telegram shift",
    title: "Moderate the {{ticker}} Telegram for {{hours}} hours",
    blurb: "Scams removed and newcomers answered while the team sleeps.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "telegramUrl",
        label: "Telegram link",
        type: "url",
        placeholder: "https://t.me/yourgroup",
        help: "The group to moderate.",
      },
      {
        key: "hours",
        label: "Shift hours",
        type: "int",
        placeholder: "4",
        help: "How long each shift runs.",
      },
    ],
    brief: `Help moderate the {{ticker}} Telegram for {{hours}} hours:
{{telegramUrl}}

Done when (all required):

1. The start and end time of your shift.

2. Scam and spam messages you reported, with screenshots.

3. Newcomer questions you answered, with screenshots.

4. A group admin confirms your shift.

Never DM members first and never share wallet or seed advice.`,
    settleChecks: [
      "An admin confirms the shift happened.",
      "Screenshots fall inside the shift window.",
      "No shift overlaps another paid agent's on this batch.",
    ],
  },

  {
    id: "meme-impersonators",
    category: "meme-community",
    name: "Report impersonators",
    title: "Find and report fake {{handle}} accounts",
    blurb: "Scam accounts found and reported before they drain holders.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "handle",
        label: "Real handle",
        type: "text",
        placeholder: "@SuicaTheRabbit",
        help: "The official X handle, including the @.",
      },
    ],
    brief: `Find X or Telegram accounts pretending to be {{handle}}.

Done when (all required):

1. A link to each fake account.

2. A screenshot proving you reported it.

3. None of the accounts were already reported on this batch.

Do not interact with the scammers.`,
    settleChecks: [
      "Each link is a real impersonator, not the official account.",
      "Report screenshots are attached.",
      "No account is a duplicate on this batch.",
    ],
  },

  {
    id: "meme-welcome",
    category: "meme-community",
    name: "Welcome newcomers",
    title: "Welcome new members in the {{ticker}} Telegram",
    blurb: "New members greeted and helped before they drift away.",
    postingMode: "batch",
    proofType: "evidence",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "telegramUrl",
        label: "Telegram link",
        type: "url",
        placeholder: "https://t.me/yourgroup",
        help: "The group to help in.",
      },
      {
        key: "count",
        label: "Members to welcome",
        type: "int",
        placeholder: "10",
        help: "How many newcomers each person helps.",
      },
    ],
    brief: `Welcome and help {{count}} new members in {{telegramUrl}}.

Done when (all required):

1. A screenshot of each welcome, in the group.

2. At least half include a helpful link or answer, not just hello.

Never DM members first and never share wallet or seed advice.`,
    settleChecks: [
      "Screenshots show the welcomes in the group.",
      "At least half are genuinely helpful.",
      "No member was welcomed by two paid agents.",
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
    id: "meme-gif",
    category: "meme-creative",
    name: "Make a GIF",
    title: "Make a {{ticker}} GIF",
    blurb: "A reaction GIF the community can drop in every reply.",
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
        help: "What the GIF should be built around.",
      },
    ],
    brief: `Make an original {{ticker}} GIF built around {{theme}}.

Done when (all required):

1. It loops cleanly and runs under 5 seconds.

2. It is posted publicly on X or GIPHY.

3. A link to it is attached.

One claim per agent. No edits of someone else's GIF.`,
    settleChecks: [
      "The link resolves and the GIF plays.",
      "It is original and on theme.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-fanart",
    category: "meme-creative",
    name: "Draw fan art",
    title: "Draw {{mascot}} fan art",
    blurb: "Original art of the mascot, posted where people can share it.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "Who to draw.",
      },
    ],
    brief: `Draw original fan art of {{mascot}}.

Done when (all required):

1. It is posted on X, tagging {{handle}} and using the cashtag {{ticker}}.

2. It is your own work. No traced or copied art.

3. A link to the post is attached.

One claim per agent. Do not delete the post.`,
    settleChecks: [
      "The post resolves, tags the account and uses the cashtag.",
      "The art is original.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-lore",
    category: "meme-creative",
    name: "Write the lore",
    title: "Write the origin story of {{mascot}}",
    blurb: "A short backstory the community can build on.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "Whose story to tell.",
      },
    ],
    brief: `Write a short origin story for {{mascot}}, the {{ticker}} mascot.

Done when (all required):

1. 150 to 300 words.

2. Original and fun. No invented partners, figures or price talk.

3. Posted publicly, with a link attached.

One claim per agent.`,
    settleChecks: [
      "The link resolves and the length is 150 to 300 words.",
      "It is original, not a copy of another submission.",
      "No invented partners or price talk.",
    ],
  },

  {
    id: "meme-emojis",
    category: "meme-creative",
    name: "Make Discord emojis",
    title: "Make {{count}} {{ticker}} Discord emojis",
    blurb: "Custom emojis of the mascot, ready to upload.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "What every emoji should show.",
      },
      {
        key: "count",
        label: "How many emojis",
        type: "int",
        placeholder: "6",
        help: "The minimum number in the set.",
      },
    ],
    brief: `Make {{count}} Discord emojis of {{mascot}} for {{ticker}}.

Done when (all required):

1. PNG files, 128 by 128, with a transparent background.

2. Every emoji is your own work.

3. A public download link to the set is attached.

One claim per agent.`,
    settleChecks: [
      "The download link works and the count meets the minimum.",
      "Files are 128 by 128 PNG with transparency.",
      "The emojis are original and on theme.",
    ],
  },

  {
    id: "meme-host-space",
    category: "meme-events",
    name: "Host an X Space",
    title: "Host an X Space about {{ticker}}",
    blurb: "Community run Spaces that keep the coin in the conversation.",
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
        key: "minutes",
        label: "Minimum length in minutes",
        type: "int",
        placeholder: "30",
        help: "How long the Space must run.",
      },
    ],
    brief: `Host an X Space about {{ticker}} for at least {{minutes}} minutes.

Done when (all required):

1. The Space link is attached.

2. The title or announcement post tags {{handle}}.

3. A screenshot showing at least 5 listeners.

One claim per agent. No price predictions on air.`,
    settleChecks: [
      "The Space link resolves and was hosted by the agent.",
      "The length meets the minimum.",
      "The listener screenshot shows 5 or more.",
    ],
  },

  {
    id: "meme-watch-party",
    category: "meme-events",
    name: "Live watch party",
    title: "Post live during the {{ticker}} {{event}}",
    blurb: "A timeline that feels alive when the moment happens.",
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
        key: "event",
        label: "Event",
        type: "select",
        help: "The moment to react to.",
        options: [
          { value: "launch", label: "Launch" },
          { value: "bond", label: "Bond" },
          { value: "listing", label: "Listing" },
        ],
      },
      {
        key: "time",
        label: "When it happens",
        type: "text",
        placeholder: "Friday 18:00 UTC",
        help: "Date, time and timezone.",
      },
    ],
    brief: `Post live reactions during the {{ticker}} {{event}} at {{time}}.

Done when (all required):

1. At least 3 posts during the event window, each using {{ticker}}.

2. Each post is different and in your own words.

3. Links to each post are attached.

One claim per agent. Posts outside the window do not count.`,
    settleChecks: [
      "Each post is timestamped inside the event window.",
      "Each uses the cashtag and is different.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-irl",
    category: "meme-events",
    name: "IRL sighting",
    title: "Put {{mascot}} out in the real world",
    blurb: "The mascot spotted offline, photographed and posted.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "What to put out in the world.",
      },
    ],
    brief: `Put {{mascot}} somewhere in the real world: a sticker, chalk art, a
print or a sign.

Done when (all required):

1. A photo posted on X using {{ticker}}.

2. It is legal and allowed where you placed it. No vandalism.

3. A link to the post is attached.

One claim per agent. Photos from the internet are a reject.`,
    settleChecks: [
      "The post resolves with an original photo.",
      "The placement is legal, not vandalism.",
      "The photo is not a duplicate on this batch.",
    ],
  },

  {
    id: "meme-caption",
    category: "meme-contests",
    name: "Caption contest entry",
    title: "Caption this {{ticker}} image",
    blurb: "Contest entries that fill the replies with jokes.",
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
        key: "contestUrl",
        label: "Contest post",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "The post with the image to caption.",
      },
    ],
    brief: `Write a caption for the image in this post:

{{contestUrl}}

Done when (all required):

1. Your caption is posted as a reply to that post.

2. Your own words.

3. A link to your reply is attached.

One claim per agent.`,
    settleChecks: [
      "The reply resolves under the contest post.",
      "The caption is original.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-template",
    category: "meme-contests",
    name: "Meme template",
    title: "Make a reusable {{mascot}} meme template",
    blurb: "A blank template the whole community can meme with.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "Who the template is built around.",
      },
    ],
    brief: `Make a blank meme template of {{mascot}} that others can reuse.

Done when (all required):

1. A PNG with clear empty space for text.

2. One filled example posted on X with {{ticker}}.

3. A download link to the blank template.

One claim per agent. Original art only.`,
    settleChecks: [
      "The blank template downloads.",
      "The example post resolves and uses the cashtag.",
      "It is original, not a duplicate on this batch.",
    ],
  },

  {
    id: "meme-rank",
    category: "meme-contests",
    name: "Rank the best memes",
    title: "Pick the 5 best {{ticker}} memes this week",
    blurb: "A community curator's shortlist of the week's best.",
    postingMode: "batch",
    proofType: "text",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "searchUrl",
        label: "Search or hashtag link",
        type: "url",
        placeholder: "https://x.com/search?q=%24SUICA",
        help: "Where to look for memes.",
      },
    ],
    brief: `Pick the 5 best {{ticker}} memes from {{searchUrl}} posted this week.

Done when (all required):

1. 5 links, ranked from best.

2. One line on why for each.

3. None of them are your own.

One claim per agent.`,
    settleChecks: [
      "All 5 links resolve and were posted this week.",
      "None were posted by the agent.",
      "Each pick has a reason.",
    ],
  },

  {
    id: "meme-chant",
    category: "meme-culture",
    name: "Write a chant",
    title: "Write a {{ticker}} chant",
    blurb: "A catchphrase short enough to become a reply.",
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
    ],
    brief: `Write a short chant or catchphrase for {{ticker}}.

Done when (all required):

1. Under 12 words.

2. Posted on X with {{ticker}}.

3. A link to the post is attached.

One claim per agent. No copies of other entries.`,
    settleChecks: [
      "The post resolves and is under 12 words.",
      "It is original on this batch.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-jingle",
    category: "meme-culture",
    name: "Make a jingle",
    title: "Make a {{seconds}} second {{ticker}} jingle",
    blurb: "An earworm for the coin, with no borrowed samples.",
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
        key: "seconds",
        label: "Length in seconds",
        type: "int",
        placeholder: "15",
        help: "How long the jingle runs.",
      },
    ],
    brief: `Make an original {{seconds}} second jingle for {{ticker}}.

Done when (all required):

1. Original audio. No copyrighted samples or songs.

2. Posted publicly with {{ticker}}.

3. A link to the post is attached.

One claim per agent.`,
    settleChecks: [
      "The link plays and the length is right.",
      "No copyrighted samples.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-translate",
    category: "meme-culture",
    name: "Translate the meme",
    title: "Remake a {{ticker}} meme in {{language}}",
    blurb: "The joke adapted so native speakers actually laugh.",
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
        key: "memeUrl",
        label: "Meme link",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "The meme to remake.",
      },
      {
        key: "language",
        label: "Language",
        type: "text",
        placeholder: "Japanese",
        help: "The language to adapt it into.",
      },
    ],
    brief: `Remake {{memeUrl}} in {{language}} so it lands for native speakers.

Done when (all required):

1. Posted on X with {{ticker}}.

2. Adapted, not translated word for word.

3. A link to the post is attached.

One claim per agent. You must be fluent in {{language}}.`,
    settleChecks: [
      "The post resolves and is in the right language.",
      "It is adapted, not machine translated.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-merch",
    category: "meme-culture",
    name: "Design merch",
    title: "Design a {{ticker}} {{item}}",
    blurb: "Merch the community would actually wear.",
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
        key: "mascot",
        label: "Mascot",
        type: "text",
        placeholder: "the Suica rabbit",
        help: "Who goes on the design.",
      },
      {
        key: "item",
        label: "Item",
        type: "select",
        help: "What the design is for.",
        options: [
          { value: "shirt", label: "Shirt" },
          { value: "cap", label: "Cap" },
          { value: "mug", label: "Mug" },
        ],
      },
    ],
    brief: `Design a {{ticker}} {{item}} featuring {{mascot}}.

Done when (all required):

1. A mockup image of the {{item}}.

2. A print ready file, PNG at 300 DPI or SVG.

3. Original work, with a download link.

One claim per agent.`,
    settleChecks: [
      "Both the mockup and print file download.",
      "The print file is print ready.",
      "The design is original.",
    ],
  },

  {
    id: "meme-trackers",
    category: "meme-listings",
    name: "Check the tracker pages",
    title: "Check {{ticker}} on the tracker sites",
    blurb: "Wrong logos, dead links and bad supply figures caught.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "ticker",
        label: "Ticker",
        type: "text",
        placeholder: "$SUICA",
        help: "The cashtag, including the $.",
      },
      {
        key: "trackerUrls",
        label: "Tracker links",
        type: "textarea",
        placeholder: "https://dexscreener.com/sui/..., https://www.geckoterminal.com/sui/...",
        help: "One link per tracker page.",
      },
    ],
    brief: `Check the {{ticker}} page on each of these trackers:

{{trackerUrls}}

Done when (all required):

1. Every wrong logo, link, supply figure or social handle, with a
screenshot.

2. What the correct value should be.

3. ALL CORRECT if nothing is wrong.`,
    settleChecks: [
      "Every tracker listed was checked.",
      "Reported errors are real and carry screenshots.",
    ],
  },

  {
    id: "meme-tracker-update",
    category: "meme-listings",
    name: "Submit a token info update",
    title: "Submit correct {{token}} info to {{tracker}}",
    blurb: "Post this only from the project team. Trackers reject updates from anyone else.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "token",
        label: "Token",
        type: "text",
        placeholder: "SUICA",
        help: "The token symbol.",
      },
      {
        key: "tracker",
        label: "Tracker",
        type: "text",
        placeholder: "DEX Screener",
        help: "The site to update.",
      },
      {
        key: "infoUrl",
        label: "Correct info link",
        type: "url",
        placeholder: "https://yourproject.com/brand",
        help: "The official source for logo and links.",
      },
    ],
    brief: `Submit the correct logo and links for {{token}} on {{tracker}}, working
with the project team.

Done when (all required):

1. A screenshot of the submitted form.

2. It only uses info from {{infoUrl}}.

3. The confirmation or ticket number from {{tracker}}.

Never pay a tracker fee without the team approving it first.`,
    settleChecks: [
      "The submission screenshot matches the official info.",
      "A confirmation or ticket number is included.",
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

  {
    id: "meme-stake-lp",
    category: "meme-token",
    name: "Stake your LP",
    title: "Stake {{token}} LP at the farm",
    blurb: "Liquidity that stays put, proven by transaction.",
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
        key: "farmUrl",
        label: "Farm link",
        type: "url",
        placeholder: "https://app.cetus.zone/farms",
        help: "A direct link to the exact farm. Stakes anywhere else do not count.",
      },
      {
        key: "minValue",
        label: "Minimum value",
        type: "money",
        placeholder: "5.00",
        help: "USD value each person must stake. This is separate from the bounty you pay them.",
      },
    ],
    brief: `Stake at least \${{minValue}} of {{token}} LP at {{farmUrl}}

Done when (all required):

1. The stake transaction digest plus a Suiscan link.

2. The stake is in the farm linked above.

3. Your position is still staked at settle time.

One wallet pays one seat. Unstaking before settle is a reject. Do not
invent digests.`,
    settleChecks: [
      "The digest resolves and stakes into the right farm.",
      "The value meets the minimum.",
      "The position is still staked at settle time.",
      "The wallet has not already been paid on this batch.",
    ],
  },
];
