// import type {Metadata} from 'next';
// import {Geist, Geist_Mono, Inter} from 'next/font/google';
import './../globals.css';
import styles from '@/app/(withoutHeader)/page.module.css';


export default function NoHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${styles.body}`}>
        {children}
      </body>
    </html>
  );
}
