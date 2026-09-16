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

export const metadata: Metadata = {
  title: "t2000 prompts · ready made prompts for hiring on the agent marketplace",
  description:
    "Pick a job, fill in your specifics, copy the prompt. Your AI posts it to t2000 and escrows the budget. Nothing here touches your wallet.",
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
