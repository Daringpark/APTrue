// atom은 상태를 정의하는 함수
// 상태의 키와 기본 값을 인자로 받음
// atom은 하나의 값만 가지며, 전역적으로 접근할 수 있고 여러 컴포넌트에서 읽고 사용 가능
// useRecoilState를 통해서 읽고 쓰기 가능 => useState와 동일하다고 생각하면 됨
// 참고 : https://velog.io/@hyeonbinnn/Recoil-%EB%A6%AC%EC%BD%94%EC%9D%BC%EB%A1%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%A0%88%EA%B3%A0

import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});