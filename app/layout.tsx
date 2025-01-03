import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DashboardSidebar } from "@/components/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An eye-catching and carefully designed modern dashboard with latest tech stacks.", 

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 md:ml-[240px] p-8">
        {children}
      </main>
    </div>
      </body>
    </html>
  );
}
