// import { auth } from "./auth-legacy"; // auth.ts의 auth를 불러온것
import { auth } from './auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { getSession } from './app/serverActions/auth';

// 로그인한 사용자만 접근할 수 있는 페이지
const matchersForAuth = ['/*', '/cctv/*', '/admin/*']

// 로그인페이지
const matchersForSignIn = ['/login']

// match(url)(pathname): path-to-regexp 라이브러리의 match 함수는 url 패턴에 맞는 정규식을 생성하여 pathname과 비교
// 하나라도 true가 나오면 some 메서드가 true를 반환
// !!를 사용하여 boolean 값으로 변환
function isMatch(pathname:string, urls:string[]) {
  return urls.some(url => !!match(url)(pathname))
}

export async function middleware(request: NextRequest) {
  // request.nextUrl.pathname : 요청된 URL의 경로
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
    ? NextResponse.next() // 그대로 이어감
    : NextResponse.redirect(new URL('/login', request.url)) // 세션 정보 없다면 /login으로 리다이렉션됨
  }

  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
    // 로그인된 사용자는 로그인 페이지에 접근하려고 할 때 '/'로 리디렉션
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }

  return NextResponse.next()
}

