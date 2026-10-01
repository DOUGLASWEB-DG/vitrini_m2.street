import type { Metadata } from "next";
import { Archivo_Black, Bebas_Neue, Montserrat, Yellowtail } from 'next/font/google';
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

const yellowtail = Yellowtail({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: "M² Street | Catálogo Oficial",
  description: "Mais que estilo, é atitude. O maior estilo urbano do Brasil.",
  icons: {
    icon: "/Identidade visual M2 Street/logo.png",
    apple: "/Identidade visual M2 Street/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivoBlack.variable} ${bebasNeue.variable} ${montserrat.variable} ${yellowtail.variable} font-body bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
