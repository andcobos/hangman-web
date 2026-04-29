import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Spot | Minijuegos Multijugador en Tiempo Real",
  description: "¡Reta a tus amigos en Bachillerato Stop, Ahorcado y más! La mejor plataforma de juegos web multijugador con sincronización en tiempo real.",
  icons: {
    icon: "/vercel.svg",
  },
  openGraph: {
    title: "Game Spot | Minijuegos Multijugador en Tiempo Real",
    description: "¡Reta a tus amigos en Bachillerato Stop, Ahorcado y más! La mejor plataforma de juegos web multijugador con sincronización en tiempo real.",
    url: "https://gamio-gs.vercel.app",
    siteName: "Gamio - Game Spot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview de Game Spot",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Spot | Minijuegos Multijugador en Tiempo Real",
    description: "¡Reta a tus amigos en Bachillerato Stop, Ahorcado y más! La mejor plataforma de juegos web multijugador con sincronización en tiempo real.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
