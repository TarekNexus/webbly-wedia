import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebblyFiles — Mini File Explorer",
  description: "A mini file explorer built with Next.js, Tailwind CSS, and shadcn/ui for Webbly Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
