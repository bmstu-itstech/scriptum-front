// import type { Metadata } from 'next';
// import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './../globals.css';
import { Header } from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get('csrftoken')?.value;

  // Например, если token у админа содержит "admin", то рендерим админский хедер
  // console.log(csrfToken, process.env.NEXT_PUBLIC_JWT_ADMIN);
  const isAdmin = csrfToken === process.env.NEXT_PUBLIC_JWT_ADMIN;

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable}`}>
        <Header isAdmin={isAdmin} />
        {children}
        <ToastContainer />
        {/* <Footer/> */}
      </body>
    </html>
  );
}
