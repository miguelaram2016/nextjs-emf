import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "El Mar Fitness",
  description: "El Mar Fitness, website platform for fitness clients working with Miguel Ramirez.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
