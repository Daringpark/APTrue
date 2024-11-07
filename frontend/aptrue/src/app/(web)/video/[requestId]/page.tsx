// import style from './video.module.scss';

// export default function Page({ params }: { params: { cctvId: string } }) {
//   const { cctvId } = params;

//   // S3에 업로드된 비디오의 URL (예시)
//   const videoUrl = `/videos/entrance.mp4`;

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <video
//         src={videoUrl}
//         controls
//         className={style.videoBox}
//         loop={true}
//         autoPlay={true}
//       >
//         해당 비디오를 재생할 수 없습니다.
//       </video>
//     </div>
//   );
// }
'use client';
import { useRef } from 'react';
import style from './video.module.scss';

export default function Page({ params }: { params: { cctvId: string } }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = () => {
    videoRef.current?.play();
  };

  const pauseVideo = () => {
    videoRef.current?.pause();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/entrance.mp4"
        className={style.videoBox}
        loop={true}
        muted={true}
      >
        해당 비디오를 재생할 수 없습니다.
      </video>
      <div className={style.playBar}>
        <button onClick={playVideo}>재생</button>
        <button onClick={pauseVideo}>일시정지</button>
        {/* 필요에 따라 추가 컨트롤을 구현할 수 있습니다 */}
      </div>
    </div>
  );
}
