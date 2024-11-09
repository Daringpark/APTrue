'use client';

import { useState } from 'react';
import AlarmCard from './AlarmCard';
import Dropdown from './Dropdown';
import style from './Notification.module.scss';
import Emergency from './Emergency';

const data: Alarm[] = [
  {
    notificationId: 1,
    message: '101동 주변 화재 발생',
    category: '화재',
    emergency: true,
    isCompleted: true,
    date: '2024-11-01T10:00:00',
    image: '/images/cctv_fire.png',
  },
  {
    notificationId: 2,
    message: '101동 주차장 불법 주차 발생',
    category: '불법주차',
    emergency: false,
    isCompleted: false,
    date: '2024-10-31T15:30:00',
    image: '/images/park_cctv.png',
  },
  {
    notificationId: 3,
    message: '차은우님의 CCTV 요청 처리 완료',
    category: 'cctv 요청 처리',
    emergency: false,
    isCompleted: true,
    date: '2024-10-30T22:00:00',
    image: null,
  },
];

export default function Notification() {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] =
    useState<boolean>(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);

  const filteredData = data.filter((alarm) => {
    if (selectedFilter === '전체') return true;
    if (selectedFilter === '미완료') return !alarm.isCompleted;
    if (selectedFilter === '완료') return alarm.isCompleted;
    if (selectedFilter === '긴급') return alarm.emergency;
    return true;
  });

  const handleAlarmClick = (alarm: Alarm) => {
    if (alarm.emergency) {
      setSelectedAlarm(alarm);
      setIsEmergencyModalOpen(true);
    } else {
      console.log(`${alarm.message} 클릭됨`);
    }
  };

  const closeModal = () => {
    setIsEmergencyModalOpen(false);
    setSelectedAlarm(null);
  };

  function EmergencyModal({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) {
    const handleBackdropClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div className={style.modalBackdrop} onClick={handleBackdropClick}>
        <div className={style.modalContent}>
          <img
            src="/icons/xbutton.png"
            alt="닫기 버튼"
            onClick={onClose}
            className={style.xbutton} // 스타일 적용
          />
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.titlecontainer}>
        <div className={style.title}>
          알림
          <span className={style.count}> {filteredData.length}</span>
        </div>
        <Dropdown setSelectedFilter={setSelectedFilter} />
      </div>
      {filteredData.map((alarm) => (
        <AlarmCard
          key={alarm.notificationId}
          {...alarm}
          onClick={() => handleAlarmClick(alarm)}
        />
      ))}

      {isEmergencyModalOpen && selectedAlarm && (
        <EmergencyModal onClose={closeModal}>
          <Emergency alarm={selectedAlarm} />
        </EmergencyModal>
      )}
    </div>
  );
}
