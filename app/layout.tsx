import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import TanstackProvider from "@/app/providers/tanstack-providers";
import { merriweather, playfairDisplay, roboto } from "@/app/styles/font";
// import { ThemeProvider } from "@/components/ui/theme-provider";

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Kaftan",
  description: "Kaftan - Online Wedding Invitation",
  openGraph: {
    title: "Kaftan",
    description: "Undangan online elegan dan modern.",
    url: "https://selarasinvite.com",
    siteName: "Kaftan",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "Kaftan",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaftan",
    description: "Undangan online elegan dan modern.",
    images: ["./favicon.ico"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://accounts.google.com" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="preload" as="script" href="https://accounts.google.com/gsi/client" />
      </head>
      <body className={`${merriweather.variable} ${playfairDisplay.variable} ${roboto.variable} antialiased`}>
        <Toaster position="top-right" />

        <TanstackProvider>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          <main>
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          {/* </ThemeProvider> */}
        </TanstackProvider>
      </body>
    </html>
  );
}
