import React, { useEffect } from 'react';
import useCalendar from '@/hooks/useClendar';
import styles from './Calendar.module.scss';
import Button from '../button/Button';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

interface CalendarProps {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clickCalendar: () => void;
  handleInputTime: (startDate: string, endDate: string) => void;
}

export default function Calendar({
  setStartDate,
  setEndDate,
  clickCalendar,
  handleInputTime,
}: CalendarProps) {
  const {
    days,
    currentDate,
    setCurrentDate,
    startDate,
    endDate,
    handleDateClick,
    firstDayOfMonth,
  } = useCalendar();

  // 연도 선택 범위 설정
  const years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - 50 + index,
  ); // 현재 연도 기준 ±50년

  // 월 변경 핸들러
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  // 연도 변경 핸들러
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth()));
  };

  // 시간과 분을 관리하는 상태
  const [startAmPm, setStartAmPm] = React.useState('오전');
  const [startHour, setStartHour] = React.useState('');
  const [startMinute, setStartMinute] = React.useState('');
  const [endAmPm, setEndAmPm] = React.useState('오전');
  const [endHour, setEndHour] = React.useState('');
  const [endMinute, setEndMinute] = React.useState('');

  const formatDateToCustomString = (
    date: Date,
    amPm: string,
    hour: string,
    minute: string,
  ) => {
    // Date 객체에서 연도, 월, 일을 가져와 수동으로 포맷
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');

    // AM/PM에 따라 시간 변환
    let adjustedHour = parseInt(hour, 10);
    if (amPm === '오후' && adjustedHour !== 12) {
      adjustedHour += 12; // 오후일 때 12시간 더함 (단, 오후 12시는 그대로 유지)
    } else if (amPm === '오전' && adjustedHour === 12) {
      adjustedHour = 0; // 오전 12시는 0시로 변환
    }

    // 시간과 분을 두 자리로 포맷
    const formattedHour = String(adjustedHour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    // "yyyy-mm-ddThh:mm" 형식으로 결합
    return `${year}-${month}-${day}T${formattedHour}:${formattedMinute}`;
  };

  // 확정 버튼 클릭
  const handleSetDates = () => {
    if (startDate && endDate) {
      const formattedStartTime = formatDateToCustomString(
        startDate,
        startAmPm,
        startHour,
        startMinute,
      );
      const formattedEndTime = formatDateToCustomString(
        endDate,
        endAmPm,
        endHour,
        endMinute,
      );
      setStartDate(formattedStartTime);
      setEndDate(formattedEndTime);
      handleInputTime(formattedStartTime, formattedEndTime);
    }

    clickCalendar();
  };

  // 버튼 비활성화 조건
  const isButtonDisabled = !(
    startDate &&
    endDate &&
    startHour &&
    startMinute &&
    endHour &&
    endMinute
  );

  const monthYearDropdown = (
    <div className={styles.dropDown}>
      <select value={currentDate.getMonth()} onChange={handleMonthChange}>
        {MONTHS.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select value={currentDate.getFullYear()} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>

      <button
        className={styles.confirm}
        disabled={isButtonDisabled}
        onClick={handleSetDates}
      >
        확정
      </button>
    </div>
  );

  const dayList = (
    <div className={styles.week}>
      {DAY_LIST.map((day) => (
        <div key={day} style={{ fontWeight: 'bold' }}>
          {day}
        </div>
      ))}
    </div>
  );

  const daysGrid = (
    <div className={styles.day}>
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
        <div key={`empty-${index}`} style={{ visibility: 'hidden' }}>
          {/* 빈 셀 */}
        </div>
      ))}
      {days.map((day) => {
        const isStartDate =
          startDate && day.toDateString() === startDate.toDateString();
        const isEndDate =
          endDate && day.toDateString() === endDate.toDateString();
        const isBetweenDates =
          startDate && endDate && startDate < day && day < endDate;

        return (
          <button
            key={day.toDateString()}
            onClick={() => handleDateClick(day)}
            className={
              isStartDate
                ? styles.startFill
                : isEndDate
                  ? styles.endFill
                  : isBetweenDates
                    ? styles.betweenFill
                    : ''
            }
          >
            {day.getDate()}
          </button>
        );
      })}
    </div>
  );

  const startTimeSelector = startDate && (
    <div className={styles.timeCotainer}>
      <label>{startDate && startDate?.toLocaleDateString()}</label>
      <select value={startAmPm} onChange={(e) => setStartAmPm(e.target.value)}>
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <input
        type="text"
        value={startHour}
        onInput={(e) => {
          const value = e.currentTarget.value;
          // 모든 문자가 숫자인지 확인
          if (/^\d*$/.test(value)) {
            if (Number(value) >= 1 && Number(value) <= 12) {
              setStartHour(value); // 올바른 범위의 숫자만 허용
            } else {
              setStartHour(''); // 범위를 벗어나면 상태를 리셋
            }
          } else {
            e.currentTarget.value = ''; // 숫자가 아닌 경우 입력 필드를 비웁니다
            setStartHour(''); // 상태를 리셋
          }
        }}
        placeholder="시"
      />
      <input
        type="text"
        value={startMinute}
        onInput={(e) => {
          const value = e.currentTarget.value;
          // 모든 문자가 숫자인지 확인
          if (/^\d*$/.test(value)) {
            if (Number(value) >= 0 && Number(value) <= 59) {
              setStartMinute(value); // 올바른 범위의 숫자만 허용
            } else {
              setStartMinute(''); // 범위를 벗어나면 상태를 리셋
            }
          } else {
            e.currentTarget.value = ''; // 숫자가 아닌 경우 입력 필드를 비웁니다
            setStartMinute(''); // 상태를 리셋
          }
        }}
        placeholder="분"
      />
    </div>
  );

  const endTimeSelector = endDate && (
    <div className={styles.timeCotainer}>
      <label>{endDate && endDate?.toLocaleDateString()}</label>
      <select value={endAmPm} onChange={(e) => setEndAmPm(e.target.value)}>
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <input
        type="text"
        value={endHour}
        onInput={(e) => {
          const value = e.currentTarget.value;
          // 모든 문자가 숫자인지 확인
          if (/^\d*$/.test(value)) {
            if (Number(value) >= 1 && Number(value) <= 12) {
              setEndHour(value); // 올바른 범위의 숫자만 허용
            } else {
              setStartHour(''); // 범위를 벗어나면 상태를 리셋
            }
          } else {
            e.currentTarget.value = ''; // 숫자가 아닌 경우 입력 필드를 비웁니다
            setEndHour(''); // 상태를 리셋
          }
        }}
        placeholder="시"
      />
      <input
        type="text"
        value={endMinute}
        onInput={(e) => {
          const value = e.currentTarget.value;
          // 모든 문자가 숫자인지 확인
          if (/^\d*$/.test(value)) {
            if (Number(value) >= 0 && Number(value) <= 59) {
              setEndMinute(value); // 올바른 범위의 숫자만 허용
            } else {
              setEndMinute(''); // 범위를 벗어나면 상태를 리셋
            }
          } else {
            e.currentTarget.value = ''; // 숫자가 아닌 경우 입력 필드를 비웁니다
            setEndMinute(''); // 상태를 리셋
          }
        }}
        placeholder="분"
      />
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 월과 연도 선택 드롭다운 */}
      {monthYearDropdown}

      {/* 요일 표시 */}
      {dayList}

      {/* 날짜 표시 */}
      {daysGrid}

      {/* 시간 선택 */}
      {startTimeSelector}
      {endTimeSelector}
    </div>
  );
}
