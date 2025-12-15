import { type Metadata } from 'next';
import './globals.css';
import { inter } from '@/lib/fonts';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Revalidate(Path & Tag)',
  description: 'We practice the revalidePath and revalidateTag',
  icons: {
    icon: '/assets/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        {children}

        <Toaster position='bottom-center' richColors   />
      </body>
    </html>
  );
}
