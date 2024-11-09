'use client';
import style from './cctvForm.module.scss';
import Image from 'next/image';

export default function CCTVUploadLink({
  detailInfo,
}: {
  detailInfo: requestDetailInfo;
}) {
  const handleCopy = (copy: string) => {
    navigator.clipboard
      .writeText(copy)
      .then(() => {
        alert('복사되었습니다!');
      })
      .catch((error) => {
        console.error('복사에 실패했습니다:', error);
      });
  };

  const UploadBox = ({ label, copy }: { label: string; copy: string }) => {
    return (
      <div className={style.uploadLinkBox}>
        <div className={style.label}>
          {label.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
        <div className={style.copyBox}>
          <div>{copy}</div>
          <Image
            src="/icons/copy.png"
            height={12}
            width={12}
            alt="복사"
            onClick={() => handleCopy(copy)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    );
  };
  return (
    detailInfo.photoStatus && (
      <div className={style.uploadInfo}>
        <div>사진 업로드 링크</div>
        <div>
          <UploadBox
            label="사진 첨부 링크"
            copy={`resident/${detailInfo.clipRQId}/entrance`}
          />
          <UploadBox label="사진 첨부 비밀번호" copy={detailInfo.password} />
        </div>
      </div>
    )
  );
}
