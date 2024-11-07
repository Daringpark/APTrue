import AppNav from '@/components/common/navbar/AppNav';
import style from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.mobile}>
      <AppNav />
      {children}
    </div>
  );
}
