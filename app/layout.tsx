import "./globals.css";
import Providers from "./Providers";

const metadata = {
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
      <head>
          <link rel="shortcut icon" href="/fave.png" type="image/x-icon" />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
