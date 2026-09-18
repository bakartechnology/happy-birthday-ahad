import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#07070e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Happy Birthday Ahad 🎂 | From Shahzaman, Abubakar & Araiz",
  description: "A special interactive birthday card for Ahad from Shahzaman, Abubakar & Araiz. Crafted with 1000% brotherly love.",
  keywords: ["Ahad Birthday", "Happy Birthday Ahad", "Shahzaman Abubakar Araiz", "Birthday Card", "Digital Greeting Card"],
  authors: [
    { name: "Shahzaman" },
    { name: "Abubakar" },
    { name: "Araiz" },
  ],
  openGraph: {
    title: "Happy Birthday Ahad 🎂 | From Shahzaman, Abubakar & Araiz",
    description: "A special interactive birthday card experience for Ahad from his three brothers.",
    type: "website",
    locale: "en_US",
    siteName: "Ahad's Birthday Card",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Ahad 🎂",
    description: "A special interactive birthday card experience for Ahad from Shahzaman, Abubakar & Araiz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07070e] text-slate-100 selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
