'use client';
import style from './cctv.module.scss';
import { useEffect, useRef, useState } from 'react';

interface CCTVClipProps {
  clipList: string[];
}

export default function CCTVClip({ clipList }: CCTVClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 비디오가 끝날 때 다음 비디오로 이동하거나 리스트의 시작으로 돌아감
    const handleEnded = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < clipList.length) {
          videoElement.src = clipList[nextIndex];
          videoElement.play();
          return nextIndex;
        } else {
          videoElement.src = clipList[0];
          videoElement.play();
          return 0;
        }
      });
    };

    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [clipList]);

  // 썸네일 클릭 시 비디오 변경
  const handleThumbnailClick = (index: number) => {
    // 드래그 중이 아닐 때만 비디오 변경
    setCurrentIndex(index);
    if (videoRef.current) {
      videoRef.current.src = clipList[index];
      videoRef.current.play();
    }
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 500; // 스크롤 이동량 설정
      thumbnailContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={style['video-container']}>
      {/* 영상 미리보기 - 가로 스크롤 */}
      <div className={style.thumbnailWrapper}>
        <button
          className={style.scrollButton}
          onClick={() => scrollThumbnails('left')}
        >
          ◀
        </button>
        <div className={style.thumbnailContainer} ref={thumbnailContainerRef}>
          {clipList.map((clip, index) => (
            <video
              key={index}
              className={`${style.thumbnail} ${
                currentIndex === index ? style.activeThumbnail : ''
              }`}
              src={clip}
              muted
              autoPlay
              loop
              onClick={() => handleThumbnailClick(index)}
              onContextMenu={(e) => e.preventDefault()}
              tabIndex={-1}
            ></video>
          ))}
        </div>
        <button
          className={style.scrollButton}
          onClick={() => scrollThumbnails('right')}
        >
          ▶
        </button>
      </div>
      {/* 메인 비디오 플레이어 */}
      <div className={style.videoBox}>
        <video
          className={style.video}
          ref={videoRef}
          src={clipList[currentIndex]}
          controls
          autoPlay
          muted
          loop={false}
          controlsList="noremoteplayback nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        ></video>
        <div className={style.videoNum}>
          현재 비디오: {currentIndex + 1} / {clipList.length}
        </div>
      </div>
    </div>
  );
}
