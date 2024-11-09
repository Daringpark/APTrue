import style from '@/app/(web)/(webProtected)/page.module.scss';
import Notification from '@/components/homePage/Notification';
import CCTVHome from '@/components/homePage/CCTVHome';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  // const session = await auth(); // useSession의 서버 버전
  // if (!session?.user) {
  //   redirect('/login');
  // }
  // 서버 사이드에서 API 호출
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/cctv/get/101동주변`,
  // );
  // const data = await response.json();
  // const videoUrls = data.data.map(
  //   (item: { camId: number; cctvUrl: string }) => item.cctvUrl,
  // );

  const videoUrls = [
    '/videos/entrance.mp4',
    '/videos/park2.mp4',
    '/videos/park.mp4',
    '/videos/playground.mp4',
  ];

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>CCTV</div>
          <CCTVHome />
        </div>
      </div>
      <div className={style.notification}>
        <Notification />
      </div>
    </div>
  );
}

