// ClientComponent.tsx
"use client"; // Mark this as a client component

import Header from "./components/Header";
import { usePathname } from 'next/navigation'; // Import usePathname

const ClientComponent = ({ children } : any) => {
  const pathname = usePathname(); // Get the current pathname
  const isSpecificPage = pathname === '/'; // Replace with your specific page path

  return (
    <>
      {!isSpecificPage && <Header />} {/* Render Header only if not on specific page */}
      {children}
    </>
  );
};

export default ClientComponent;
