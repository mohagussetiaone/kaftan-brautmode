import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import TanstackProvider from "@/app/providers/tanstack-providers";
import { merriweather, playfairDisplay, roboto } from "@/app/styles/font";
// import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Kaftan",
  description: "Modern wedding dress crafted with elegance and timeless style",
  openGraph: {
    title: "Kaftan",
    description: "Modern wedding dress crafted with elegance and timeless style",
    url: "https://selarasinvite.com",
    siteName: "Kaftan",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "Kaftan Wedding Dress",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaftan",
    description: "Modern wedding dress crafted with elegance and timeless style",
    images: ["./favicon.ico"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const message = await getMessages();
  return (
    <html lang="de" suppressHydrationWarning>
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
            <TooltipProvider>
              <NextIntlClientProvider messages={message}>{children}</NextIntlClientProvider>
            </TooltipProvider>
          </main>
          {/* </ThemeProvider> */}
        </TanstackProvider>
      </body>
    </html>
  );
}
