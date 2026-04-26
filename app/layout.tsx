import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Hood | Tag Printer",
  description: "Professional clothing tag and label printing system for thermal printers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Green Hood",
  },
};

export const viewport = {
  themeColor: "#2e7d32",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
