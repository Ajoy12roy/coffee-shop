import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export const metadata: Metadata = {
  title: "CoffeeApp — Premium Coffee & Donuts",
  description: "Order your favourite coffee, donuts, and snacks from CoffeeApp.",
  keywords: "coffee, espresso, latte, donuts, premium coffee shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <CartProvider>
          <FavoritesProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
