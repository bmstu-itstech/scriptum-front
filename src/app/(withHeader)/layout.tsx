// import type { Metadata } from 'next';
// import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './../globals.css';
import { Header } from '@/components/Header';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable}`}
      >
        <Header />
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
