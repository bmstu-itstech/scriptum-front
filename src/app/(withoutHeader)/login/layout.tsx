import { ToastContainer } from 'react-toastify';

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
