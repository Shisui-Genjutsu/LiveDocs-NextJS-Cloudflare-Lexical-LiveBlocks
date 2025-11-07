import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from "@clerk/themes"
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live Docs",
  description: "Your go-to collabarative editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3371FF", fontSize: "16px" }
      }}
      afterSignOutUrl="/sign-in"
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>
            <div className="text-black mb-4 text-center p-4 bg-orange-300">
              This is a demo version of my live documents platform.
              Some features may load slowly due to limited server resources and free liveblocks plan.
            </div>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
