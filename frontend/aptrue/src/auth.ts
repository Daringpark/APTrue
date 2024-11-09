import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextApiRequest } from "next";

// 사용자가 입력한 계정 정보를 타입으로 정의
interface UserInfo {
  account: string;
  password: string;
}

export const {
  handlers, // API 라우트
  auth,     // 세션 반환 함수
  signIn,   // 로그인 함수
  signOut   // 로그아웃 함수
} = NextAuth({
  pages: {
    signIn: '/login' // 로그인 페이지 경로
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const userInfo = credentials as unknown as UserInfo;
        try {
          const user = await _login(userInfo); // 로그인 요청
          return user ? { ...user } : null;
        } catch (error) {
          throw new Error("로그인 실패");
        }
      },
    }),
  ],
  callbacks: {
    // jwt 콜백은 서버에서 실행됨
    async jwt({ token, user, req }: { token: any; user?: any; req?: NextApiRequest }) {
      if (user) {
        // 서버에서 쿠키로부터 accessToken을 읽음
        const accessToken = req?.cookies.accessToken;
        if (accessToken) {
          token.accessToken = accessToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    // url이 baseUrl('https://ssafy-aptrue.co.kr')로 시작하면, 그대로 url로 리디렉션
    async redirect({url, baseUrl}) {

        if (url.startsWith(baseUrl)) {
            return url;
        }
        return baseUrl
    }
  },
  secret: process.env.AUTH_SECRET || "default_secret_key",
});

async function _login(body: { account: string; password: string }) {
  console.log("로그인 시도 중:", body);
  const response = await fetch(`https://ssafy-aptrue.co.kr/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("로그인 응답:", data);

  if (response.ok && data && typeof data !== "string") {
    const { adminID, account, name, isSupserAdmin } = data.data;
    return {
      id: adminID,
      adminID: adminID,
      account: account,
      name: name,
      isSupserAdmin: isSupserAdmin,
    };
  }
  throw new Error("로그인 요청에 실패했습니다.");
}
