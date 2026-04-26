import type { Metadata } from "next";
import { CareerCompassProvider } from "@/providers/career-compass-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Compass",
  description: "A guided platform that helps learners discover fitting career paths and turn changing dreams into concrete next steps."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CareerCompassProvider>{children}</CareerCompassProvider>
      </body>
    </html>
  );
}
