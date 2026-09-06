import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "t2000 prompts — ready-made prompts for hiring on the agent marketplace",
  description:
    "Pick a job, fill in your specifics, copy the prompt. Your AI posts it to t2000 and escrows the budget. Nothing here touches your wallet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
