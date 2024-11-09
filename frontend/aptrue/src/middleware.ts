import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { match } from 'path-to-regexp';

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value; // 서버에서 사용하는 방법
  console.log('accessToken', accessToken);

  // 정적 파일이나 API 요청을 건너뛰도록 조건 추가
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname);
  const isLoginPath = request.nextUrl.pathname === '/login';

  if (!accessToken && !isLoginPath && !isPublicFile) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  return NextResponse.next(); // 인증 성공시 요청을 계속 진행
}

// 인증이 필요한 페이지 목록
// const matchersForAuth = ['/', '/cctv/:page', '/admin/:page'];

// // 로그인 페이지
// const matchersForSignIn = ['/login'];

// // URL 경로와 패턴이 일치하는지 확인하는 함수
// function isMatch(pathname: string, urls: string[]) {
//   return urls.some((url) => !!match(url)(pathname));
// }

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

// 쿠키에서 accessToken 가져오기
// const accessToken = request.cookies.get('accessToken')?.value;

// // 인증이 필요한 경로에 대한 처리
// if (isMatch(pathname, matchersForAuth)) {
//   // accessToken이 없으면 로그인 페이지로 리디렉션
//   return accessToken
//     ? NextResponse.next() // accessToken이 있으면 요청을 그대로 진행
//     : NextResponse.redirect(new URL('/login', request.url));
// }

// 로그인 페이지 접근 제한 처리
// if (isMatch(pathname, matchersForSignIn)) {
//   // accessToken이 있으면 메인 페이지로 리디렉션
//   return accessToken
//     ? NextResponse.redirect(new URL('/', request.url))
//     : NextResponse.next();
// }

// 인증이 필요하지 않은 경로는 그대로 진행
//   return NextResponse.next();
// }

//-----------------------------------------------------------

// // import { auth } from "./auth-legacy"; // auth.ts의 auth를 불러온것
// import { auth } from './auth';
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { match } from 'path-to-regexp';
// import { getSession } from './serverActions/auth';

// // 로그인한 사용자만 접근할 수 있는 페이지
// const matchersForAuth = ['/', '/cctv/:page', '/admin/:page']

// // 로그인페이지
// const matchersForSignIn = ['/login']

// // match(url)(pathname): path-to-regexp 라이브러리의 match 함수는 url 패턴에 맞는 정규식을 생성하여 pathname과 비교
// // 하나라도 true가 나오면 some 메서드가 true를 반환
// // !!를 사용하여 boolean 값으로 변환
// function isMatch(pathname:string, urls:string[]) {
//   return urls.some(url => !!match(url)(pathname))
// }

// export async function middleware(request: NextRequest) {
//   // request.nextUrl.pathname : 요청된 URL의 경로
//   if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
//     return (await getSession()) // 세션 정보 확인
//     ? NextResponse.next() // 그대로 이어감
//     : NextResponse.redirect(new URL('/login', request.url)) // 세션 정보 없다면 /login으로 리다이렉션됨
//   }

//   if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
//     return (await getSession())
//     // 로그인된 사용자는 로그인 페이지에 접근하려고 할 때 '/'로 리디렉션
//       ? NextResponse.redirect(new URL('/', request.url))
//       : NextResponse.next()
//   }

//   return NextResponse.next()
// }
