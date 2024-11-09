import CCTVList from '@/components/cctv/cctvList';
import Pagination from '@/components/common/pagination/Pagination';
import style from './cctvList.module.scss';
import { cookies } from 'next/headers';

// [* todo] 1page 정보 가져오기
// const response = {
//   status: 200,
//   message: 'CCTV 처리 목록을 조회했습니다.',
//   data: [
//     {
//       clipRQId: 3,
//       status: '방문 필요',
//       address: '201동 301호',
//       name: '전가현',
//       createdAt: '2024-10-24T16:15:08.294372',
//     },
//     {
//       clipRQId: 2,
//       status: '처리 대기',
//       address: '101동 101호',
//       name: '전가현',
//       createdAt: '2024-10-24T16:15:08.294372',
//     },
//     {
//       clipRQId: 1,
//       status: '민원 완료',
//       address: '101동 201호',
//       name: '유지연',
//       createdAt: '2024-10-24T16:15:08.294372',
//     },
//   ],
// };

export default async function Page() {
  const cookiesObj = cookies();
  const accessToken = cookiesObj.get('accessToken')?.value;
  console.log('acessToken', accessToken);

  // API에서 데이터를 가져옵니다.
  // api/clip/list/{page}/{limit}
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clip/list/1/10`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 환경 변수에서 토큰 가져오기
      },
      credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
      cache: 'no-store', // 캐시를 사용하지 않도록 설정 (선택 사항)
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data, status: ${response.status}`);
  }

  const result = await response.json();

  if (result) {
    console.log('[*] cctv page', result);
  }

  return (
    <>
      <CCTVList data={result.data} />
      <div className={style['cctv-list-pagination']}>
        <Pagination urlPath="cctv/" />
      </div>
    </>
  );
}
