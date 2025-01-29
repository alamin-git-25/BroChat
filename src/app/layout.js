import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "BroChat",
  description: "Chatting App for Bhai Brother",
  icons: {
    icon: "/live-chat.png",
  },

};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-custom "
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
