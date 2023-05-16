"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "WORKOUTTODO",
  description: "This a TODO Workout website",
};

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: any
}) {
  return (
    <html lang="en">
      <body className="min-h-full">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
