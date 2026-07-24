import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SRASHTEA — Crafted for Conversations",
  description:
    "Not just another café. SRASHTEA is a sanctuary crafted for slow evenings, meaningful conversations, and the finest culinary experiences. Where every detail whispers warmth.",
  keywords: [
    "café",
    "bali luxury café",
    "premium dining",
    "specialty coffee",
    "artisan food",
    "Srastea",
  ],
  openGraph: {
    title: "SRASHTEA — Crafted for Conversations",
    description:
      "A sanctuary for slow evenings and meaningful conversations. Experience warmth, craft, and culinary excellence.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SRASHTEA Café",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SRASHTEA — Crafted for Conversations",
    description:
      "A sanctuary for slow evenings and meaningful conversations. Experience warmth, craft, and culinary excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "SRASHTEA",
              "description": "A sanctuary for slow evenings and meaningful conversations. Experience warmth, craft, and culinary excellence.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Heritage Lane",
                "addressLocality": "Bandra West",
                "addressRegion": "Mumbai",
                "postalCode": "400050",
                "addressCountry": "IN"
              },
              "telephone": "+919876543210",
              "email": "hello@srastea.com",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "23:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday", "Sunday"],
                  "opens": "07:00",
                  "closes": "00:00"
                }
              ],
              "servesCuisine": ["Modern Comfort", "Artisanal", "Specialty Coffee"],
              "priceRange": "₹₹"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}