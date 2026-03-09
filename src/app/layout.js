import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "El Mar Fitness | Personalized Fitness Programs",
  description: "Fitness consulting and personalized training programs. Get direction, build strength, and achieve your goals with evidence-based training.",
  keywords: ["fitness", "personal training", "workout programs", "nutrition", "Kinesiology", "Austin trainer"],
  openGraph: {
    title: "El Mar Fitness | Personalized Fitness Programs",
    description: "Fitness consulting and personalized training programs. Get direction, build strength, and achieve your goals.",
    url: "https://elmarfitness.com",
    siteName: "El Mar Fitness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mar Fitness",
    description: "Fitness consulting and personalized training programs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      <body className={inter.className}>{children}</body>
      <Footer />
    </html>
  );
}
