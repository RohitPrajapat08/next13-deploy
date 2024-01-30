import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/assets/global.scss";
import { HeaderWebsite } from "./components";
import { Providers } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "Inner Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <HeaderWebsite />
          {children}
        </body>
      </html>
    </Providers>
  );
}
