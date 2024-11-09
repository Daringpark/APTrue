import style from './video.module.scss';
import CCTVClip from '@/components/cctv/cctvClip';

export default function Page({ params }: { params: { clipRQId: string } }) {
  // [* todo] clipRQId로 clipList 가져오기
  const clipList: ClipList = [
    '/videos/entrance.mp4',
    '/videos/park.mp4',
    '/videos/park2.mp4',
    '/videos/playground.mp4',
    '/videos/entrance.mp4',
    '/videos/park.mp4',
    '/videos/park2.mp4',
    '/videos/playground.mp4',
    '/videos/entrance.mp4',
    '/videos/park.mp4',
    '/videos/park2.mp4',
    '/videos/playground.mp4',
  ];

  return (
    <div className={`${style.container}`}>
      <CCTVClip clipList={clipList} />
    </div>
  );
}
