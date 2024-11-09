'use client';

import CCTVScreen from './CCTV/CCTVScreen';
import CCTVButton from './CCTVButton';
import style from './CCTVHome.module.scss';
import { useState } from 'react';

const cctvZone = [
  '101동 주변',
  '102동 주변',
  '101동 주차장',
  '102동 주차장',
  '아파트 입구',
  '정문 경비실',
  '후문 경비실',
  '지하 스포츠센터',
  '정문 어린이집',
];

const videoUrls = [
  '/videos/entrance.mp4',
  '/videos/park2.mp4',
  '/videos/park.mp4',
  '/videos/playground.mp4',
];

export default function CCTVHome() {
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [randomVideos, setRandomVideos] = useState<string[]>(videoUrls);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);
    const shuffledVideos = [...videoUrls].sort(() => Math.random() - 0.5);
    setRandomVideos(shuffledVideos);
  };

  const openModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl('');
  };

  return (
    <div>
      <div className={style.button}>
        <CCTVButton
          activeZone={activeZone}
          setActiveZone={handleZoneChange}
          cctvZone={cctvZone}
        />
      </div>
      <div className={style.cctvContainer}>
        {randomVideos.map((videoUrl, index) => (
          <CCTVScreen
            key={index}
            activeZone={activeZone}
            camNumber={index + 1}
            videoUrl={videoUrl}
            onClick={() => openModal(videoUrl)} // 클릭 핸들러 추가
          />
        ))}
      </div>
      {isModalOpen && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <video src={currentVideoUrl} controls={false} autoPlay loop muted />
          </div>
        </div>
      )}
    </div>
  );
}
