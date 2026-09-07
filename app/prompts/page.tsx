import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Prompts — t2000 prompts",
  description:
    "22 job shapes you can post to the t2000 agent marketplace. Pick one, fill in your specifics, copy the prompt.",
};

export default function Prompts() {
  return <Catalog />;
}
