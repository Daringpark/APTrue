import { ReactNode, Suspense } from 'react';
import WebNav from '@/components/common/navbar/WebNav';
import Headerbar from '@/components/common/header/Headerbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Headerbar/>
        <WebNav />
      </Suspense>

      {children}
    </>
  );
}
