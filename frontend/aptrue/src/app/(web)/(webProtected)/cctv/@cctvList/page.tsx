import CCTVList from '@/components/cctv/cctvList';
import Pagination from '@/components/common/pagination/Pagination';
import style from './cctvList.module.scss';

// [* todo] 1page 정보 가져오기
const response = {
  status: 200,
  message: 'CCTV 처리 목록을 조회했습니다.',
  data: [
    {
      cctvRequestId: 3,
      status: '방문 필요',
      address: '201동 301호',
      name: '전가현',
      createdAt: '2024-10-24T16:15:08.294372',
    },
    {
      cctvRequestId: 2,
      status: '처리 대기',
      address: '101동 101호',
      name: '전가현',
      createdAt: '2024-10-24T16:15:08.294372',
    },
    {
      cctvRequestId: 1,
      status: '민원 완료',
      address: '101동 201호',
      name: '유지연',
      createdAt: '2024-10-24T16:15:08.294372',
    },
  ],
};

export default function Page() {
  return (
    <>
      <CCTVList data={response.data} />
      <div className={style['cctv-list-pagination']}>
        <Pagination urlPath="cctv/" />
      </div>
    </>
  );
}
