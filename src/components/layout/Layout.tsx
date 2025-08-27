
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "../cookies/CookieBanner";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1" style={{ marginTop: "72px" }}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
