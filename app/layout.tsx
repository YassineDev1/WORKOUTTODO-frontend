"use client";
import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "WORKOUTTODO",
  description: "This a TODO Workout website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
