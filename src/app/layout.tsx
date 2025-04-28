import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster'; // Import Toaster
import {SupabaseProvider} from '@/components/supabase-provider'; // Import SupabaseProvider

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'], // Include necessary weights
});

export const metadata: Metadata = {
  title: 'Policy Insights AI',
  description: 'Analyze your insurance policy with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} antialiased`}>
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
