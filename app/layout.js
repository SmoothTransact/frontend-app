import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./utils/redux/provider";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Smooth Transact",
  description: "Small Business Payments Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
