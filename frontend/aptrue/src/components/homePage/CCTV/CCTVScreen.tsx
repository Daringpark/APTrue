import style from './CCTVScreen.module.scss';

export default function CCTVScreen({
  activeZone,
  camNumber,
  videoUrl,
  onClick,
}: {
  activeZone: string;
  camNumber: number;
  videoUrl: string;
  onClick: () => void;
}) {
  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.title}>{`${activeZone} cam0${camNumber}`}</div>
      <video
        className={style.video}
        src={videoUrl}
        autoPlay
        loop
        muted
        controls={false}
      />
    </div>
  );
}
