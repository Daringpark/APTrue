import CCTVHeader from '@/components/cctv/cctvHeader';
import style from './cctvList.module.scss';
import Pagination from '@/components/common/pagination/Pagination';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={style['cctv-list-container']}>
      <CCTVHeader />
      {children}
    </div>
  );
}
