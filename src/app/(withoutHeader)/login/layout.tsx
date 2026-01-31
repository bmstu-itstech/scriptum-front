import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
