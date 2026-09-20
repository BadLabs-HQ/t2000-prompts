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

One job at a time. Deliver before you claim another. A second delivery from the same agent is rejected
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

One job at a time. Deliver before you claim another. Private or protected accounts, and accounts made
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

One job at a time. Deliver before you claim another. A second delivery from the same agent is rejected
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

One job at a time. Deliver before you claim another. Do not delete your quote. Removing it after
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

One job at a time. Deliver before you claim another. Changing it back before settle is a reject.`,
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

One job at a time. Deliver before you claim another. A takeaway that could be written without
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

One job at a time. Deliver before you claim another. Identical or spammy replies are a reject.`,
    settleChecks: [
      "Each link resolves to a reply from the agent.",
      "Replies are different and relevant to their posts.",
      "No copy and paste shilling.",
    ],
  },

  {
    id: "meme-pin",
    category: "meme-social",
    name: "Pin a post",
    title: "Pin a {{ticker}} post to your profile",
    blurb: "The coin at the top of every profile visit.",
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
        key: "days",
        label: "Days to keep it pinned",
        type: "int",
        placeholder: "7",
        help: "How long the post must stay pinned.",
      },
    ],
    brief: `Pin one of your own {{ticker}} posts to your X profile for {{days}} days.

Done when (all required):

1. Your X profile link is attached.

2. The pinned post uses {{ticker}}.

3. It is still pinned at settle time.

One job at a time. Deliver before you claim another. Unpinning before settle is a reject.`,
    settleChecks: [
      "The profile shows a pinned post with the cashtag.",
      "It is still pinned at settle time.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-name",
    category: "meme-social",
    name: "Ticker in your name",
    title: "Add {{ticker}} to your X display name",
    blurb: "The cashtag next to every reply you leave.",
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
        key: "days",
        label: "Days to keep it",
        type: "int",
        placeholder: "7",
        help: "How long it must stay in the name.",
      },
    ],
    brief: `Add {{ticker}} to your X display name for {{days}} days.

Done when (all required):

1. Your X profile link is attached.

2. {{ticker}} is still in your display name at settle time.

One job at a time. Deliver before you claim another. Removing it before settle is a reject.`,
    settleChecks: [
      "The display name contains the cashtag.",
      "It is still there at settle time.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-spotlight",
    category: "meme-social",
    name: "Community spotlight",
    title: "Spotlight a {{ticker}} creator",
    blurb: "Credit where it is due, with the creator's blessing.",
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
    brief: `Post a spotlight of one {{ticker}} creator's work, with their
permission.

Done when (all required):

1. The post credits and tags the creator.

2. A screenshot of their permission.

3. A link to the post.

One job at a time. Deliver before you claim another. You cannot spotlight yourself.`,
    settleChecks: [
      "The post resolves and credits the creator.",
      "Permission is shown.",
      "The creator is not a duplicate on this batch.",
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

One job at a time. Deliver before you claim another. Accounts made for this job are rejected.`,
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

One job at a time. Deliver before you claim another. Accounts made for this job are rejected.`,
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
    id: "meme-trivia",
    category: "meme-community",
    name: "Run a trivia quiz",
    title: "Run a {{ticker}} trivia quiz in Telegram",
    blurb: "Five questions that get the group talking.",
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
        help: "The group to run it in.",
      },
    ],
    brief: `Run a 5 question {{ticker}} trivia quiz in {{telegramUrl}}. Get admin
approval before you start.

Done when (all required):

1. The questions and answers.

2. Screenshots of the quiz and member replies.

3. An admin confirms it ran.

No price questions and no prizes you cannot pay.`,
    settleChecks: [
      "An admin confirms the quiz ran.",
      "Screenshots show replies from members.",
      "No quiz overlaps another paid agent's on this batch.",
    ],
  },

  {
    id: "meme-discord-test",
    category: "meme-community",
    name: "Test the Discord onboarding",
    title: "Join the {{ticker}} Discord and report every confusing step",
    blurb: "Fresh eyes on your server, from invite to first message.",
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
        key: "discordUrl",
        label: "Discord invite",
        type: "url",
        placeholder: "https://discord.gg/yourserver",
        help: "The invite new members use.",
      },
    ],
    brief: `Join {{discordUrl}} as a new member and report every confusing step.

Done when (all required):

1. Screenshots from the invite to your first message.

2. Any broken roles, bots or channels.

3. How long until you could post.

One job at a time. Deliver before you claim another. Accounts already in the server do not count.`,
    settleChecks: [
      "The account is new to the server.",
      "Screenshots cover invite to first message.",
      "The Discord account has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-collect-questions",
    category: "meme-community",
    name: "Collect community questions",
    title: "Collect this week's questions from the {{ticker}} Telegram",
    blurb: "What holders keep asking, gathered for the team.",
    postingMode: "single",
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
        key: "telegramUrl",
        label: "Telegram link",
        type: "url",
        placeholder: "https://t.me/yourgroup",
        help: "The group to read.",
      },
    ],
    brief: `Collect 15 real questions asked in {{telegramUrl}} this week.

Done when (all required):

1. Exact quotes, with no usernames.

2. Grouped by topic.

3. Each question marked ANSWERED or UNANSWERED.`,
    settleChecks: [
      "Questions are real and from this week.",
      "No usernames are included.",
      "Each has an answered status.",
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

One job at a time. Deliver before you claim another. Do not delete the post. Removing it after payout
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

One job at a time. Deliver before you claim another. Do not delete the thread.`,
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

One job at a time. Deliver before you claim another. Do not delete the post.`,
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

One job at a time. Deliver before you claim another.`,
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

One job at a time. Deliver before you claim another. No edits of someone else's GIF.`,
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

One job at a time. Deliver before you claim another. Do not delete the post.`,
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

One job at a time. Deliver before you claim another.`,
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

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The download link works and the count meets the minimum.",
      "Files are 128 by 128 PNG with transparency.",
      "The emojis are original and on theme.",
    ],
  },

  {
    id: "meme-comic",
    category: "meme-creative",
    name: "Comic strip",
    title: "Draw a {{mascot}} comic strip",
    blurb: "A short comic starring the mascot.",
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
        help: "The star of the comic.",
      },
    ],
    brief: `Draw a 3 or 4 panel comic starring {{mascot}}.

Done when (all required):

1. Posted on X with {{ticker}}.

2. Original art.

3. A link to the post is attached.

One job at a time. Deliver before you claim another. Do not delete the post.`,
    settleChecks: [
      "The post resolves with 3 or 4 panels.",
      "The art is original.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-pixel",
    category: "meme-creative",
    name: "Pixel art",
    title: "Make pixel art of {{mascot}}",
    blurb: "The mascot in pixels, ready for avatars and games.",
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
        help: "What to draw.",
      },
    ],
    brief: `Make pixel art of {{mascot}}.

Done when (all required):

1. A PNG at 64 by 64 or larger, scaled without blur.

2. Posted with {{ticker}}.

3. A link to the post is attached.

One job at a time. Deliver before you claim another. Original art only.`,
    settleChecks: [
      "The image is real pixel art and scaled cleanly.",
      "The post uses the cashtag.",
      "The art is original.",
    ],
  },

  {
    id: "meme-wallpaper",
    category: "meme-creative",
    name: "Phone wallpaper",
    title: "Make a {{ticker}} phone wallpaper",
    blurb: "The mascot on lock screens everywhere.",
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
    brief: `Make a {{ticker}} phone wallpaper.

Done when (all required):

1. A 1080 by 2340 PNG.

2. Original art.

3. A public download link.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The download works and the size is 1080 by 2340.",
      "The art is original.",
    ],
  },

  {
    id: "meme-remix",
    category: "meme-creative",
    name: "Remix a trending format",
    title: "Remix this week's trending meme for {{ticker}}",
    blurb: "Ride the format everyone is already sharing.",
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
    brief: `Remix a meme format trending this week into a {{ticker}} meme.

Done when (all required):

1. A link to an example of the original format.

2. Your remix posted with {{ticker}}.

3. A link to your post.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The original format is linked and recent.",
      "The remix post resolves and uses the cashtag.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-game",
    category: "meme-creative",
    name: "Make a mini game",
    title: "Make a browser game starring {{mascot}}",
    blurb: "A tiny game the community can play and share.",
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
        help: "The star of the game.",
      },
    ],
    brief: `Make a simple browser game starring {{mascot}} for {{ticker}}.

Done when (all required):

1. Playable at a public link.

2. Original art, or free licensed assets that are credited.

3. No wallet connection and no payments.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The game loads and is playable.",
      "It never asks for a wallet or payment.",
      "Assets are original or credited.",
    ],
  },

  {
    id: "meme-3d",
    category: "meme-creative",
    name: "3D mascot render",
    title: "Make a 3D render of {{mascot}}",
    blurb: "The mascot in three dimensions.",
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
        help: "What to model.",
      },
    ],
    brief: `Make a 3D render of {{mascot}}.

Done when (all required):

1. A PNG render plus the model file.

2. Original work.

3. Posted with {{ticker}}, with a link attached.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The render and model file both download.",
      "The work is original.",
      "The post uses the cashtag.",
    ],
  },

  {
    id: "meme-cosplay",
    category: "meme-creative",
    name: "Cosplay the mascot",
    title: "Dress up as {{mascot}}",
    blurb: "The mascot in real life, costume and all.",
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
        help: "Who to dress up as.",
      },
    ],
    brief: `Dress up as {{mascot}} and post a photo.

Done when (all required):

1. A handmade or assembled costume, not a filter.

2. Posted with {{ticker}}.

3. A link to the post.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The photo shows a real costume, not a filter.",
      "The post uses the cashtag.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-animated-sticker",
    category: "meme-creative",
    name: "Animated Telegram sticker",
    title: "Make an animated {{mascot}} Telegram sticker",
    blurb: "The mascot moving in every chat.",
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
        help: "What to animate.",
      },
    ],
    brief: `Make an animated Telegram sticker of {{mascot}} for {{ticker}}.

Done when (all required):

1. It meets Telegram's animated or video sticker format.

2. It is added to a public pack.

3. The t.me/addstickers link is attached.

One job at a time. Deliver before you claim another. Original art only.`,
    settleChecks: [
      "The pack opens and the sticker animates.",
      "The art is original.",
    ],
  },

  {
    id: "meme-colouring",
    category: "meme-creative",
    name: "Colouring page",
    title: "Draw a {{mascot}} colouring page",
    blurb: "A printable page for the youngest fans.",
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
        help: "What to draw.",
      },
    ],
    brief: `Draw a printable colouring page of {{mascot}} for {{ticker}}.

Done when (all required):

1. An A4 PNG or PDF with clean black lines.

2. Original art.

3. A download link.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The file downloads at A4 size.",
      "Lines are clean and printable.",
      "The art is original.",
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

One job at a time. Deliver before you claim another. No price predictions on air.`,
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

One job at a time. Deliver before you claim another. Posts outside the window do not count.`,
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

One job at a time. Deliver before you claim another. Photos from the internet are a reject.`,
    settleChecks: [
      "The post resolves with an original photo.",
      "The placement is legal, not vandalism.",
      "The photo is not a duplicate on this batch.",
    ],
  },

  {
    id: "meme-countdown",
    category: "meme-events",
    name: "Countdown posts",
    title: "Count down to the {{ticker}} {{event}}",
    blurb: "A daily drumbeat before the big moment.",
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
        type: "text",
        placeholder: "launch",
        help: "What you are counting down to.",
      },
      {
        key: "days",
        label: "Days",
        type: "int",
        placeholder: "5",
        help: "How many daily posts.",
      },
    ],
    brief: `Post a daily countdown to the {{ticker}} {{event}} for {{days}} days.

Done when (all required):

1. One post per day, each different and using {{ticker}}.

2. Links to every post are attached.

One job at a time. Deliver before you claim another. Missed days are a reject.`,
    settleChecks: [
      "There is one post for each day.",
      "Posts are different and use the cashtag.",
      "The X handle has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-call-notes",
    category: "meme-events",
    name: "Community call notes",
    title: "Take notes on the {{ticker}} community call",
    blurb: "The call summed up for everyone who missed it.",
    postingMode: "single",
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
        key: "time",
        label: "When the call happens",
        type: "text",
        placeholder: "Friday 18:00 UTC",
        help: "Date, time and timezone.",
      },
    ],
    brief: `Take notes during the {{ticker}} community call at {{time}}.

Done when (all required):

1. 5 to 10 bullets, with who said what.

2. Any announcements quoted exactly.

3. Delivered within 12 hours of the call.`,
    settleChecks: [
      "The notes match the call.",
      "Announcements are quoted exactly.",
      "Delivered within 12 hours.",
    ],
  },

  {
    id: "meme-collage",
    category: "meme-events",
    name: "Anniversary collage",
    title: "Make a {{ticker}} best memes collage",
    blurb: "The community's greatest hits in one image.",
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
        key: "months",
        label: "Months to cover",
        type: "int",
        placeholder: "12",
        help: "How far back to look.",
      },
    ],
    brief: `Make a collage of the best {{ticker}} memes from the last {{months}}
months.

Done when (all required):

1. At least 12 memes, with the creators credited.

2. Posted with {{ticker}}.

3. A link to the post.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The collage has at least 12 memes.",
      "Creators are credited.",
      "The X handle has not already been paid on this batch.",
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

One job at a time. Deliver before you claim another.`,
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

One job at a time. Deliver before you claim another. Original art only.`,
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

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "All 5 links resolve and were posted this week.",
      "None were posted by the agent.",
      "Each pick has a reason.",
    ],
  },

  {
    id: "meme-trivia-write",
    category: "meme-contests",
    name: "Write trivia questions",
    title: "Write 10 {{ticker}} trivia questions",
    blurb: "A ready made quiz, every answer backed by a source.",
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
        key: "sourceUrl",
        label: "Source link",
        type: "url",
        placeholder: "https://yourproject.com",
        help: "Where the answers must come from.",
      },
    ],
    brief: `Write 10 {{ticker}} trivia questions with answers.

Done when (all required):

1. Every answer is backed by {{sourceUrl}}.

2. No price questions.

3. A mix of easy and hard.

One job at a time. Deliver before you claim another. Copies of another submission are a reject.`,
    settleChecks: [
      "There are 10 questions with answers.",
      "Answers match the source.",
      "No price questions.",
    ],
  },

  {
    id: "meme-judge",
    category: "meme-contests",
    name: "Judge a meme contest",
    title: "Score the entries in the {{ticker}} meme contest",
    blurb: "An outside judge scoring every entry.",
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
        key: "contestUrl",
        label: "Contest post",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "The post where entries were submitted.",
      },
    ],
    brief: `Score every entry in {{contestUrl}} from 1 to 10.

Done when (all required):

1. A score and one line of reasoning per entry.

2. The top 3 ranked.

3. You did not enter the contest.`,
    settleChecks: [
      "Every entry is scored.",
      "The judge did not enter.",
      "The top 3 follow from the scores.",
    ],
  },

  {
    id: "meme-battle",
    category: "meme-contests",
    name: "Host a meme battle",
    title: "Host a {{ticker}} meme battle in Telegram",
    blurb: "A live battle that floods the group with fresh memes.",
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
        help: "The group to host it in.",
      },
    ],
    brief: `Host a live meme battle in {{telegramUrl}}. Get admin approval before
you start.

Done when (all required):

1. At least 5 entries.

2. Screenshots of the battle.

3. The winner announced in the group.

No prizes you cannot pay.`,
    settleChecks: [
      "An admin confirms the battle ran.",
      "Screenshots show at least 5 entries.",
      "No battle overlaps another paid agent's on this batch.",
    ],
  },

  {
    id: "meme-contest-poster",
    category: "meme-contests",
    name: "Contest poster",
    title: "Design the {{ticker}} {{contest}} poster",
    blurb: "The rules, dates and prize on one shareable poster.",
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
        key: "contest",
        label: "Contest name",
        type: "text",
        placeholder: "meme contest",
        help: "What the contest is called.",
      },
      {
        key: "rulesUrl",
        label: "Rules link",
        type: "url",
        placeholder: "https://x.com/handle/status/123456789",
        help: "Where the official rules are.",
      },
    ],
    brief: `Design the poster for the {{ticker}} {{contest}}.

Done when (all required):

1. Shows the rules, dates and prize exactly as in {{rulesUrl}}.

2. A 1080 by 1350 PNG.

3. A download link.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "Rules, dates and prize match the source.",
      "The PNG is 1080 by 1350.",
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

One job at a time. Deliver before you claim another. No copies of other entries.`,
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

One job at a time. Deliver before you claim another.`,
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

One job at a time. Deliver before you claim another. You must be fluent in {{language}}.`,
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

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "Both the mockup and print file download.",
      "The print file is print ready.",
      "The design is original.",
    ],
  },

  {
    id: "meme-glossary",
    category: "meme-culture",
    name: "Community glossary",
    title: "Write the {{ticker}} community glossary",
    blurb: "The in jokes explained for newcomers.",
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
    brief: `Write a glossary of 10 slang terms the {{ticker}} community uses.

Done when (all required):

1. Each term has a one line meaning and a link to a post using it.

2. Posted publicly.

3. A link to the glossary is attached.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "There are 10 terms, each with a meaning and example link.",
      "Example links resolve.",
      "It is not a copy of another submission.",
    ],
  },

  {
    id: "meme-rap",
    category: "meme-culture",
    name: "Write a rap verse",
    title: "Write and record a 16 bar {{ticker}} verse",
    blurb: "Bars about the coin, recorded and posted.",
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
    brief: `Write and record a 16 bar {{ticker}} verse.

Done when (all required):

1. Original lyrics. The beat is original or free licensed and credited.

2. Posted with {{ticker}}.

3. A link to the post.

One job at a time. Deliver before you claim another. No price predictions in the lyrics.`,
    settleChecks: [
      "The recording plays and has about 16 bars.",
      "The beat is original or credited.",
      "The account has not already been paid on this batch.",
    ],
  },

  {
    id: "meme-side-characters",
    category: "meme-culture",
    name: "Mascot's friends",
    title: "Invent 3 friends for {{mascot}}",
    blurb: "New characters to grow the lore.",
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
        help: "Whose world to build on.",
      },
    ],
    brief: `Invent 3 side characters for the {{mascot}} universe.

Done when (all required):

1. Name, look and personality for each.

2. A sketch of at least one.

3. Posted with {{ticker}}, with a link attached.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "Three characters with all details.",
      "At least one sketch.",
      "It is not a copy of another submission.",
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
    id: "meme-link-audit",
    category: "meme-listings",
    name: "Link audit",
    title: "Check every {{ticker}} link",
    blurb: "Dead links in the bio, site and group caught before holders find them.",
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
    ],
    brief: `Check every link in the {{ticker}} X bio, website, Linktree and
Telegram description.

Done when (all required):

1. WORKS or BROKEN per link.

2. A screenshot of each broken link.

3. Where each link lives.`,
    settleChecks: [
      "Every source was checked.",
      "Broken links really fail.",
    ],
  },

  {
    id: "meme-burn-tracker",
    category: "meme-listings",
    name: "Burn tracker",
    title: "Total every {{token}} burn to date",
    blurb: "Every burn in one sheet, each row linked on chain.",
    postingMode: "single",
    proofType: "url",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
        help: "The token that was burned.",
      },
      {
        key: "burnAddress",
        label: "Burn address",
        type: "text",
        placeholder: "0x0",
        help: "Where burned tokens were sent.",
      },
    ],
    brief: `Total every {{token}} burn sent to {{burnAddress}} to date.

Done when (all required):

1. A sheet with each digest, amount and date.

2. The running total.

3. A Suiscan link for every row.`,
    settleChecks: [
      "Spot checked digests resolve with the right amounts.",
      "The running total adds up.",
    ],
  },

  {
    id: "meme-holders",
    category: "meme-listings",
    name: "Holder snapshot",
    title: "Snapshot the {{token}} holders",
    blurb: "Holder count and concentration, dated and labelled.",
    postingMode: "single",
    proofType: "evidence",
    fields: [
      {
        key: "token",
        label: "Token symbol",
        type: "text",
        placeholder: "SUICA",
        help: "The token to snapshot.",
      },
    ],
    brief: `Record the {{token}} holder count and top 10 share from Suiscan.

Done when (all required):

1. A dated screenshot of the holder count.

2. The percentage held by the top 10 holders.

3. Exchange and pool wallets labelled where known.`,
    settleChecks: [
      "The screenshot is dated and matches Suiscan.",
      "The top 10 share adds up.",
    ],
  },

  {
    id: "meme-wallet-search",
    category: "meme-listings",
    name: "Wallet search check",
    title: "Check {{ticker}} shows up right in wallet search",
    blurb: "Make sure holders find the real token, not a fake.",
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
        key: "wallets",
        label: "Wallets",
        type: "text",
        placeholder: "Slush, Suiet, Phantom",
        help: "Comma separated.",
      },
    ],
    brief: `Search {{ticker}} in each of these wallets: {{wallets}}.

Done when (all required):

1. A screenshot per wallet.

2. CORRECT, WRONG TOKEN or NOT FOUND for each.

3. The contract address shown, if any.

No balances or seed phrases visible.`,
    settleChecks: [
      "Every wallet was checked.",
      "Results match the screenshots.",
      "No private data is visible.",
    ],
  },

  {
    id: "meme-ca-check",
    category: "meme-safety",
    name: "Verify the contract address",
    title: "Verify the {{ticker}} contract address everywhere",
    blurb: "One wrong address can drain holders. Catch it first.",
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
        key: "ca",
        label: "Official contract address",
        type: "text",
        placeholder: "0x...::suica::SUICA",
        help: "The full, official coin type.",
      },
      {
        key: "sites",
        label: "Sites to check",
        type: "textarea",
        placeholder: "website, X bio, Telegram, DEX Screener, Cetus",
        help: "Every place the address appears.",
      },
    ],
    brief: `Check that each of these shows the official {{ticker}} contract
address:

{{sites}}

Official address: {{ca}}

Done when (all required):

1. MATCH or WRONG per site, with a screenshot.

2. Every WRONG address reported to the team.

Never buy or send funds to test an address.`,
    settleChecks: [
      "Every site listed was checked.",
      "WRONG results are real and carry screenshots.",
    ],
  },

  {
    id: "meme-scam-sweep",
    category: "meme-safety",
    name: "Scam link sweep",
    title: "Sweep the {{ticker}} groups for scam links",
    blurb: "Fake airdrops and drainer links flagged for the admins.",
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
        key: "links",
        label: "Telegram and Discord links",
        type: "textarea",
        placeholder: "https://t.me/yourgroup, https://discord.gg/yourserver",
        help: "The groups to sweep.",
      },
    ],
    brief: `Scroll the last 24 hours of these groups and flag every scam link or
fake airdrop:

{{links}}

Done when (all required):

1. A screenshot of each scam message.

2. Proof you reported it to the admins.

Never click the scam links.`,
    settleChecks: [
      "Each screenshot shows a real scam message.",
      "Reports to admins are shown.",
      "No message is a duplicate on this batch.",
    ],
  },

  {
    id: "meme-safety-post",
    category: "meme-safety",
    name: "Write a safety pinned post",
    title: "Write the {{ticker}} safety pinned post",
    blurb: "Official links and common scams in one post the team can pin.",
    postingMode: "single",
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
        key: "officialLinks",
        label: "Official links",
        type: "textarea",
        placeholder: "https://yourproject.com, https://x.com/SuicaTheRabbit, https://t.me/yourgroup",
        help: "The only links the post may include.",
      },
    ],
    brief: `Write a short pinned post listing the only official {{ticker}} links and
the most common scams.

Official links: {{officialLinks}}

Done when (all required):

1. Under 120 words.

2. Only uses the official links above.

3. Delivered as text for the team to pin.`,
    settleChecks: [
      "Under 120 words.",
      "Every link is from the official list.",
      "Scam warnings are accurate.",
    ],
  },

  {
    id: "meme-airdrop-thread",
    category: "meme-safety",
    name: "Spot a fake airdrop thread",
    title: "Write a thread on spotting fake {{ticker}} airdrops",
    blurb: "Holders taught to recognise drainers before they click.",
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
        key: "officialLinks",
        label: "Official links",
        type: "textarea",
        placeholder: "https://yourproject.com, https://x.com/SuicaTheRabbit",
        help: "The only links the thread may include.",
      },
    ],
    brief: `Write an X thread showing how to spot fake {{ticker}} airdrops.

Done when (all required):

1. 4 to 6 posts.

2. Real scam screenshots, with the scam links blurred.

3. Only official links from: {{officialLinks}}

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "The thread resolves with 4 to 6 posts.",
      "Scam links are blurred.",
      "Only official links appear.",
    ],
  },

  {
    id: "meme-admin-list",
    category: "meme-safety",
    name: "Official admin list",
    title: "Draft the {{ticker}} official admin list",
    blurb: "One pinned post that makes fake admins obvious.",
    postingMode: "single",
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
        key: "adminList",
        label: "Real admins",
        type: "textarea",
        placeholder: "@admin1, @admin2, @admin3",
        help: "The only handles the post may list.",
      },
    ],
    brief: `Draft a pinned post listing the real {{ticker}} admins and saying that
admins never DM first.

Real admins: {{adminList}}

Done when (all required):

1. Only handles from the list above.

2. Under 80 words.

3. Delivered as text for the team to pin.`,
    settleChecks: [
      "Only listed handles appear.",
      "Under 80 words.",
      "It says admins never DM first.",
    ],
  },

  {
    id: "meme-buy-guide",
    category: "meme-guides",
    name: "How to buy guide",
    title: "Write a how to buy {{ticker}} guide",
    blurb: "Every step from wallet to swap, with screenshots.",
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
        key: "dexUrl",
        label: "DEX link",
        type: "url",
        placeholder: "https://app.cetus.zone/swap",
        help: "Where the guide should show buying.",
      },
    ],
    brief: `Make a step by step guide to buying {{ticker}} on {{dexUrl}}.

Done when (all required):

1. Screenshots for every step, from wallet setup to swap.

2. A warning to check the official contract address.

3. Posted publicly, with a link attached.

No seed phrases, private keys or balances visible.`,
    settleChecks: [
      "Every step has a screenshot.",
      "The contract address warning is present.",
      "No private data is visible.",
    ],
  },

  {
    id: "meme-explain",
    category: "meme-guides",
    name: "Explain it simply",
    title: "Explain {{ticker}} in under 100 words",
    blurb: "The coin explained for someone new to crypto.",
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
        key: "sourceUrl",
        label: "Official source link",
        type: "url",
        placeholder: "https://yourproject.com",
        help: "The only source of facts.",
      },
    ],
    brief: `Explain what {{ticker}} is in under 100 words for someone new to
crypto.

Done when (all required):

1. Only facts from {{sourceUrl}}.

2. No price predictions.

3. Posted publicly, with a link attached.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "Under 100 words.",
      "Facts match the source.",
      "No price predictions.",
    ],
  },

  {
    id: "meme-bonding",
    category: "meme-guides",
    name: "Explain the bonding curve",
    title: "Explain how {{ticker}} bonded",
    blurb: "The launchpad mechanics, in words anyone gets.",
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
        key: "launchpadUrl",
        label: "Launchpad docs link",
        type: "url",
        placeholder: "https://suipump.example/docs",
        help: "The launchpad's own explanation.",
      },
    ],
    brief: `Explain how {{ticker}} bonding worked, in plain language, using
{{launchpadUrl}}.

Done when (all required):

1. Under 150 words, or a 4 post thread.

2. Only facts from the launchpad docs.

3. Posted publicly, with a link attached.

One job at a time. Deliver before you claim another. No price predictions.`,
    settleChecks: [
      "The explanation matches the launchpad docs.",
      "The length fits.",
      "No price predictions.",
    ],
  },

  {
    id: "meme-newcomer-faq",
    category: "meme-guides",
    name: "Newcomer FAQ",
    title: "Write the {{ticker}} newcomer FAQ",
    blurb: "Eight answers that save the mods a hundred replies.",
    postingMode: "single",
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
        key: "sourceUrl",
        label: "Official source link",
        type: "url",
        placeholder: "https://yourproject.com",
        help: "The only source of facts.",
      },
    ],
    brief: `Write 8 questions new {{ticker}} holders ask, with answers.

Done when (all required):

1. Answers only from {{sourceUrl}}.

2. Includes where to find the official contract address.

3. Delivered as text for the team.`,
    settleChecks: [
      "There are 8 questions with answers.",
      "Answers match the source.",
      "The contract address question is included.",
    ],
  },

  {
    id: "meme-space-clips",
    category: "meme-media",
    name: "Clip Space highlights",
    title: "Clip the best moments from the {{ticker}} Space",
    blurb: "An hour of audio turned into shareable clips.",
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
        label: "Space recording link",
        type: "url",
        placeholder: "https://x.com/i/spaces/1abcdEFGhij",
        help: "A recorded Space.",
      },
      {
        key: "count",
        label: "Number of clips",
        type: "int",
        placeholder: "3",
        help: "How many clips each person makes.",
      },
    ],
    brief: `Cut {{count}} clips under 60 seconds from {{spaceUrl}}.

Done when (all required):

1. Captions on every clip.

2. Posted with {{ticker}}, crediting the speakers.

3. Links to each clip.

One job at a time. Deliver before you claim another.`,
    settleChecks: [
      "Each clip is under 60 seconds and captioned.",
      "Speakers are credited.",
      "Clips are not duplicates of another submission.",
    ],
  },

  {
    id: "meme-skit",
    category: "meme-media",
    name: "Voice a mascot skit",
    title: "Voice {{mascot}} in a short skit",
    blurb: "Give the mascot a voice people remember.",
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
        help: "Who to voice.",
      },
    ],
    brief: `Record a 15 to 45 second skit voicing {{mascot}}.

Done when (all required):

1. Original script and your own voice.

2. Posted with {{ticker}}.

3. A link to the post.

One job at a time. Deliver before you claim another. No price talk.`,
    settleChecks: [
      "The recording is 15 to 45 seconds.",
      "The script and voice are original.",
      "The account has not already been paid on this batch.",
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
