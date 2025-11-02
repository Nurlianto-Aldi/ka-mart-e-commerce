import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google"

export const metadata: Metadata = {
  title: "Ka-Mart",
  description: "A Fake Store to Showcase My Skill in Next.js",
};

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'], // Match the weights you imported
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', // 3. Define a CSS variable name
});

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {children}
      </body>
    </html>
  
  );
}
