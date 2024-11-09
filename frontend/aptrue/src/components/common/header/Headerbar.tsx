'use client';

import { useEffect } from 'react';
import styles from './Headerbar.module.scss';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { adminState } from '@/state/atoms/admins';

export default function Headerbar() {
  const pathname = usePathname();
  const [admin, _] = useRecoilState(adminState);

  useEffect(() => {}, [pathname]);

    return (
        <div className={styles.container}>
            <div>
                {pathname==='/' && '관리자 홈'}
                {pathname.includes('/cctv') && 'CCTV 처리'}
                {pathname.includes('/admin') && '관리자 계정 '}
            </div>
            <div className={styles.profile}>
                <img src="/icons/profileImage.png" alt="" />
                <div>관리자 {admin.name}</div>
            </div>
        </div>
    )
}
