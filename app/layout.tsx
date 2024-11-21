import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/sidebar";
import { AdminProvider } from "./context/AdminContext";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage users, roles, and permissions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminProvider>
          <div className="flex flex-col lg:flex-row  h-screen bg-gray-100">
            <Sidebar />
            <div className="flex lg:hidden">
              <Navbar />
            </div>
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}
