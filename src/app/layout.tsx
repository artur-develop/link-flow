import type { Metadata } from "next";
import '@/styles/globals.css'
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Link flow application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        {children}
      </body>
    </html>
  );
}
