'use client';

import { useEffect, useState } from 'react';
import styles from './TimeInput.module.scss';
import Calendar from '../calendar/Calendar';

interface TimeInputProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleInputTime: (startDate: string, endDate: string) => void;
  value: string;
  isWeb: boolean;
}

export default function TimeInput({
  setStartDate,
  setEndDate,
  isWeb,
  value,
  handleInputTime,
}: TimeInputProps) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const clickCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {'요청시간'.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={value}
          placeholder="yyyy.mm.dd hh:mm - yyyy.mm.dd hh:mm"
          readOnly
          className={isWeb ? styles.web : styles.app}
        />
        <img
          src="/icons/calendarIcon.png"
          alt="calendarIcon"
          onClick={clickCalendar}
        />
      </div>
      {openCalendar && (
        <div className={styles.calendarContainer}>
          <Calendar
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            clickCalendar={clickCalendar}
            handleInputTime={handleInputTime}
          />
        </div>
      )}
    </div>
  );
}
