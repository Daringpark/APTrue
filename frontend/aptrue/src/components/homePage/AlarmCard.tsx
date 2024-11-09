import style from './AlarmCard.module.scss';

interface AlarmCardProps extends Alarm {
  onClick?: () => void;
}

export default function AlarmCard({
  notificationId,
  message,
  category,
  emergency,
  isCompleted,
  date,
  image,
  onClick,
}: AlarmCardProps) {
  const categoryClass =
    category === '화재'
      ? style.fire
      : category === '불법주차'
        ? style.parking
        : category === 'cctv 요청 처리'
          ? style.request
          : '';

  const [datePart, timePart] = date.split('T');
  const formattedTime = timePart.split(':').slice(0, 2).join(':');
  return (
    <div className={`${style.container} ${categoryClass}`} onClick={onClick}>
      <div className={`${style.textContainer} ${!image ? style.full : ''}`}>
        <div className={style.message}>{message}</div>
        <p className={style.date}>
          {datePart} {formattedTime}
        </p>
        <p
          className={`${style.status} ${isCompleted ? style.completed : style.incomplete}`}
        >
          ⦁ {isCompleted ? '완료' : '미완료'}
        </p>
      </div>
      {image && (
        <div className={style.imageContainer}>
          <img src={image} alt="이미지" />
        </div>
      )}
    </div>
  );
}
