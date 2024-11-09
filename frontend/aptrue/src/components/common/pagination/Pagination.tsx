'use client';
import { useRouter } from 'next/navigation';
import style from './Pagination.module.scss';

interface PageProps {
  pageNum?: string;
  urlPath: string;
}

const ITEMS_PER_PAGE = 10;
const BUTTONS_PER_GROUP = 5;

export default function Pagination({ urlPath, pageNum }: PageProps) {
  const router = useRouter();
  const page = parseInt(pageNum as string, 10) || 1;
  // 페이지네이션 버튼 생성
  const currentGroup = Math.floor((page - 1) / BUTTONS_PER_GROUP);
  const startPage = currentGroup * BUTTONS_PER_GROUP;
  const endPage = startPage + BUTTONS_PER_GROUP;
  // const endPage = startPage + BUTTONS_PER_GROUP - 1;
  const pageNumbers = Array.from(
    { length: BUTTONS_PER_GROUP },
    (_, i) => startPage + i + 1,
  );

  // 페이지 이동 함수
  const handlePageChange = (newPage: number) => {
    const baseURL = window.location.origin;
    router.push(`${baseURL}/${urlPath}/${newPage}/`);
  };

  return (
    <div className={style.container}>
      {/* 이전 그룹 버튼 */}
      <button
        onClick={() => handlePageChange(startPage - (BUTTONS_PER_GROUP - 1))}
        className={`${style.group} ${currentGroup > 0 ? '' : style.hidden}`}
      >
        &lt; &nbsp; Back
      </button>
      {/* 페이지네이션 버튼 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={page === pageNumber ? style.active : ''}
        >
          {pageNumber}
        </button>
      ))}
      {/* 다음 그룹 버튼 */}
      <button
        onClick={() => handlePageChange(endPage + 1)}
        className={style.group}
      >
        Next &nbsp; &gt;
      </button>
    </div>
  );
}
