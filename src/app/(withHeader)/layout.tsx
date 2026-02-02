import { Header } from '@/components/Header';
import { ToastContainer } from 'react-toastify';

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <ToastContainer />
    </>
  );
}
