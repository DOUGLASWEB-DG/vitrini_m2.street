import type { Metadata } from "next";
import { Archivo_Black, Bebas_Neue, Montserrat } from 'next/font/google';
import "./globals.css";

const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-strong'
});

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-squeeze'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: "M² Street | Vitrine",
  description: "Catálogo Exclusivo M² Street",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivoBlack.variable} ${bebasNeue.variable} ${montserrat.variable} font-body bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
