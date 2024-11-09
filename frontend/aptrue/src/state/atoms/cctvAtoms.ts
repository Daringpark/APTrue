import { atom } from 'recoil';

export const cctvRequestIdState = atom<number | null>({
  key: 'cctvRequestIdState', // 고유한 key 값
  default: null, // 초기값
});

export const cctvFormState = atom<'form' | 'detail'>({
  key: 'cctvFormState',
  default: 'form', // 초기값
});
