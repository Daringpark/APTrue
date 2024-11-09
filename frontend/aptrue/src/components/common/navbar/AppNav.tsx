'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './AppNav.module.scss';

export default function AppNav() {
  const [activeItem, setActiveItem] = useState<string>('alarm');
  const pathname = usePathname(); // 현재 경로를 가져오기 위한 훅

  // 클릭 핸들러 함수
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className={style.navbar}>
      <div>
        <Link
          href="/m"
          className={`${style.alarm} ${activeItem === 'alarm' ? style.active : ''}`}
          onClick={() => handleItemClick('alarm')}
        >
          <img
            src={
              activeItem === 'alarm'
                ? '/icons/alarm_click.png'
                : '/icons/alarm.png'
            }
            alt="Alarm Icon"
          />
        </Link>

        <Link
          href="/m/apply"
          className={`${style.apply} ${activeItem === 'apply' ? style.active : ''}`}
          onClick={() => handleItemClick('apply')}
        >
          <img
            src={
              activeItem === 'apply'
                ? '/icons/apply_click.png'
                : '/icons/apply.png'
            }
            alt="Apply Icon"
          />
        </Link>

        <Link
          href="/m/logout"
          className={`${style.logout} ${activeItem === 'logout' ? style.active : ''}`}
          onClick={() => handleItemClick('logout')}
        >
          <img
            src={
              activeItem === 'logout'
                ? '/icons/logout_click.png'
                : '/icons/logoutbutton.png'
            }
            alt="Logout Icon"
          />
        </Link>
      </div>
    </div>
  );
}
