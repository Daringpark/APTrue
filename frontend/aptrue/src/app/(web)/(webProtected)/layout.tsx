import { ReactNode, Suspense } from 'react';
import WebNav from '@/components/common/navbar/WebNav';
import Headerbar from '@/components/common/header/Headerbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Headerbar name='차은우'/>
        <WebNav />
      </Suspense>

      {children}
    </>
  );
}
