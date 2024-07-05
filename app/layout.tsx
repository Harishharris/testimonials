import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_header/Header';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Testimonials App',
  description: 'Created for businesses to gather user',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="dark:bg-gray-900  text-gray-900 dark:text-gray-100 tracking-tight">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
