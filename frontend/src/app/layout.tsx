import './globals.css';
import type { Metadata } from 'next';

export let metadata: Metadata = {
  title: 'Near-By | Discover Nearby Opportunities',
  description: 'Real-time global discovery and connection platform - Find products, services, jobs, and opportunities near you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}