import './globals.css';

export const viewport = {
  themeColor: '#0B1121',
}

export const metadata = {
  title: 'Ziyad Template Studio',
  description: 'Admin Panel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  )
}
