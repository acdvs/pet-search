import type { Metadata } from 'next';
import { Cherry_Bomb_One, Open_Sans } from 'next/font/google';
import clsx from 'clsx';

import ClientProviders from '@/components/ClientProviders';
import '../styles/globals.css';

const cherryBomb = Cherry_Bomb_One({
  variable: '--font-cherry-bomb',
  weight: ['400'],
  subsets: ['latin'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Adopt A Dog',
    template: 'Adopt A Dog - %s',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(openSans.variable, cherryBomb.variable, 'antialiased')}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
