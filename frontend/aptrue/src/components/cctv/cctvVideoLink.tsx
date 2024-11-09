import style from './cctvForm.module.scss';

export default function CCTVVideoLink({
  detailInfo,
}: {
  detailInfo: requestDetailInfo;
}) {
  return (
    <div className={style['cctv-video-box']}>
      <div>CCTV 처리 완료 영상</div>
      <div className={style['real-blue']}>
        <a
          href={`${window.location.origin}/video/${detailInfo.clipList}`}
          target="_blank"
          rel="noopener noreferrer"
          className={style['real-blue']}
        >
          {`https://www.ssafy-aptrue/video/${detailInfo.clipList}`}
        </a>
      </div>
    </div>
  );
}
