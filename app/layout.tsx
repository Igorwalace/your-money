import type { Metadata } from "next";
import "./globals.css";
import { AppAuth } from "./context/auth";
import { comfortaa } from "./font/font";
import { AppUtils } from "./context/utills";
import { Toaster } from "@/components/ui/sonner"
import { AppAmount } from "./context/amount";

export const metadata: Metadata = {
  title: "Financias",
  description: "WebApp Financias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${comfortaa.className}`}
      >
        <AppUtils>
          <AppAuth>
            <AppAmount>
              {children}
              <Toaster />
            </AppAmount>
          </AppAuth>
        </AppUtils>
      </body>
    </html>
  );
}
