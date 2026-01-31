import { Header } from '@/components/Header';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
      {/* <Footer/> */}
    </>
  );
}
