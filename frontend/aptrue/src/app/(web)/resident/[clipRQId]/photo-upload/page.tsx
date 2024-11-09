import Button from '@/components/common/button/Button';
import style from './page.module.scss';
import Upload from '@/components/photoUpload/Upload';

export default function Page() {
  return (
    <div>
      <div className={style.xbutton}>
        <img src="/icons/xbutton.png" />
      </div>
      <div className={style.content}>
        <div className={style.title}>사진 업로드</div>
        <div className={style.description}>
          <div>CCTV 처리를 위하여 원하는 신청인의</div>
          <div>정면 사진을 최소 5개 이상 업로드 해주시길 바랍니다.</div>
        </div>
        <Upload />
      </div>
    </div>
  );
}
