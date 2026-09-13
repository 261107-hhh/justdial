import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "CityDial — Find Local Businesses Near You",
    template: "%s | CityDial",
  },
  description:
    "CityDial is a local business directory to discover restaurants, doctors, salons, hotels and services near you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
