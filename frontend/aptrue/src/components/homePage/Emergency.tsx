import Button from '../common/button/Button';
import style from './Emergency.module.scss';

export default function Emergency({ alarm }: { alarm: Alarm }) {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.title}>
          <img src="/icons/fire_icon.png" />
          <p>화재 알림</p>
        </div>
        {alarm.image && <img src={alarm.image} alt="화재 이미지" />}
        <div className={style.contents}>
          <div className={style.textgroup}>
            <div className={style.message}>{alarm.message}</div>
            <div className={style.date}>{alarm.date}</div>
          </div>
          {!alarm.isCompleted && (
            <div className={style.complete}>
              <Button size="webMid" color="blue">
                처리 완료
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
