import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "El Mar Fitness",
    "description": "Fitness consulting and personalized training programs in Austin, TX",
    "url": "https://elmarfitness.com",
    "email": "mramirez@elmarfitness.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Austin"
    },
    "serviceType": ["Fitness Consulting", "Personal Training", "Online Training Programs"]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
