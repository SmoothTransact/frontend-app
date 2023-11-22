import "./globals.css";
// import { Oswald } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Smooth Transact",
  description: "Small Business Payments Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
