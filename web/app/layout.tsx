import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "ClickMarket | Find Your Next Car",
    template: "%s | ClickMarket",
  },
  description:
    "Search thousands of used cars from trusted UK dealers. Find your perfect car with ClickMarket.",
  keywords: ["used cars", "second hand cars", "car dealerships", "UK cars"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f9fb] text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
