import {handlers} from '@/auth';

export const {GET, POST} = handlers;

// get fetch post delete 등을 정의 할 수 있다.
// Auth.js는 'api/auth '와 관련된 주소는 다 여기서 처리

// 다이나믹 라우팅 할 때 슬러그 ...nextauth의 의미는 캐치얼 라우트