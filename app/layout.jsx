import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: {
    default: "Silo — Your vault stays local",
    template: "%s — Silo",
  },
  description: "A local-first password manager that keeps credentials on your machine.",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth motion-reduce:scroll-auto" lang="en">
      <body className="m-0 min-h-screen bg-[var(--paper)] font-['Manrope',sans-serif] text-[var(--ink)] antialiased [font-synthesis:none] [text-rendering:optimizeLegibility] selection:bg-[var(--orange)] selection:text-white">
        {children}
        <Script
          id="counterscale-script"
          src="https://pulse-analytics.chimezieinnocent39.workers.dev/tracker.js?v=3.5.0"
          strategy="afterInteractive"
          data-site-id="silo"
        />
      </body>
    </html>
  );
}
