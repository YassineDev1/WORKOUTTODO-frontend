import './globals.css'


export const metadata = {
  title: 'WORKOUTTODO',
  description: 'This a TODO Workout website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
