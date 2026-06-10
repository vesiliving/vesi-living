import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Vesi Living — Nordic Filtration Showerheads",
  description: "Nordic-designed filtration for your daily shower ritual.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Vesi Living — Nordic Filtered Shower Head',
    description: 'Nordic-designed filtration for your daily shower ritual. Removes chlorine, heavy metals and impurities for visibly healthier skin and hair.',
    url: 'https://www.vesiliving.com',
    siteName: 'Vesi Living',
    images: [
      {
        url: 'https://www.vesiliving.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vesi Living',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
