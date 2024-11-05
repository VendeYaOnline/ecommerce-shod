import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const fontLight = localFont({
  src: "../fonts/Poppins-Light.ttf",
  variable: "--font-light",
});
const fontRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
  variable: "--font-regular",
});

const fontSemiBold = localFont({
  src: "../fonts/Poppins-SemiBold.ttf",
  variable: "--font-semibold",
});

export const metadata: Metadata = {
  title: "Nike",
  description:
    "Nos enfocamos en la calidad, clase y elegancia, realizando sneakers de forma artesanal, genuina y una modernidad fresca ofrecida por el progreso. Esta habilidad ancestral de fabricación nos permite verificar el paso a paso la producción, brindando calzado atemporal de alta calidad y duraderos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontLight.variable} ${fontRegular.variable}   ${fontSemiBold.variable} antialiased`}
      >
        <Navbar />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
