// import type {Metadata} from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
// import styles from '@/app/(withoutHeader)/login/page.module.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const interSans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
