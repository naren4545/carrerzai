import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {  DualAuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster"
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=" antialiased"
      >

<DualAuthProvider>
  <div>
        {children}
        <div id="portal-root"/>
        </div>
        <Toaster />
        </DualAuthProvider>

      </body>
    </html>
  );
}
