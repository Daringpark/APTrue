import { ReactNode } from 'react';
import Link from 'next/link';
import style from './layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  cctvList: ReactNode;
  cctvForm: ReactNode;
}

export default function Layout({ children, cctvList, cctvForm }: LayoutProps) {
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div className={style.contents}>
          <div>{cctvList}</div>
          <div>{cctvForm}</div>
        </div>
      </div>
    </div>
  );
}
