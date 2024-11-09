import { getDaysInMonth, startOfMonth, getDay, addDays } from 'date-fns';
import { useState } from 'react';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const totalMonthDays = getDaysInMonth(currentDate);
  // 첫번째 날의 요일을 숫자로 반환 0:일 1:월 2:화
  const firstDayOfMonth = getDay(startOfMonth(currentDate));
  // 해당 월의 모든 날짜를 포함하는 배열
  const days = Array.from({ length: totalMonthDays }, (_, index) =>
    // 현재날짜에 + index만큼 더해준 값을 반환
    addDays(startOfMonth(currentDate), index),
  );

  // 날짜 클릭 핸들러
  // const handleDateClick = (date: Date) => {
  //   if (!startDate || (startDate && endDate)) {
  //     setStartDate(date);
  //     setEndDate(null);
  //   } else if (startDate && date > startDate) {
  //     setEndDate(date);
  //   }
  // };
  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // 시작일이 없거나, 시작일과 끝일이 모두 설정된 경우
      setStartDate(date);
      setEndDate(null); // 끝일을 초기화
    } else if (startDate && !endDate) {
      // 시작일만 설정된 경우
      if (date >= startDate) {
        // 클릭한 날짜가 시작일보다 크거나 같을 경우
        setEndDate(date);
      } else {
        // 클릭한 날짜가 시작일보다 이전인 경우, 시작일을 클릭한 날짜로 변경
        setStartDate(date);
      }
    }
  };

  return {
    days,
    currentDate,
    setCurrentDate,
    startDate,
    endDate,
    handleDateClick,
    firstDayOfMonth,
  };
};

export default useCalendar;
