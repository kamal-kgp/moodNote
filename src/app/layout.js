import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mood Note",
  description: "Track your mood and weather daily.",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <main className="container mx-auto p-4 pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
