import type { Metadata } from "next";
import { MemesPage } from "@/components/MemesPage";

export const metadata: Metadata = {
  title: "Memes · t2000 prompts",
  description:
    "Memecoin community prompts. Pick one, fill in the ticker and links, and paste it into your AI.",
};

export default function Memes() {
  return <MemesPage />;
}
