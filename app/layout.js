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
