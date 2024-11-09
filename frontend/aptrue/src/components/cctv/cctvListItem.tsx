'use client';
import style from './cctv.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CCTVListItemProps {
  item?: CCTVItem;
  num: number;
}

export default function CCTVListItem({ item, num }: CCTVListItemProps) {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (item?.createdAt) {
      const date = new Date(item.createdAt);
      setFormattedDate(date.toLocaleString()); // 클라이언트에서만 포맷팅
    }
  }, [item]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case '방문 필요':
        return style.red;
      case '민원 완료':
        return style.blue;
      case '처리 대기':
        return style.orange;
    }
  };

  const handleClick = () => {
    if (item) {
      router.push(`/cctv/detail/${item.clipRQId}`);
    }
  };

  return (
    <div className={style['item-container']} onClick={handleClick}>
      <div className={style.numbox}>{num}</div>
      <div className={style.content}>
        {item && (
          <>
            <div className={style.description}>
              <div
                className={`${getStatusClass(item.status)}`}
              >{`•\u00A0 ${item.status}`}</div>
              <div>{`${item.address} ${item.name}님의 CCTV 처리 요청`}</div>
            </div>
            <div>{formattedDate}</div>
          </>
        )}
      </div>
    </div>
  );
}
