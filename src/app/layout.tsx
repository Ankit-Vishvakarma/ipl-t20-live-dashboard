import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'IPL T20 Live Dashboard',
  description: 'Live IPL scores, points table, schedule and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="w-full bg-gray-100 text-gray-900">
        <Navbar />
        <main className="w-full px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
