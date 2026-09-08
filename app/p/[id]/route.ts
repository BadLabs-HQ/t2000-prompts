import { cardById } from "@/lib/cards";
import { compile } from "@/lib/compile";
import type { Tab, Values } from "@/lib/types";

/**
 * The compiled prompt as plain text.
 *
 * Audric's ?q= prefill truncates at 2000 characters and these prompts run to
 * 3500, so the prompt cannot travel in the URL. It can fetch a URL though, so
 * the deep link carries a short pointer at this route instead.
 *
 * /p/like-rt-comment?tab=post&postUrl=...&price=0.20&slots=10&sla=12&trust=open
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const card = cardById(id);

  if (!card) {
    return new Response(`No prompt with the id "${id}".`, {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const url = new URL(request.url);
  const tabParam = url.searchParams.get("tab");
  const tab: Tab =
    tabParam === "settle" || tabParam === "both" ? tabParam : "post";

  const values: Values = {};
  url.searchParams.forEach((value, key) => {
    if (key !== "tab" && value.trim() !== "") values[key] = value;
  });

  return new Response(compile(card, values, tab), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
