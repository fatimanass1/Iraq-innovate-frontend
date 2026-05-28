import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP_CONFIG } from "@/shared/constants/app";
import { AppProviders } from "@/app/providers";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.NAME,
    template: `%s | ${APP_CONFIG.NAME}`,
  },
  description: APP_CONFIG.DESCRIPTION,
  icons: {
    icon: [{ url: "/logo1.png", type: "image/png" }],
    shortcut: "/logo1.png",
    apple: [{ url: "/logo1.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
