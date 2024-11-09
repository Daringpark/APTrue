'use client';

import style from './cctvForm.module.scss';
import GeneralInput from '../common/input/GeneralInput';
import TimeInput from '../common/input/TimeInput';
import Button from '../common/button/Button';
import CCTVUploadLink from './cctvUploadLink';
import { useRouter } from 'next/navigation';
import CCTVVideoLink from './cctvVideoLink';

const response = {
  status: 200,
  message: 'clipRQId : 1번의 상세 정보를 조회했습니다 .',
  data: {
    clipRQId: 1,
    name: '김민아',
    email: 'ma@gmail.com',
    phone: '010-0000-0000',
    address: '101동 201호',
    startDate: '2024-07-31T11:54:03.096298',
    endDate: '2024-07-31T11:54:03.096298',
    sections: ['101동 주변', '102동 주변'],
    photoStatus: true,
    password: 'Ma1234!!',
    clipList: ['1'],
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // 두 자릿수로 포맷하는 함수
  const twoDigitFormat = (num: number) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = twoDigitFormat(date.getMonth() + 1); // 월은 0부터 시작하므로 +1
  const day = twoDigitFormat(date.getDate());
  const hours = twoDigitFormat(date.getHours());
  const minutes = twoDigitFormat(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default function CCTVDetail() {
  const router = useRouter();
  const detailInfo = response.data;
  const handleDone = () => {
    // [* todo] 완료 처리 api 연결
    handleClose();
  };
  const handleClose = () => {
    router.push('/cctv/form');
  };
  return (
    <div className={style['cctv-form-container']}>
      <div className={style.header}>CCTV 열람 요청</div>
      <div className={style['input-container']}>
        <div className={style.double}>
          <GeneralInput
            label="이름"
            value={detailInfo.name}
            placeholder="홍길동"
            size="short"
          />
          <GeneralInput
            label="전화번호"
            value={detailInfo.phone}
            placeholder="010-0000-0000"
            size="short"
          />
        </div>
        <div className={style.double}>
          <GeneralInput
            label="이메일"
            value={detailInfo.email}
            placeholder="xxxx1234@gmail.com"
            size="short"
          />
          <GeneralInput
            label="주소"
            value={detailInfo.address}
            placeholder="101동 101호"
            size="short"
          />
        </div>
        <div className="requestTime">
          <GeneralInput
            label="요청 시간"
            size="long"
            value={`${formatDate(detailInfo.startDate)} - ${formatDate(detailInfo.endDate)}`}
          />
        </div>
        <div className={style['location-button-container']}>
          <div className={style.label}>
            {'요청위치'.split('').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
          <div className={style['location-button']}>
            {detailInfo.sections.map((section, index) => (
              <Button
                key={index}
                color="lightBlue" // 활성 상태에 따라 색상 변경
                size="webSmall"
              >
                {section}
              </Button>
            ))}
          </div>
        </div>
        <div className={style.photoStatus}>
          <div>사진 업로드 현황</div>
          <div className={detailInfo.photoStatus ? style.green : style.red}>
            {detailInfo.photoStatus
              ? '사진이 업로드 되었습니다.'
              : '사진이 아직 등록되지 않았습니다.'}
          </div>
        </div>
        {!detailInfo.photoStatus && <CCTVUploadLink detailInfo={detailInfo} />}
        {detailInfo.clipList && <CCTVVideoLink detailInfo={detailInfo} />}
      </div>
      <div className={style.buttons}>
        <Button size="webRegular" color="gray" onClick={handleClose}>
          닫기
        </Button>
        <Button size="webRegular" color="blue" onClick={handleDone}>
          민원 처리 완료
        </Button>
      </div>
    </div>
  );
}
