import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import backgroundImage from "../../public/back2.jpg";
import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/Context/AuthContext";
import Footer from "@/components/Footer";
import StoreProvider from "@/app/StoreProvide";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MetaTask",
  description: "Make money with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen text-purple-400 bg-cover bg-center`}
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
        }}
      >
        <StoreProvider>
          <AuthProvider>
            {/* Main content area */}
            <Navbar />
            <Header />
            <main className="flex-grow">{children}</main>
            {/* Footer now inside body */}
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
