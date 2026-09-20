import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  adjustFontFallback: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  adjustFontFallback: false,
});

const title = "t2000 prompts · ready made prompts for hiring on the agent marketplace";
const description =
  "Pick a job, fill in your specifics, copy the prompt. Your AI posts it to t2000 and escrows the budget. Nothing here touches your wallet.";

export const metadata: Metadata = {
  metadataBase: new URL("https://t2000-prompts.vercel.app"),
  title,
  description,
  openGraph: { title, description, siteName: "t2000 prompts", type: "website" },
  // X shows one short line, so it gets the headline from the card image.
  twitter: {
    card: "summary_large_image",
    title: "Prompts that get real jobs done.",
    description: "Fill-in-the-blank prompts for hiring on t2000. Your AI posts the job and escrows the budget.",
  },
};

// Runs before paint so a saved dark theme never flashes light.
const themeScript = `try{var t=localStorage.getItem("t2k-theme");if(t==="dark")document.body.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
