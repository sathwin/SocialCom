import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SocialCom - Anxiety-Friendly Social Events',
  description: 'Discover and attend social events designed to reduce anxiety and foster real connections',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        <footer className="border-t border-slate-200 bg-slate-50 py-8 mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-slate-600">
                © 2025 SocialCom. Built with 🤍 for meaningful connections.
              </div>
              <div className="flex space-x-6 text-sm text-slate-600">
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Safety
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Community Guidelines
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
