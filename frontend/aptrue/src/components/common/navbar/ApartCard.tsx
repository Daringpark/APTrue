import { notFound } from 'next/navigation';
import style from './ApartCard.module.scss';

const aptId = 1;

const data = {
  aptname: 'SSAFY Apt',
  aptImg: 'https://picsum.photos/200/300', // 이미지 크기 지정
  location: '광주광역시 하남산단로 133',
  block: 2,
  household: 10,
};

export default async function ApartCard() {
  // // [todo]아파트 카드 API 호출 로직 작성
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/apart/?aptId=${aptId}`,
  // )
  // if(!response.ok){
  //   notFound();
  // }

  // const res = await response.json();
  // const data = res.data;
  // location을 분리하는 로직
  const [city, ...rest] = data.location.split(' ');
  const restLocation = rest.join(' ');

  return (
    <div className={style.card}>
      <img src={data.aptImg} alt={data.aptname} className={style.image} />
      <div className={style.textContainer}>
        <p className={style.title}>{data.aptname}</p>
        <div className={style.location}>
          <p className={style.city}>{city}</p>{' '}
          <p className={style.restLocation}>{restLocation}</p>
        </div>
        <p className={style.details}>
          <span>총 {data.household}세대</span>, <span>{data.block}동</span>
        </p>
      </div>
    </div>
  );
}
