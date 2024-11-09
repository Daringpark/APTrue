import type { Metadata } from 'next';
import '@/styles/globals.scss';
import RecoilRootProvider from '@/utils/RecoilRootProvider';

export const metadata: Metadata = {
  title: 'APTrue',
  description: '아파트의 진실을 알고 싶다면, 아파트루(APTrue.)!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
