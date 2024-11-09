'use client';
import Image from 'next/image';
import style from './cctv.module.scss';
import { useSetRecoilState } from 'recoil';
import { cctvFormState } from '@/state/atoms/cctvAtoms';
import { useRouter } from 'next/navigation';

export default function CCTVHeader() {
  const router = useRouter();
  // const setFormState = useSetRecoilState(cctvFormState);
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    console.log('검색하기');
  };
  const handleShowForm = () => {
    router.push(`/cctv/form`);
  };
  return (
    <div className={style.header}>
      <div>CCTV 처리 목록</div>
      <div className={style.search}>
        <div className={style['input-container']}>
          <input type="text" placeholder="검색" onKeyDown={handleEnter} />
          <Image
            src="/icons/searchIcon.png"
            width={16}
            height={16}
            alt="검색 버튼"
            className={style['search-icon']}
            onClick={handleSearch}
          />
        </div>
        <button onClick={handleShowForm}>신청하기</button>
      </div>
    </div>
  );
}
